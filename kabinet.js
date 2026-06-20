/* ВНИИКП — «Рабочее место лаборатории» (демо для сотрудников): журнал образцов (LIMS-lite),
   календарь приборов, дашборд, вычисляемый протокол испытаний. Состояние — localStorage. Прототип. */
(function () {
  "use strict";
  var KEY = "wniikp_kabinet_v3";
  var LABS = [
    { id: "all", name: "Все лаборатории", methods: "сводно по всем лабораториям института" },
    { id: "micro", name: "Микробиология, гигиена и санитария", methods: "КМАФАнМ · дрожжи и плесени · БГКП · патогенные" },
    { id: "chrom", name: "Хроматографические исследования", methods: "жирнокислотный состав · трансизомеры · стеролы · сахара" },
    { id: "physchem", name: "Физико-химические исследования", methods: "перекисное/кислотное число · влага и aw · реология · идентификация шоколада" },
    { id: "flour", name: "Технология мучных кондитерских изделий", methods: "прочность печенья · намокаемость · плотность теста" },
    { id: "choc", name: "Технология шоколадных и сахаристых изделий", methods: "идентификация шоколада · дисперсность · прочность студня" }
  ];
  var INSTR = [
    { id: "kt", name: "КТ-сканер", verifiedTill: "11.2026" },
    { id: "nmr", name: "ЯМР-спектрометр", verifiedTill: "09.2026" },
    { id: "chrom", name: "Хроматограф", verifiedTill: "03.2026" },
    { id: "struct", name: "Структурометр", verifiedTill: "12.2026" }
  ];
  var DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  var STATUS = { new: "Принят", work: "В работе", done: "Готов" };

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

  var SEED = {
    samples: [
      { id: "К-101", lab: "micro", date: "08.06", product: "Печенье сахарное", client: "ООО «Сластёна»", tests: ["КМАФАнМ (ГОСТ 33536-2015)", "Дрожжи и плесени (ГОСТ 10444.12-2013)", "БГКП (ГОСТ 31747-2012)"], status: "work" },
      { id: "К-102", lab: "choc", date: "08.06", product: "Шоколад молочный", client: "Фабрика «Заря»", tests: ["Идентификационные признаки шоколада", "Массовая доля масла какао (МВИ 45-…)", "Степень измельчения (ГОСТ Р 54052-2010)"], status: "new" },
      { id: "К-103", lab: "choc", date: "07.06", product: "Мармелад желейный", client: "ИП Орлова",
        tests: [
          { ind: "Массовая доля редуцирующих веществ", nd: "ГОСТ 5903-89", val: 18.5, unit: "%", lim: 23, op: "<=", u: 1.2 },
          { ind: "Массовая доля фруктового сырья", nd: "МВИ 39-…", val: 16.4, unit: "%", lim: 15, op: ">=", u: 1.0 },
          { ind: "Прочность студня", nd: "ГОСТ 26185-84", val: 14.2, unit: "Н", lim: 12, op: ">=", u: 0.8 }
        ], status: "done" },
      { id: "К-104", lab: "chrom", date: "07.06", product: "Пряники заварные", client: "ООО «Тула-Хлеб»", tests: ["Жирнокислотный состав (ГОСТ 30623-2018)", "Перекисное число (ГОСТ 26593-85)", "Кислотное число (ГОСТ 31933-2012)"], status: "work" },
      { id: "К-105", lab: "physchem", date: "06.06", product: "Конфеты глазированные", client: "Кондитер «Победа»",
        tests: [
          { ind: "КТ-морфометрия пористости", nd: "методика ВНИИКП", val: 27.0, unit: "%", lim: 30, op: "<=", u: 1.5 },
          { ind: "Массовая доля влаги", nd: "ГОСТ 5900-2014", val: 7.7, unit: "%", lim: 8.0, op: "<=", u: 0.4 },
          { ind: "Активность воды", nd: "ГОСТ ISO 21807-2015", val: 0.55, unit: "a_w", lim: 0.60, op: "<=", u: 0.02 }
        ], status: "done" },
      { id: "К-106", lab: "flour", date: "09.06", product: "Вафли", client: "ООО «Хрустик»", tests: ["Массовая доля общего жира (ГОСТ 31902-2012)", "Намокаемость (ГОСТ 10114)", "Массовая доля вафельной крошки (ГОСТ 5897-90)"], status: "new" }
    ],
    bookings: { kt: { 0: "К-105", 2: "К-101" }, nmr: { 1: "К-104" }, chrom: { 0: "К-104", 3: "К-102" }, struct: { 2: "К-103" } }
  };

  var state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { state = null; }
  if (!state || !state.samples) state = JSON.parse(JSON.stringify(SEED));
  if (!state.lab) state.lab = "all";
  var undo = null; // последнее обратимое действие
  function curLab() { return state.lab || "all"; }
  function curSamples() { var l = curLab(); return l === "all" ? state.samples : state.samples.filter(function (x) { return x.lab === l; }); }
  function labInfo() {
    var l = LABS.filter(function (x) { return x.id === curLab(); })[0];
    if (!l || l.id === "all") return "";
    return '<div class="kb-labinfo"><b>Лаборатория: ' + esc(l.name) + '</b><span>' + esc(l.methods) + "</span></div>";
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
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
    var slots = INSTR.length * DAYS.length;
    var used = 0;
    INSTR.forEach(function (i) { used += Object.keys(state.bookings[i.id] || {}).length; });
    var load = Math.round(used / slots * 100);
    function card(n, l, cls) { return '<div class="kb-kpi ' + (cls || "") + '"><div class="n">' + n + '</div><div class="l">' + l + "</div></div>"; }
    var recentRows = s.slice().reverse().slice(0, 5).map(function (x) {
      return '<tr><td><b>' + esc(x.id) + '</b></td><td>' + esc(x.product) + '</td><td>' + esc(x.client) + '</td><td>' + badge(x.status) + "</td></tr>";
    }).join("");
    var recent = total ? '<table class="kb-table"><tbody>' + recentRows + "</tbody></table>" : empty("По выбранной лаборатории образцов пока нет.");
    $("kb-dash").innerHTML =
      '<h2>Дашборд</h2>' + labInfo() +
      '<div class="kb-kpis">' + card(total, "Образцов всего") + card(nw, "Новые", "amber") + card(work, "В работе", "blue") + card(done, "Готово", "green") + card(load + "%", "Загрузка приборов") + "</div>" +
      '<div class="kb-grid2">' +
      '<div class="kb-box"><h3>Загрузка приборов (неделя)</h3>' + instrBars() + "</div>" +
      '<div class="kb-box"><h3>Последние образцы</h3>' + recent + "</div>" +
      "</div>";
  }
  function instrBars() {
    return INSTR.map(function (i) {
      var u = Object.keys(state.bookings[i.id] || {}).length;
      var pct = Math.round(u / DAYS.length * 100);
      return '<div class="kb-bar"><span>' + esc(i.name) + '</span><div class="kb-track"><div class="kb-fill" style="width:' + pct + '%"></div></div><b>' + u + "/5</b></div>";
    }).join("");
  }

  /* ---------- журнал образцов (LIMS) ---------- */
  function badge(st) { var c = { new: "amber", work: "blue", done: "green" }[st]; return '<span class="kb-badge ' + c + '">' + STATUS[st] + "</span>"; }
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
      if (x.status === "done") { acts += '<button class="kb-mini primary" data-act="proto" data-i="' + idx + '">Протокол</button>'; acts += '<button class="kb-mini ghost" data-act="back-work" data-i="' + idx + '">↩ в работу</button>'; }
      var tests = (x.tests || []).map(function (t) { return "<li>" + esc(testName(t)) + "</li>"; }).join("");
      return '<tr><td><b>' + esc(x.id) + '</b><div class="kb-sub">' + esc(x.date) + '</div></td>' +
        "<td>" + esc(x.product) + '<div class="kb-sub">' + esc(x.client) + "</div></td>" +
        '<td><ul class="kb-tests">' + tests + "</ul></td>" +
        "<td>" + badge(x.status) + resultPill(x) + "</td><td>" + acts + "</td></tr>";
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
      '<button class="kb-mini primary" id="js-add">Принять</button></div></div>' + table;
    $("js-add").addEventListener("click", function () {
      var prod = $("js-prod").value.trim(); if (!prod) { toast("Укажите продукт"); return; }
      var n = state.samples.length + 101;
      state.samples.push({ id: "К-" + n, lab: (curLab() === "all" ? "physchem" : curLab()), date: "—", product: prod, client: $("js-cli").value.trim() || "—", tests: ($("js-tests").value.trim() ? $("js-tests").value.split(",").map(function (t) { return t.trim(); }) : ["—"]), status: "new" });
      save(); renderJournal();
      toast("Образец К-" + n + " принят");
    });
    $("kb-journal").querySelectorAll(".kb-mini[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.dataset.i, a = b.dataset.act, x = state.samples[i];
        if (a === "work") { x.status = "work"; save(); refresh(); toast(x.id + " — в работе"); }
        else if (a === "result") { openResultModal(i); }
        else if (a === "proto") { showProtocol(x); }
        else if (a === "back-new") { x.status = "new"; save(); refresh(); toast(x.id + " возвращён в «Принят»"); }
        else if (a === "back-work") {
          var snapshot = JSON.parse(JSON.stringify(x));
          x.status = "work";
          save(); refresh();
          undo = function () { state.samples[i] = snapshot; save(); refresh(); toast("Действие отменено"); };
          toast(x.id + " возвращён в работу", "Отменить");
        }
      });
    });
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
        '<td><input class="kb-resin" type="number" step="any" placeholder="' + (lim === "" ? "значение" : lim) + '" style="width:110px"> ' + esc(unit) + "</td></tr>";
    }).join("");
    var box = $("kb-res-modal");
    box.innerHTML =
      '<div class="kb-modal-box"><div class="kb-modal-head"><b>Внести результаты — ' + esc(x.id) + " · " + esc(x.product) + '</b>' +
      '<button class="kb-mini" type="button" data-res="close">Отмена</button></div>' +
      '<div class="proto"><p class="kb-sub">Введите измеренное значение по каждому показателю. Норму по НД и расширенную неопределённость U (k=2) система подставит из справочника методик и сама вынесет вывод о соответствии с учётом неопределённости.</p>' +
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
      if (raw !== "" && raw != null) t.val = +raw;
      return t;
    });
    x.status = "done";
    save(); closeModal($("kb-res-modal")); renderJournal();
    var v = sampleVerdict(x);
    toast(x.id + " готов — заключение: " + (v ? v.txt : "введите значения"));
    showProtocol(x);
  }

  /* ---------- календарь приборов ---------- */
  function renderCal() {
    var head = "<tr><th>Прибор</th>" + DAYS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr>";
    var body = INSTR.map(function (i) {
      var expired = isVerifyExpired(i.verifiedTill);
      var cells = DAYS.map(function (d, di) {
        var bk = (state.bookings[i.id] || {})[di];
        return '<td class="kb-cell ' + (bk ? "busy" : "free") + (expired ? " locked" : "") + '" data-i="' + i.id + '" data-d="' + di + '">' + (bk ? esc(bk) : (expired ? "✕" : "+")) + "</td>";
      }).join("");
      var ver = '<span class="kb-ver ' + (expired ? "bad" : "ok") + '">поверка до ' + esc(i.verifiedTill) + (expired ? " · просрочена" : "") + "</span>";
      return "<tr><td><b>" + esc(i.name) + "</b><div class=\"kb-sub\">" + ver + "</div></td>" + cells + "</tr>";
    }).join("");
    $("kb-cal").innerHTML =
      '<h2>Календарь загрузки приборов</h2>' +
      '<p class="kb-sub">Клик по ячейке — забронировать прибор под образец или снять бронь. Прибор с просроченной поверкой (✕) бронировать нельзя — требование ГОСТ ISO/IEC 17025 п.6.4. Демо-неделя.</p>' +
      '<table class="kb-cal-tab"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
    $("kb-cal").querySelectorAll(".kb-cell").forEach(function (c) {
      c.addEventListener("click", function () {
        var iid = c.dataset.i, di = c.dataset.d;
        var instr = INSTR.filter(function (x) { return x.id === iid; })[0];
        if (isVerifyExpired(instr.verifiedTill)) { toast(instr.name + ": поверка просрочена, бронь заблокирована"); return; }
        state.bookings[iid] = state.bookings[iid] || {};
        if (state.bookings[iid][di]) { delete state.bookings[iid][di]; save(); renderCal(); toast("Бронь снята"); }
        else { openBookModal(iid, di); }
      });
    });
  }
  function isVerifyExpired(till) {
    var m = String(till || "").match(/(\d{2})\.(\d{4})/); if (!m) return false;
    var y = +m[2], mo = +m[1];
    return (y < 2026) || (y === 2026 && mo < 6); // демо-«сегодня» — июнь 2026
  }
  function openBookModal(iid, di) {
    var instr = INSTR.filter(function (x) { return x.id === iid; })[0];
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

  /* ---------- протокол ---------- */
  function showProtocol(x) {
    var tests = (x.tests || []).map(parseTest);
    var rows = tests.map(function (t, n) {
      var v = verdict(t);
      return "<tr><td>" + (n + 1) + "</td><td>" + esc(t.ind) + '<div class="kb-sub">' + esc(t.nd || "") + "</div></td>" +
        "<td>" + esc(resText(t)) + "</td><td>" + esc(normText(t)) + '</td><td class="r ' + v.cls + '">' + v.txt + "</td></tr>";
    }).join("");
    var sv = sampleVerdict(x);
    var concl = sv
      ? '<p class="proto-concl"><b>Заключение:</b> по совокупности исследованных показателей образец <b class="kb-vres ' + sv.cls + '">' + sv.txt + "</b> требованиям нормативной документации." +
        (sv.cls === "border" ? ' <span class="kb-sub">Один из показателей в зоне неопределённости: результат с учётом расширенной неопределённости U пересекает границу нормы — по решающему правилу однозначное соответствие не подтверждается, требуется повторное определение.</span>' : "") + "</p>"
      : '<p class="proto-concl kb-sub">Числовые результаты ещё не внесены — заключение формируется после ввода значений.</p>';
    $("kb-proto-body").innerHTML =
      '<div class="proto-head"><div><b>ВНИИ кондитерской промышленности</b><br>филиал ФГБНУ «ФНЦ пищевых систем им. В.М. Горбатова» РАН<br>107023, Москва, ул. Электрозаводская, 20с3</div>' +
      '<div class="proto-no">ПРОТОКОЛ ИСПЫТАНИЙ<br>№ ' + esc(x.id) + "/2026</div></div>" +
      '<table class="proto-meta"><tbody>' +
      "<tr><td>Образец</td><td><b>" + esc(x.product) + "</b> (" + esc(x.id) + ")</td></tr>" +
      "<tr><td>Заказчик</td><td>" + esc(x.client) + "</td></tr>" +
      "<tr><td>Дата поступления</td><td>" + esc(x.date) + ".2026</td></tr>" +
      "</tbody></table>" +
      '<table class="proto-tab"><thead><tr><th>№</th><th>Показатель / метод (НД)</th><th>Результат</th><th>Норма по НД</th><th>Вывод</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      concl +
      '<div class="proto-sign"><span>Зав. лабораторией ______________</span><span>Исполнитель ______________</span></div>' +
      '<p class="kb-sub" style="margin-top:10px">Демонстрационный протокол. Вывод по каждому показателю вычисляется сравнением результата с нормой НД с учётом расширенной неопределённости U (k=2). Реальные результаты, бланк и подписи формирует институт.</p>';
    openModal($("kb-proto-modal"));
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

    // делегирование для модалок брони и результатов
    document.addEventListener("click", function (e) {
      var bk = e.target.closest("[data-book]");
      if (bk) {
        var a = bk.getAttribute("data-book");
        if (a === "close") closeModal($("kb-book-modal"));
        else if (a === "ok") {
          var iid = bk.getAttribute("data-i"), di = bk.getAttribute("data-d"), v = ($("kb-book-sel") || {}).value;
          if (v) { state.bookings[iid] = state.bookings[iid] || {}; state.bookings[iid][di] = v; save(); closeModal($("kb-book-modal")); renderCal(); toast("Прибор забронирован под " + v); }
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
