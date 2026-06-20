/* ВНИИКП — «Рабочее место лаборатории» (демо для сотрудников): журнал образцов (LIMS-lite),
   календарь приборов, дашборд, вычисляемый протокол испытаний. Состояние — localStorage. Прототип. */
(function () {
  "use strict";
  var KEY = "wniikp_kabinet_v8";
  var LABS = [
    { id: "all", name: "Все лаборатории", methods: "сводно по всем лабораториям института" },
    { id: "micro", name: "Микробиология, гигиена и санитария", methods: "КМАФАнМ · дрожжи и плесени · БГКП · патогенные" },
    { id: "chrom", name: "Хроматографические исследования", methods: "жирнокислотный состав · трансизомеры · стеролы · сахара" },
    { id: "physchem", name: "Физико-химические исследования", methods: "перекисное/кислотное число · влага и aw · реология · идентификация шоколада" },
    { id: "flour", name: "Технология мучных кондитерских изделий", methods: "прочность печенья · намокаемость · плотность теста" },
    { id: "choc", name: "Технология шоколадных и сахаристых изделий", methods: "идентификация шоколада · дисперсность · прочность студня" }
  ];
  // приборы — справочник по умолчанию (далее живут в state.instruments: можно добавлять/удалять/ремонтировать)
  var DEFAULT_INSTR = [
    { id: "kt", name: "КТ-сканер", verifiedTill: "11.2026", status: "ok", repairTill: "", history: [{ date: "11.2024", type: "поверка", note: "Поверка, свидетельство № 1124/24" }, { date: "05.2025", type: "ТО", note: "Плановое техобслуживание" }] },
    { id: "nmr", name: "ЯМР-спектрометр", verifiedTill: "07.2026", status: "ok", repairTill: "", history: [{ date: "07.2024", type: "поверка", note: "Поверка, свидетельство № 0907/24" }] },
    { id: "chrom", name: "Хроматограф", verifiedTill: "03.2026", status: "ok", repairTill: "", history: [{ date: "03.2024", type: "поверка", note: "Поверка (срок истёк 03.2026 — требуется повторная)" }, { date: "01.2025", type: "ремонт", note: "Замена дейтериевой лампы" }] },
    { id: "struct", name: "Структурометр", verifiedTill: "12.2026", status: "repair", repairTill: "25.06.2026", history: [{ date: "12.2024", type: "поверка", note: "Поверка, свидетельство № 1218/24" }, { date: "20.06.2026", type: "ремонт", note: "В ремонте до 25.06.2026 — замена тензодатчика" }] }
  ];
  var DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  var STATUS = { new: "Принят", work: "В работе", review: "На утверждении", done: "Готов" };
  var EXECUTORS = ["Зайцев Д.", "Кузнецова М.", "Петрова О.", "Иванова Т."];
  var LAB_HEAD = "Белявская И. Г.";

  /* Справочник методик: норма по НД, единицы, тип границы, расширенная неопределённость U (k=2).
     Поиск по ключевому слову в названии показателя. op: '<=' — верхняя граница, '>=' — нижняя. */
  var METHODS = [
    { k: "перекисн",       unit: "мэкв O₂/кг", lim: 10,    op: "<=", u: 0.8 },
    { k: "кислотное число",unit: "мг KOH/г",   lim: 4,     op: "<=", u: 0.3 },
    { k: "влаг",           unit: "%",          lim: 8.0,   op: "<=", u: 0.4 },
    { k: "активность воды",unit: "a_w",        lim: 0.60,  op: "<=", u: 0.02 },
    { k: "редуцирующ",     unit: "%",          lim: 23,    op: "<=", u: 1.2 },
    { k: "фруктового сырья",unit: "%",         lim: 15,    op: ">=", u: 1.0 },
    { k: "прочность студня",unit: "Н",         lim: 12,    op: ">=", u: 0.8 },
    { k: "намокаемость",   unit: "%",          lim: 180,   op: ">=", u: 8 },
    { k: "измельчения",    unit: "%",          lim: 90,    op: ">=", u: 1.5 },
    { k: "пористост",      unit: "%",          lim: 30,    op: "<=", u: 1.5 },
    { k: "кмафанм",        unit: "КОЕ/г",      lim: 50000, op: "<=", u: 0 },
    { k: "дрожжи",         unit: "КОЕ/г",      lim: 100,   op: "<=", u: 0 },
    { k: "плесен",         unit: "КОЕ/г",      lim: 50,    op: "<=", u: 0 }
  ];
  function methodSpec(ind) {
    var s = String(ind || "").toLowerCase();
    for (var i = 0; i < METHODS.length; i++) if (s.indexOf(METHODS[i].k) > -1) return METHODS[i];
    return null;
  }
  /* Разбор строки "Показатель (ГОСТ …)" → {ind, nd} */
  function parseTest(str) {
    if (str && typeof str === "object") return str;
    var m = String(str).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    return m ? { ind: m[1].trim(), nd: m[2].trim() } : { ind: String(str).trim(), nd: "—" };
  }
  function testName(t) { var p = parseTest(t); return p.ind + (p.nd && p.nd !== "—" ? " (" + p.nd + ")" : ""); }

  /* Вердикт по показателю с учётом неопределённости и решающего правила (guard band). */
  function verdict(t) {
    if (t.val == null || t.lim == null) return { cls: "na", txt: "—" };
    var v = +t.val, u = +t.u || 0, lim = +t.lim, op = t.op || "<=";
    if (op === ">=") {
      if (v - u >= lim) return { cls: "pass", txt: "соответствует" };
      if (v + u < lim)  return { cls: "fail", txt: "не соответствует" };
      return { cls: "border", txt: "на границе" };
    }
    if (v + u <= lim) return { cls: "pass", txt: "соответствует" };
    if (v - u > lim)  return { cls: "fail", txt: "не соответствует" };
    return { cls: "border", txt: "на границе" };
  }
  function sampleVerdict(x) {
    var measured = (x.tests || []).map(parseTest).filter(function (t) { return t.val != null; });
    if (!measured.length) return null;
    var vs = measured.map(verdict);
    if (vs.some(function (r) { return r.cls === "fail"; }))   return { cls: "fail", txt: "не соответствует" };
    if (vs.some(function (r) { return r.cls === "border"; })) return { cls: "border", txt: "соответствует с оговоркой" };
    return { cls: "pass", txt: "соответствует" };
  }
  function normText(t) {
    if (t.lim == null) return "—";
    return (t.op === ">=" ? "не менее " : "не более ") + t.lim + (t.unit ? " " + t.unit : "");
  }
  function resText(t) {
    if (t.val == null) return "—";
    return t.val + (t.unit ? " " + t.unit : "") + (t.u ? " ± " + t.u : "");
  }

  /* срок выполнения и просрочка. Демо-«сегодня» — 10 июня 2026. Формат сравнения: месяц*100+день. */
  var TODAY_KB = 610;
  function dmNum(s) { var m = String(s || "").match(/(\d{1,2})\.(\d{1,2})/); return m ? (+m[2]) * 100 + (+m[1]) : null; }
  function dueFromIso(iso) { var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? m[3] + "." + m[2] : ""; }
  function dueState(x) {
    if (!x.due || x.status === "done") return null;
    var d = dmNum(x.due); if (d == null) return null;
    if (d < TODAY_KB) return { cls: "over", txt: "просрочено" };
    if (d === TODAY_KB) return { cls: "soon", txt: "срок сегодня" };
    if (d === TODAY_KB + 1) return { cls: "soon", txt: "срок завтра" };
    return { cls: "ok", txt: "до " + x.due };
  }
  function duePill(x) { var s = dueState(x); return s ? ' <span class="kb-due ' + s.cls + '">' + esc(s.txt) + "</span>" : ""; }

  var SEED = {
    samples: [
      { id: "К-101", lab: "micro", date: "08.06", due: "09.06", product: "Печенье сахарное", client: "ООО «Сластёна»", tests: ["КМАФАнМ (ГОСТ 33536-2015)", "Дрожжи и плесени (ГОСТ 10444.12-2013)", "БГКП (ГОСТ 31747-2012)"], status: "work", executor: "Кузнецова М." },
      { id: "К-102", lab: "choc", date: "08.06", due: "12.06", product: "Шоколад молочный", client: "Фабрика «Заря»", tests: ["Идентификационные признаки шоколада", "Массовая доля масла какао (МВИ 45-…)", "Степень измельчения (ГОСТ Р 54052-2010)"], status: "new" },
      { id: "К-103", lab: "choc", date: "07.06", product: "Мармелад желейный", client: "ИП Орлова",
        tests: [
          { ind: "Массовая доля редуцирующих веществ", nd: "ГОСТ 5903-89", val: 18.5, unit: "%", lim: 23, op: "<=", u: 1.2 },
          { ind: "Массовая доля фруктового сырья", nd: "МВИ 39-…", val: 16.4, unit: "%", lim: 15, op: ">=", u: 1.0 },
          { ind: "Прочность студня", nd: "ГОСТ 26185-84", val: 14.2, unit: "Н", lim: 12, op: ">=", u: 0.8 }
        ], status: "done", executor: "Петрова О.", instrument: "struct", approvedBy: "Белявская И. Г.", protocolNo: "ПИ-2026-103", measuredDate: "08.06" },
      { id: "К-104", lab: "chrom", date: "07.06", due: "10.06", product: "Пряники заварные", client: "ООО «Тула-Хлеб»", tests: ["Жирнокислотный состав (ГОСТ 30623-2018)", "Перекисное число (ГОСТ 26593-85)", "Кислотное число (ГОСТ 31933-2012)"], status: "work", executor: "Зайцев Д." },
      { id: "К-105", lab: "physchem", date: "06.06", product: "Конфеты глазированные", client: "Кондитер «Победа»",
        tests: [
          { ind: "КТ-морфометрия пористости", nd: "методика ВНИИКП", val: 27.0, unit: "%", lim: 30, op: "<=", u: 1.5 },
          { ind: "Массовая доля влаги", nd: "ГОСТ 5900-2014", val: 7.7, unit: "%", lim: 8.0, op: "<=", u: 0.4, reps: [7.6, 7.7, 7.8], spread: 0.2 },
          { ind: "Активность воды", nd: "ГОСТ ISO 21807-2015", val: 0.55, unit: "a_w", lim: 0.60, op: "<=", u: 0.02 }
        ], status: "done", executor: "Кузнецова М.", instrument: "kt", approvedBy: "Белявская И. Г.", protocolNo: "ПИ-2026-105", measuredDate: "07.06" },
      { id: "К-106", lab: "flour", date: "09.06", due: "13.06", product: "Вафли", client: "ООО «Хрустик»", tests: ["Массовая доля общего жира (ГОСТ 31902-2012)", "Намокаемость (ГОСТ 10114)", "Массовая доля вафельной крошки (ГОСТ 5897-90)"], status: "new" }
    ],
    instruments: JSON.parse(JSON.stringify(DEFAULT_INSTR)),
    bookings: { kt: { 0: "К-105", 2: "К-101" }, nmr: { 1: "К-104" }, chrom: { 0: "К-104", 3: "К-102" }, struct: { 2: "К-103" } }
  };

  var state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { state = null; }
  if (!state || !state.samples) state = JSON.parse(JSON.stringify(SEED));
  if (!state.lab) state.lab = "all";
  if (!state.instruments) state.instruments = JSON.parse(JSON.stringify(DEFAULT_INSTR));
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} // персист при загрузке — нужно для сквозной связи с управленческой
  var undo = null; // последнее обратимое действие

  /* доступность прибора для планирования: ремонт / просроченная поверка / готов */
  function instrAvail(i) {
    if (i.status === "repair") return { ok: false, reason: "repair", until: i.repairTill, label: "в ремонте до " + (i.repairTill || "—") };
    if (isVerifyExpired(i.verifiedTill)) return { ok: false, reason: "verify", until: i.verifiedTill, label: "поверка просрочена (" + i.verifiedTill + ")" };
    return { ok: true, reason: null, label: "готов · поверка до " + i.verifiedTill };
  }
  function instrById(id) { return state.instruments.filter(function (x) { return x.id === id; })[0]; }
  function fmtDate(iso) { var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? m[3] + "." + m[2] + "." + m[1] : iso; }
  var NOW_DATE = "20.06.2026"; // демо-«сегодня» для записей в историю
  function monthsUntil(till) { var m = String(till || "").match(/(\d{2})\.(\d{4})/); if (!m) return null; return (+m[2] - 2026) * 12 + (+m[1] - 6); } // относительно июня 2026
  function verifyWarn(i) { if (i.status === "repair") return false; var mu = monthsUntil(i.verifiedTill); return mu != null && mu >= 0 && mu <= 2; }
  function curLab() { return state.lab || "all"; }
  function curSamples() { var l = curLab(); return l === "all" ? state.samples : state.samples.filter(function (x) { return x.lab === l; }); }
  function labInfo() {
    var l = LABS.filter(function (x) { return x.id === curLab(); })[0];
    if (!l || l.id === "all") return "";
    return '<div class="kb-labinfo"><b>Лаборатория: ' + esc(l.name) + '</b><span>' + esc(l.methods) + "</span></div>";
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  // обратная связь: образец пришёл из управленческой (fromLead) → при утверждении протокола отметить заявку
  function writeBackToAdmin(x) {
    try {
      if (!x.fromLead) return;
      var AK = "wniikp_admin_v1", raw = localStorage.getItem(AK); if (!raw) return;
      var d = JSON.parse(raw); if (!d || !d.leads) return;
      var l = d.leads.filter(function (y) { return y.id === x.fromLead; })[0];
      if (l) { l.protocolReady = true; l.protocolNo = x.protocolNo || x.id; l.events = l.events || []; l.events.push({ t: "09.06", who: "Лаборатория", msg: "Протокол " + (x.protocolNo || x.id) + " утверждён" }); localStorage.setItem(AK, JSON.stringify(d)); }
    } catch (e) {}
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function empty(msg) { return '<div class="kb-empty">' + esc(msg) + "</div>"; }

  /* всплывающая подсказка с возможностью отмены */
  function toast(msg, undoLabel) {
    var t = $("kb-toast"); if (!t) { t = document.createElement("div"); t.id = "kb-toast"; t.className = "kb-toast"; document.body.appendChild(t); }
    t.innerHTML = esc(msg) + (undoLabel ? ' <button type="button" class="kb-undo">' + esc(undoLabel) + "</button>" : "");
    t.classList.add("show");
    clearTimeout(toast._); toast._ = setTimeout(function () { t.classList.remove("show"); }, 5000);
    var b = t.querySelector(".kb-undo");
    if (b) b.addEventListener("click", function () { t.classList.remove("show"); if (undo) undo(); });
  }

  /* ---------- вкладки ---------- */
  function showTab(name) {
    document.querySelectorAll(".kb-tab").forEach(function (t) {
      var on = t.dataset.tab === name;
      t.classList.toggle("active", on); t.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".kb-pane").forEach(function (p) { p.classList.toggle("hidden", p.id !== "kb-" + name); });
    if (name === "dash") renderDash();
    if (name === "journal") renderJournal();
    if (name === "cal") renderCal();
  }

  /* ---------- дашборд ---------- */
  function renderDash() {
    var s = curSamples();
    var total = s.length;
    var work = s.filter(function (x) { return x.status === "work"; }).length;
    var done = s.filter(function (x) { return x.status === "done"; }).length;
    var nw = s.filter(function (x) { return x.status === "new"; }).length;
    var over = s.filter(function (x) { var d = dueState(x); return d && d.cls === "over"; }).length;
    var avail = state.instruments.filter(function (i) { return instrAvail(i).ok; });
    var slots = avail.length * DAYS.length;
    var used = 0;
    avail.forEach(function (i) { used += Object.keys(state.bookings[i.id] || {}).length; });
    var load = slots ? Math.round(used / slots * 100) : 0;
    var down = state.instruments.filter(function (i) { return !instrAvail(i).ok; });
    var warns = state.instruments.filter(function (i) { return verifyWarn(i); });
    var planBanner = "";
    if (down.length) planBanner += '<div class="kb-planwarn"><b>⚠ Недоступны для планирования:</b> ' + down.map(function (i) { return esc(i.name) + " — " + esc(instrAvail(i).label); }).join("; ") + '. Учитывайте при распределении работ.</div>';
    if (warns.length) planBanner += '<div class="kb-planwarn soft"><b>⏳ Скоро истекает поверка:</b> ' + warns.map(function (i) { return esc(i.name) + " — до " + esc(i.verifiedTill); }).join("; ") + ". Запланируйте поверку заранее.</div>";
    function card(n, l, cls) { return '<div class="kb-kpi ' + (cls || "") + '"><div class="n">' + n + '</div><div class="l">' + l + "</div></div>"; }
    var recentRows = s.slice().reverse().slice(0, 5).map(function (x) {
      return '<tr><td><b>' + esc(x.id) + '</b></td><td>' + esc(x.product) + '</td><td>' + esc(x.client) + '</td><td>' + badge(x.status) + "</td></tr>";
    }).join("");
    var recent = total ? '<table class="kb-table"><tbody>' + recentRows + "</tbody></table>" : empty("По выбранной лаборатории образцов пока нет.");
    $("kb-dash").innerHTML =
      '<h2>Дашборд</h2>' + labInfo() +
      '<div class="kb-kpis">' + card(total, "Образцов всего") + card(nw, "Новые", "amber") + card(work, "В работе", "blue") + card(done, "Готово", "green") + card(over, "Просрочено", "red") + card(load + "%", "Загрузка приборов") + "</div>" +
      planBanner +
      '<div class="kb-grid2">' +
      '<div class="kb-box"><h3>Загрузка приборов (неделя)</h3>' + instrBars() + "</div>" +
      '<div class="kb-box"><h3>Последние образцы</h3>' + recent + "</div>" +
      "</div>" +
      '<div class="kb-box" style="margin-top:16px"><h3>Загрузка сотрудников (активные задания)</h3>' + execLoad() + "</div>";
  }
  function instrBars() {
    if (!state.instruments.length) return empty("Приборов нет. Добавьте в «Календаре приборов».");
    return state.instruments.map(function (i) {
      var a = instrAvail(i);
      if (!a.ok) return '<div class="kb-bar down"><span>' + esc(i.name) + '</span><div class="kb-track"><div class="kb-fill" style="width:0%"></div></div><b class="kb-bar-st ' + a.reason + '">' + (a.reason === "repair" ? "ремонт" : "поверка") + "</b></div>";
      var u = Object.keys(state.bookings[i.id] || {}).length;
      var pct = Math.round(u / DAYS.length * 100);
      return '<div class="kb-bar"><span>' + esc(i.name) + '</span><div class="kb-track"><div class="kb-fill" style="width:' + pct + '%"></div></div><b>' + u + "/5</b></div>";
    }).join("");
  }
  function execLoad() {
    var s = curSamples(), map = {};
    s.forEach(function (x) { if ((x.status === "work" || x.status === "review") && x.executor) map[x.executor] = (map[x.executor] || 0) + 1; });
    var names = Object.keys(map);
    if (!names.length) return empty("Активных заданий за сотрудниками нет.");
    var max = Math.max.apply(null, names.map(function (n) { return map[n]; }));
    return names.map(function (n) { var pct = Math.round(map[n] / max * 100); return '<div class="kb-bar"><span>' + esc(n) + '</span><div class="kb-track"><div class="kb-fill" style="width:' + pct + '%"></div></div><b>' + map[n] + "</b></div>"; }).join("");
  }

  /* ---------- журнал образцов (LIMS) ---------- */
  function badge(st) { var c = { new: "amber", work: "blue", review: "review", done: "green" }[st]; return '<span class="kb-badge ' + c + '">' + STATUS[st] + "</span>"; }
  function resultPill(x) {
    var v = sampleVerdict(x);
    return v ? '<span class="kb-vres ' + v.cls + '">' + v.txt + "</span>" : "";
  }
  function renderJournal() {
    var visible = state.samples.filter(function (x) { return curLab() === "all" || x.lab === curLab(); });
    var rows = visible.map(function (x) {
      var idx = state.samples.indexOf(x);
      var acts = "";
      if (x.status === "new") acts += '<button class="kb-mini" data-act="work" data-i="' + idx + '">→ В работу</button>';
      if (x.status === "work") { acts += '<button class="kb-mini" data-act="result" data-i="' + idx + '">→ Внести результат</button>'; acts += '<button class="kb-mini ghost" data-act="back-new" data-i="' + idx + '">↩ вернуть</button>'; }
      if (x.status === "review") { acts += '<button class="kb-mini primary" data-act="approve" data-i="' + idx + '">Утвердить (зав. лаб.)</button>'; acts += '<button class="kb-mini" data-act="proto" data-i="' + idx + '">Протокол</button>'; acts += '<button class="kb-mini ghost" data-act="back-work" data-i="' + idx + '">↩ в работу</button>'; }
      if (x.status === "done") { acts += '<button class="kb-mini primary" data-act="proto" data-i="' + idx + '">Протокол</button>'; acts += '<button class="kb-mini ghost" data-act="back-work" data-i="' + idx + '">↩ в работу</button>'; }
      if (x.status === "new" || x.status === "work") acts += '<button class="kb-mini ghost" data-act="edit" data-i="' + idx + '" title="Изменить образец">✎</button>';
      acts += '<button class="kb-mini ghost" data-act="del" data-i="' + idx + '" title="Удалить образец">✕</button>';
      var exNote = x.executor ? '<div class="kb-sub">исп.: ' + esc(x.executor) + "</div>" : "";
      var tests = (x.tests || []).map(function (t) { return "<li>" + esc(testName(t)) + "</li>"; }).join("");
      var ds = dueState(x);
      return '<tr' + (ds && ds.cls === "over" ? ' class="kb-over"' : "") + '><td><b>' + esc(x.id) + '</b><div class="kb-sub">' + esc(x.date) + (x.due ? " · срок " + esc(x.due) : "") + '</div></td>' +
        "<td>" + esc(x.product) + '<div class="kb-sub">' + esc(x.client) + "</div>" + exNote + "</td>" +
        '<td><ul class="kb-tests">' + tests + "</ul></td>" +
        "<td>" + badge(x.status) + resultPill(x) + duePill(x) + "</td><td>" + acts + "</td></tr>";
    }).join("");
    var table = visible.length
      ? '<table class="kb-table"><thead><tr><th>Образец</th><th>Продукт / заказчик</th><th>Испытания</th><th>Статус</th><th></th></tr></thead><tbody>' + rows + "</tbody></table>"
      : empty("По выбранной лаборатории образцов нет. Выберите «Все лаборатории» или примите новый образец выше.");
    $("kb-journal").innerHTML =
      '<h2>Журнал образцов <span class="kb-sub">(LIMS-lite)</span></h2>' + labInfo() +
      '<div class="kb-box" style="margin-bottom:16px"><h3>Принять образец</h3>' +
      '<div class="kb-form">' +
      '<input id="js-prod" placeholder="Продукт (напр. Печенье сахарное)">' +
      '<input id="js-cli" placeholder="Заказчик">' +
      '<input id="js-tests" placeholder="Испытания через запятую">' +
      '<input id="js-due" type="date" title="Срок выполнения" style="flex:0 0 160px">' +
      '<button class="kb-mini primary" id="js-add">Принять</button></div></div>' +
      (visible.length ? '<div class="kb-jtools"><input id="js-search" placeholder="Поиск: образец / продукт / заказчик…"><button class="kb-mini" id="js-csv">Экспорт CSV</button></div>' : "") + table;
    $("js-add").addEventListener("click", function () {
      var prod = $("js-prod").value.trim(); if (!prod) { toast("Укажите продукт"); return; }
      var n = state.samples.length + 101;
      state.samples.push({ id: "К-" + n, lab: (curLab() === "all" ? "physchem" : curLab()), date: "—", due: dueFromIso($("js-due").value), product: prod, client: $("js-cli").value.trim() || "—", tests: ($("js-tests").value.trim() ? $("js-tests").value.split(",").map(function (t) { return t.trim(); }) : ["—"]), status: "new" });
      save(); renderJournal();
      toast("Образец К-" + n + " принят");
    });
    $("kb-journal").querySelectorAll(".kb-mini[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.dataset.i, a = b.dataset.act, x = state.samples[i];
        if (a === "work") { x.status = "work"; save(); refresh(); toast(x.id + " — в работе"); }
        else if (a === "result") { openResultModal(i); }
        else if (a === "proto") { showProtocol(x); }
        else if (a === "approve") { x.status = "done"; x.approvedBy = LAB_HEAD; save(); writeBackToAdmin(x); refresh(); toast(x.id + " утверждён (" + LAB_HEAD + ") — протокол готов"); showProtocol(x); }
        else if (a === "back-new") { x.status = "new"; save(); refresh(); toast(x.id + " возвращён в «Принят»"); }
        else if (a === "edit") { openEditModal(i); }
        else if (a === "del") {
          if (!confirm("Удалить образец " + x.id + "? Действие можно отменить.")) return;
          var snap = JSON.parse(JSON.stringify(x)), pos = i;
          state.samples.splice(i, 1); save(); refresh();
          undo = function () { state.samples.splice(Math.min(pos, state.samples.length), 0, snap); save(); refresh(); toast("Удаление отменено"); };
          toast(snap.id + " удалён", "Отменить");
        }
        else if (a === "back-work") {
          var snapshot = JSON.parse(JSON.stringify(x));
          x.status = "work"; x.approvedBy = "";
          save(); refresh();
          undo = function () { state.samples[i] = snapshot; save(); refresh(); toast("Действие отменено"); };
          toast(x.id + " возвращён в работу", "Отменить");
        }
      });
    });
    var sb = $("js-search");
    if (sb) sb.addEventListener("input", function () {
      var q = sb.value.trim().toLowerCase();
      $("kb-journal").querySelectorAll("tbody tr").forEach(function (tr) { tr.style.display = (!q || tr.textContent.toLowerCase().indexOf(q) > -1) ? "" : "none"; });
    });
    var cb = $("js-csv"); if (cb) cb.addEventListener("click", exportJournalCsv);
  }
  function openEditModal(i) {
    var x = state.samples[i], box = $("kb-edit-modal");
    box.innerHTML = '<div class="kb-modal-box" style="max-width:480px"><div class="kb-modal-head"><b>Изменить образец ' + esc(x.id) + '</b><button class="kb-mini" type="button" data-edit="close">Отмена</button></div>' +
      '<div class="proto"><div class="kb-fld"><label for="ed-prod">Продукт</label><input id="ed-prod" class="kb-resin" style="width:100%" value="' + esc(x.product) + '"></div>' +
      '<div class="kb-fld"><label for="ed-cli">Заказчик</label><input id="ed-cli" class="kb-resin" style="width:100%" value="' + esc(x.client) + '"></div>' +
      '<div class="kb-fld"><label for="ed-due">Срок (дд.мм)</label><input id="ed-due" class="kb-resin" style="width:140px" value="' + esc(x.due || "") + '"></div>' +
      '<div class="btnrow" style="display:flex;gap:10px;margin-top:14px"><button class="kb-mini primary" type="button" data-edit="save" data-i="' + i + '">Сохранить</button><button class="kb-mini" type="button" data-edit="close">Отмена</button></div></div></div>';
    openModal(box);
  }
  function exportJournalCsv() {
    var rows = state.samples.filter(function (x) { return curLab() === "all" || x.lab === curLab(); });
    var head = "Образец;Дата;Срок;Продукт;Заказчик;Статус;Исполнитель;Заключение";
    var lines = rows.map(function (x) {
      var v = sampleVerdict(x);
      return [x.id, x.date, x.due || "", x.product, x.client, STATUS[x.status] || x.status, x.executor || "", v ? v.txt : ""].map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(";");
    });
    var csv = "﻿" + head + "\n" + lines.join("\n");
    var b = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "zhurnal_obrazcov.csv"; a.click();
    toast("Журнал выгружен в CSV");
  }
  function refresh() { renderJournal(); /* dash KPI пересчитается при переходе */ }

  /* ---------- ввод результатов (вычисляемый протокол) ---------- */
  function openResultModal(i) {
    var x = state.samples[i];
    var rows = (x.tests || []).map(function (t, n) {
      var p = parseTest(t);
      var spec = (p.lim != null) ? p : methodSpec(p.ind);
      var lim = (p.lim != null ? p.lim : (spec ? spec.lim : ""));
      var unit = (p.unit || (spec ? spec.unit : "") || "");
      var op = (p.op || (spec ? spec.op : "<="));
      var u = (p.u != null ? p.u : (spec ? spec.u : ""));
      var normLabel = (lim === "" ? "показатель информативный" : (op === ">=" ? "не менее " : "не более ") + lim + " " + unit);
      return '<tr data-n="' + n + '" data-unit="' + esc(unit) + '" data-lim="' + lim + '" data-op="' + op + '" data-u="' + u + '">' +
        "<td>" + (n + 1) + "</td><td><b>" + esc(p.ind) + "</b><div class=\"kb-sub\">" + esc(p.nd || "") + " · " + esc(normLabel) + "</div></td>" +
        '<td><input class="kb-resin" type="text" inputmode="decimal" placeholder="' + (lim === "" ? "значения" : lim + ", …") + '" style="width:160px" title="Одно значение или несколько через запятую (повторности)"> ' + esc(unit) + "</td></tr>";
    }).join("");
    var box = $("kb-res-modal");
    box.innerHTML =
      '<div class="kb-modal-box"><div class="kb-modal-head"><b>Внести результаты — ' + esc(x.id) + " · " + esc(x.product) + '</b>' +
      '<button class="kb-mini" type="button" data-res="close">Отмена</button></div>' +
      '<div class="proto"><p class="kb-sub">Введите измеренное значение по каждому показателю. Можно ввести несколько параллельных определений через запятую — система посчитает среднее, сходимость (размах) и сама вынесет вывод о соответствии с учётом расширенной неопределённости U (k=2).</p>' +
      '<div class="kb-form" style="margin-bottom:12px">' +
        '<div class="kb-fld"><label for="res-exec">Исполнитель</label><select id="res-exec" class="kb-resin">' + EXECUTORS.map(function (e) { return "<option" + (x.executor === e ? " selected" : "") + ">" + esc(e) + "</option>"; }).join("") + "</select></div>" +
        '<div class="kb-fld"><label for="res-instr">Прибор (оборудование)</label><select id="res-instr" class="kb-resin"><option value="">— не указан —</option>' + state.instruments.map(function (ins) { return '<option value="' + esc(ins.id) + '"' + (x.instrument === ins.id ? " selected" : "") + ">" + esc(ins.name) + "</option>"; }).join("") + "</select></div>" +
      "</div>" +
      '<table class="proto-tab"><thead><tr><th>№</th><th>Показатель / НД · норма</th><th>Результат измерения</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      '<div class="btnrow" style="display:flex;gap:10px;margin-top:14px"><button class="kb-mini primary" type="button" data-res="save" data-i="' + i + '">Сохранить и сформировать протокол</button><button class="kb-mini" type="button" data-res="close">Отмена</button></div></div></div>';
    openModal(box);
  }
  function saveResults(i) {
    var x = state.samples[i];
    var trs = $("kb-res-modal").querySelectorAll("tbody tr");
    x.tests = Array.prototype.map.call(trs, function (tr) {
      var p = parseTest(x.tests[+tr.dataset.n]);
      var inp = tr.querySelector(".kb-resin");
      var raw = inp && inp.value.trim();
      var t = { ind: p.ind, nd: p.nd, unit: tr.dataset.unit || p.unit || "" };
      var lim = tr.dataset.lim, u = tr.dataset.u, op = tr.dataset.op;
      if (lim !== "" && lim != null) { t.lim = +lim; t.op = op || "<="; t.u = (u !== "" ? +u : 0); }
      if (raw !== "" && raw != null) {
        var nums = raw.split(/[,;\s]+/).map(function (s) { return parseFloat(s.replace(",", ".")); }).filter(function (v) { return !isNaN(v); });
        if (nums.length) {
          var rnd = function (n) { return Math.round(n * 1000) / 1000; };
          t.val = rnd(nums.reduce(function (a, b) { return a + b; }, 0) / nums.length);
          if (nums.length > 1) { t.reps = nums; t.spread = rnd(Math.max.apply(null, nums) - Math.min.apply(null, nums)); }
        }
      }
      return t;
    });
    x.executor = ($("res-exec") || {}).value || x.executor || "";
    x.instrument = ($("res-instr") || {}).value || x.instrument || "";
    x.protocolNo = x.protocolNo || ("ПИ-2026-" + x.id.replace(/\D/g, ""));
    x.measuredDate = x.date;
    x.status = "review";
    save(); closeModal($("kb-res-modal")); renderJournal();
    var v = sampleVerdict(x);
    toast(x.id + ": результаты внесены, на утверждении у завлаба (" + (v ? v.txt : "—") + ")");
    showProtocol(x);
  }

  /* ---------- календарь приборов ---------- */
  function renderCal() {
    var head = "<tr><th>Прибор / статус</th>" + DAYS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr>";
    var body = state.instruments.length ? state.instruments.map(function (i) {
      var a = instrAvail(i);
      var cells = DAYS.map(function (d, di) {
        var bk = (state.bookings[i.id] || {})[di];
        return '<td class="kb-cell ' + (bk ? "busy" : "free") + (a.ok ? "" : " locked") + '" data-i="' + i.id + '" data-d="' + di + '">' + (bk ? esc(bk) : (a.ok ? "+" : "✕")) + "</td>";
      }).join("");
      var verCls = a.reason === "verify" ? "bad" : (verifyWarn(i) ? "warn" : "ok");
      var pills = '<span class="kb-ver ' + verCls + '">поверка до ' + esc(i.verifiedTill) + (a.reason === "verify" ? " · просрочена" : (verifyWarn(i) ? " · истекает" : "")) + "</span>";
      if (i.status === "repair") pills += ' <span class="kb-ver repair">в ремонте до ' + esc(i.repairTill || "—") + "</span>";
      var acts = '<div class="kb-instr-acts">' +
        (i.status === "repair"
          ? '<button class="kb-mini" type="button" data-instr="unrepair" data-i="' + i.id + '">Вернуть в строй</button>'
          : '<button class="kb-mini" type="button" data-instr="repair" data-i="' + i.id + '">В ремонт</button>') +
        '<button class="kb-mini ghost" type="button" data-instr="hist" data-i="' + i.id + '">История</button>' +
        '<button class="kb-mini ghost" type="button" data-instr="del" data-i="' + i.id + '">Удалить</button></div>';
      return '<tr class="' + (a.ok ? "" : "kb-row-down") + '"><td><b>' + esc(i.name) + "</b><div class=\"kb-sub\">" + pills + "</div>" + acts + "</td>" + cells + "</tr>";
    }).join("") : '<tr><td colspan="' + (DAYS.length + 1) + '">' + empty("Приборов нет. Добавьте первый кнопкой «+ Добавить прибор».") + "</td></tr>";
    $("kb-cal").innerHTML =
      '<div class="kb-cal-head"><h2>Календарь загрузки приборов</h2><button class="kb-mini primary" type="button" data-instr="add">+ Добавить прибор</button></div>' +
      '<p class="kb-sub">Клик по ячейке — бронь под образец или снятие брони. Прибор в ремонте или с просроченной поверкой (✕) бронировать нельзя — это видно и на дашборде, чтобы планировать загрузку с учётом простоя. ГОСТ ISO/IEC 17025 п.6.4. Демо-неделя.</p>' +
      '<table class="kb-cal-tab"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
    $("kb-cal").querySelectorAll(".kb-cell").forEach(function (c) {
      c.addEventListener("click", function () {
        var iid = c.dataset.i, di = c.dataset.d, instr = instrById(iid), a = instrAvail(instr);
        if (state.bookings[iid] && state.bookings[iid][di]) { delete state.bookings[iid][di]; save(); renderCal(); renderDash(); toast("Бронь снята"); return; }
        if (!a.ok) { toast(instr.name + ": " + a.label + " — бронь заблокирована"); return; }
        openBookModal(iid, di);
      });
    });
  }
  function isVerifyExpired(till) {
    var m = String(till || "").match(/(\d{2})\.(\d{4})/); if (!m) return false;
    var y = +m[2], mo = +m[1];
    return (y < 2026) || (y === 2026 && mo < 6); // демо-«сегодня» — июнь 2026
  }
  function openBookModal(iid, di) {
    var instr = instrById(iid);
    var opts = state.samples.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.id) + " — " + esc(s.product) + "</option>"; }).join("");
    var box = $("kb-book-modal");
    box.innerHTML =
      '<div class="kb-modal-box" style="max-width:460px"><div class="kb-modal-head"><b>Бронь: ' + esc(instr.name) + " · " + DAYS[di] + '</b>' +
      '<button class="kb-mini" type="button" data-book="close">Отмена</button></div>' +
      '<div class="proto"><div class="kb-fld"><label for="kb-book-sel">Образец для брони</label>' +
      '<select id="kb-book-sel" class="kb-resin" style="width:100%">' + opts + "</select></div>" +
      '<div class="btnrow" style="display:flex;gap:10px;margin-top:14px"><button class="kb-mini primary" type="button" data-book="ok" data-i="' + iid + '" data-d="' + di + '">Забронировать</button><button class="kb-mini" type="button" data-book="close">Отмена</button></div></div></div>';
    openModal(box);
    var sel = $("kb-book-sel"); if (sel) sel.focus();
  }

  /* ---------- управление приборами: добавить / в ремонт ---------- */
  function openInstrModal(mode, iid) {
    var box = $("kb-instr-modal");
    var inp = "width:100%;padding:9px 11px;border:1px solid var(--line);border-radius:9px;font-size:14px;font-family:inherit";
    if (mode === "add") {
      var monOpts = "";
      for (var m = 1; m <= 12; m++) { monOpts += '<option value="' + m + '">' + ("0" + m).slice(-2) + "</option>"; }
      box.innerHTML =
        '<div class="kb-modal-box" style="max-width:470px"><div class="kb-modal-head"><b>Добавить прибор</b><button class="kb-mini" type="button" data-instr="close">Отмена</button></div>' +
        '<div class="proto"><div class="kb-fld"><label for="ni-name">Название прибора</label><input id="ni-name" style="' + inp + '" placeholder="напр. Вискозиметр Брукфилда"></div>' +
        '<div class="kb-fld"><label>Поверка действительна до (месяц / год)</label><div style="display:flex;gap:8px"><select id="ni-mon" class="kb-resin" style="flex:1">' + monOpts + '</select><input id="ni-year" class="kb-resin" type="number" min="2026" max="2035" value="2027" style="width:120px"></div></div>' +
        '<div class="btnrow" style="display:flex;gap:10px;margin-top:14px"><button class="kb-mini primary" type="button" data-instr="add-save">Добавить прибор</button><button class="kb-mini" type="button" data-instr="close">Отмена</button></div></div></div>';
    } else if (mode === "repair") {
      var instr = instrById(iid);
      box.innerHTML =
        '<div class="kb-modal-box" style="max-width:450px"><div class="kb-modal-head"><b>В ремонт: ' + esc(instr.name) + '</b><button class="kb-mini" type="button" data-instr="close">Отмена</button></div>' +
        '<div class="proto"><div class="kb-fld"><label for="ri-date">Ожидаемая дата возврата в строй</label><input id="ri-date" class="kb-resin" type="date" style="width:100%"></div>' +
        '<p class="kb-sub">Пока прибор в ремонте, бронировать его нельзя. Статус и дата возврата видны в календаре и на дашборде — сотрудники и директор планируют работу с учётом простоя.</p>' +
        '<div class="btnrow" style="display:flex;gap:10px;margin-top:14px"><button class="kb-mini primary" type="button" data-instr="repair-save" data-i="' + iid + '">Отправить в ремонт</button><button class="kb-mini" type="button" data-instr="close">Отмена</button></div></div></div>';
    } else if (mode === "hist") {
      var inst = instrById(iid);
      var hrows = (inst.history || []).slice().reverse().map(function (h) {
        var cls = h.type === "ремонт" ? "rep" : (h.type === "ТО" ? "to" : "ver");
        return "<tr><td>" + esc(h.date) + '</td><td><span class="kb-histtype ' + cls + '">' + esc(h.type) + "</span></td><td>" + esc(h.note || "") + "</td></tr>";
      }).join("");
      var statusTxt = inst.status === "repair" ? "в ремонте до " + esc(inst.repairTill || "—") : "в работе";
      var verTxt = "до " + esc(inst.verifiedTill) + (isVerifyExpired(inst.verifiedTill) ? " · просрочена" : (verifyWarn(inst) ? " · истекает" : ""));
      box.innerHTML =
        '<div class="kb-modal-box" style="max-width:580px"><div class="kb-modal-head"><b>История прибора: ' + esc(inst.name) + '</b><button class="kb-mini" type="button" data-instr="close">Закрыть</button></div>' +
        '<div class="proto"><table class="proto-meta"><tbody><tr><td>Текущая поверка</td><td>' + verTxt + "</td></tr><tr><td>Статус</td><td>" + statusTxt + "</td></tr></tbody></table>" +
        (hrows ? '<table class="proto-tab"><thead><tr><th>Дата</th><th>Событие</th><th>Примечание</th></tr></thead><tbody>' + hrows + "</tbody></table>" : empty("Записей в истории пока нет.")) +
        '<div class="btnrow" style="margin-top:14px"><button class="kb-mini" type="button" data-instr="close">Закрыть</button></div></div></div>';
    }
    openModal(box);
  }

  /* ---------- протокол ---------- */
  function showProtocol(x) {
    var tests = (x.tests || []).map(parseTest);
    var rows = tests.map(function (t, n) {
      var v = verdict(t);
      var repInfo = (t.reps && t.reps.length > 1) ? '<div class="kb-sub">n=' + t.reps.length + ", сходимость (размах) " + t.spread + (t.unit ? " " + t.unit : "") + "</div>" : "";
      return "<tr><td>" + (n + 1) + "</td><td>" + esc(t.ind) + '<div class="kb-sub">' + esc(t.nd || "") + "</div></td>" +
        "<td>" + esc(resText(t)) + repInfo + "</td><td>" + esc(normText(t)) + '</td><td class="r ' + v.cls + '">' + v.txt + "</td></tr>";
    }).join("");
    var sv = sampleVerdict(x);
    var concl = sv
      ? '<p class="proto-concl"><b>Заключение:</b> по совокупности исследованных показателей образец <b class="kb-vres ' + sv.cls + '">' + sv.txt + "</b> требованиям нормативной документации." +
        (sv.cls === "border" ? ' <span class="kb-sub">Один из показателей в зоне неопределённости: результат с учётом расширенной неопределённости U пересекает границу нормы — по решающему правилу однозначное соответствие не подтверждается, требуется повторное определение.</span>' : "") + "</p>"
      : '<p class="proto-concl kb-sub">Числовые результаты ещё не внесены — заключение формируется после ввода значений.</p>';
    $("kb-proto-body").innerHTML =
      '<div class="proto-head"><div><b>ВНИИ кондитерской промышленности</b><br>филиал ФГБНУ «ФНЦ пищевых систем им. В.М. Горбатова» РАН<br>107023, Москва, ул. Электрозаводская, 20с3</div>' +
      '<div class="proto-no">ПРОТОКОЛ ИСПЫТАНИЙ<br>№ ' + esc(x.protocolNo || (x.id + "/2026")) + "</div></div>" +
      (x.status === "review" ? '<p class="proto-review">⏳ Черновик протокола — ожидает утверждения заведующим лабораторией.</p>' : "") +
      '<table class="proto-meta"><tbody>' +
      "<tr><td>Образец</td><td><b>" + esc(x.product) + "</b> (" + esc(x.id) + ")</td></tr>" +
      "<tr><td>Заказчик</td><td>" + esc(x.client) + "</td></tr>" +
      "<tr><td>Дата поступления</td><td>" + esc(x.date) + ".2026</td></tr>" +
      (x.measuredDate ? "<tr><td>Дата испытаний</td><td>" + esc(x.measuredDate) + ".2026</td></tr>" : "") +
      (x.instrument ? "<tr><td>Оборудование</td><td>" + esc((instrById(x.instrument) || {}).name || x.instrument) + (instrById(x.instrument) && instrById(x.instrument).verifiedTill ? " · поверка до " + esc(instrById(x.instrument).verifiedTill) : "") + "</td></tr>" : "") +
      "</tbody></table>" +
      '<table class="proto-tab"><thead><tr><th>№</th><th>Показатель / метод (НД)</th><th>Результат</th><th>Норма по НД</th><th>Вывод</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      concl +
      '<div class="proto-sign"><span>Зав. лабораторией: ' + (x.approvedBy ? "<b>" + esc(x.approvedBy) + "</b>" : "________ (не утверждён)") + '</span><span>Исполнитель: ' + (x.executor ? "<b>" + esc(x.executor) + "</b>" : "________") + "</span></div>" +
      '<p class="kb-sub" style="margin-top:10px">Демонстрационный протокол. Вывод по каждому показателю вычисляется сравнением результата с нормой НД с учётом расширенной неопределённости U (k=2). Реальные результаты, бланк и подписи формирует институт.</p>';
    openModal($("kb-proto-modal"));
  }

  function downloadProtocolPdf() {
    var body = $("kb-proto-body").innerHTML;
    var w = window.open("", "_blank");
    if (!w) { toast("Разрешите всплывающие окна, чтобы сохранить PDF"); return; }
    var css = "body{font-family:Inter,Arial,sans-serif;color:#1b2733;padding:28px;max-width:760px;margin:0 auto}" +
      ".proto-head{display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #1b2733;padding-bottom:12px;font-size:12.5px;line-height:1.4}" +
      ".proto-no{text-align:right;font-weight:800;font-size:14px}.proto-review{background:#fff1db;color:#9a6400;padding:8px 12px;border-radius:8px;font-size:13px}" +
      ".proto-meta{width:100%;border-collapse:collapse;margin:14px 0}.proto-meta td{padding:5px 6px;border-bottom:1px solid #e6eaef;font-size:14px}.proto-meta td:first-child{color:#586673;width:170px}" +
      ".proto-tab{width:100%;border-collapse:collapse;margin:8px 0 14px}.proto-tab th,.proto-tab td{border:1px solid #d9dee5;padding:8px 10px;font-size:13px;text-align:left}.proto-tab th{background:#fafafa}.proto-tab td.r{text-align:center;font-weight:700}" +
      ".r.pass{color:#1d7a3a}.r.fail{color:#b3261e}.r.border{color:#9a6400}.proto-concl{font-size:14px;margin:10px 0}.proto-sign{display:flex;justify-content:space-between;margin-top:30px;font-size:13px}" +
      ".kb-sub{color:#586673;font-size:12px}.kb-vres{padding:2px 8px;border-radius:8px;font-weight:700}.kb-vres.pass{background:#e8f6ec;color:#1d7a3a}.kb-vres.border{background:#fff1db;color:#9a6400}.kb-vres.fail{background:#fde8e8;color:#b3261e}";
    w.document.write('<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"><title>Протокол испытаний ВНИИКП</title><style>' + css + "</style></head><body>" + body + "<scr" + "ipt>window.onload=function(){setTimeout(function(){window.print();},150);}</scr" + "ipt></body></html>");
    w.document.close();
  }

  /* ---------- модалки: открытие/закрытие, фокус, Esc ---------- */
  var lastFocus = null;
  function openModal(box) { lastFocus = document.activeElement; box.classList.remove("hidden"); var f = box.querySelector("button,select,input"); if (f) f.focus(); }
  function closeModal(box) { box.classList.add("hidden"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function closeAllModals() { document.querySelectorAll(".kb-modal").forEach(function (m) { m.classList.add("hidden"); }); }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".kb-tab").forEach(function (t) { t.addEventListener("click", function () { showTab(t.dataset.tab); }); });
    var sel = $("kb-lab");
    if (sel) {
      LABS.forEach(function (l) { var o = document.createElement("option"); o.value = l.id; o.textContent = l.name; sel.appendChild(o); });
      sel.value = curLab();
      sel.addEventListener("change", function () {
        state.lab = sel.value; save();
        var at = document.querySelector(".kb-tab.active");
        showTab(at ? at.dataset.tab : "dash");
      });
    }
    $("kb-proto-close").addEventListener("click", function () { closeModal($("kb-proto-modal")); });
    $("kb-proto-print").addEventListener("click", function () { window.print(); });
    $("kb-proto-pdf").addEventListener("click", downloadProtocolPdf);

    // делегирование для модалок брони и результатов
    document.addEventListener("click", function (e) {
      var bk = e.target.closest("[data-book]");
      if (bk) {
        var a = bk.getAttribute("data-book");
        if (a === "close") closeModal($("kb-book-modal"));
        else if (a === "ok") {
          var iid = bk.getAttribute("data-i"), di = bk.getAttribute("data-d"), v = ($("kb-book-sel") || {}).value;
          if (v) { state.bookings[iid] = state.bookings[iid] || {}; state.bookings[iid][di] = v; save(); closeModal($("kb-book-modal")); renderCal(); renderDash(); toast("Прибор забронирован под " + v); }
        }
        return;
      }
      var rs = e.target.closest("[data-res]");
      if (rs) {
        var ra = rs.getAttribute("data-res");
        if (ra === "close") closeModal($("kb-res-modal"));
        else if (ra === "save") saveResults(+rs.getAttribute("data-i"));
        return;
      }
      var ed = e.target.closest("[data-edit]");
      if (ed) {
        var ea = ed.getAttribute("data-edit");
        if (ea === "close") closeModal($("kb-edit-modal"));
        else if (ea === "save") {
          var ei = +ed.getAttribute("data-i"), ex = state.samples[ei];
          if (ex) { ex.product = (($("ed-prod") || {}).value || "").trim() || ex.product; ex.client = (($("ed-cli") || {}).value || "").trim() || ex.client; ex.due = (($("ed-due") || {}).value || "").trim(); save(); closeModal($("kb-edit-modal")); renderJournal(); toast(ex.id + " изменён"); }
        }
        return;
      }
      var ins = e.target.closest("[data-instr]");
      if (ins) {
        var ia = ins.getAttribute("data-instr"), iid = ins.getAttribute("data-i");
        if (ia === "close") { closeModal($("kb-instr-modal")); }
        else if (ia === "add") { openInstrModal("add"); }
        else if (ia === "add-save") {
          var nm = (($("ni-name") || {}).value || "").trim();
          if (!nm) { toast("Укажите название прибора"); return; }
          var mon = ("0" + (($("ni-mon") || {}).value || "1")).slice(-2), yr = ($("ni-year") || {}).value || "2027";
          var nid = "u" + (state.instruments.length + 1) + nm.replace(/\W+/g, "").slice(0, 4).toLowerCase();
          state.instruments.push({ id: nid, name: nm, verifiedTill: mon + "." + yr, status: "ok", repairTill: "", history: [{ date: NOW_DATE, type: "поверка", note: "Прибор внесён в систему, поверка до " + mon + "." + yr }] });
          save(); closeModal($("kb-instr-modal")); renderCal(); renderDash(); toast("Прибор «" + nm + "» добавлен");
        }
        else if (ia === "repair") { openInstrModal("repair", iid); }
        else if (ia === "hist") { openInstrModal("hist", iid); }
        else if (ia === "repair-save") {
          var d = ($("ri-date") || {}).value;
          if (!d) { toast("Укажите дату возврата"); return; }
          var inst = instrById(iid); inst.status = "repair"; inst.repairTill = fmtDate(d);
          inst.history = inst.history || []; inst.history.push({ date: NOW_DATE, type: "ремонт", note: "Отправлен в ремонт до " + inst.repairTill });
          save(); closeModal($("kb-instr-modal")); renderCal(); renderDash(); toast(inst.name + " — в ремонте до " + inst.repairTill);
        }
        else if (ia === "unrepair") {
          var inst2 = instrById(iid); inst2.status = "ok"; inst2.repairTill = "";
          inst2.history = inst2.history || []; inst2.history.push({ date: NOW_DATE, type: "ремонт", note: "Возвращён в строй после ремонта" });
          save(); renderCal(); renderDash(); toast(inst2.name + " возвращён в строй");
        }
        else if (ia === "del") {
          var inst3 = instrById(iid); if (!inst3) return;
          if (!confirm("Удалить прибор «" + inst3.name + "» из списка? Его брони будут сняты.")) return;
          var idx = state.instruments.indexOf(inst3), bkSnap = state.bookings[iid];
          state.instruments.splice(idx, 1); delete state.bookings[iid];
          save(); renderCal(); renderDash();
          undo = function () { state.instruments.splice(Math.min(idx, state.instruments.length), 0, inst3); if (bkSnap) state.bookings[iid] = bkSnap; save(); renderCal(); renderDash(); toast("Удаление отменено"); };
          toast("Прибор «" + inst3.name + "» удалён", "Отменить");
        }
        return;
      }
      if (e.target.classList && e.target.classList.contains("kb-modal")) closeModal(e.target); // клик по фону
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllModals(); });

    // версия для слабовидящих
    var a11y = $("kb-a11y");
    var viOn = false;
    try { viOn = localStorage.getItem("wniikp_kb_vi") === "1"; } catch (e) {}
    function applyVi() { document.body.classList.toggle("vi", viOn); a11y.setAttribute("aria-pressed", viOn ? "true" : "false"); a11y.classList.toggle("on", viOn); }
    applyVi();
    a11y.addEventListener("click", function () { viOn = !viOn; try { localStorage.setItem("wniikp_kb_vi", viOn ? "1" : "0"); } catch (e) {} applyVi(); });

    $("kb-reset").addEventListener("click", function () {
      if (!confirm("Сбросить демо-данные кабинета к исходному состоянию? Внесённые образцы и брони будут удалены.")) return;
      state = JSON.parse(JSON.stringify(SEED)); state.lab = "all"; save();
      if ($("kb-lab")) $("kb-lab").value = "all";
      showTab("dash"); toast("Демо-данные сброшены");
    });
    showTab("dash");
  });
})();
