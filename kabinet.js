/* ВНИИКП — «Рабочее место лаборатории» (демо для сотрудников): журнал образцов (LIMS-lite),
   календарь приборов, дашборд директора, генератор протоколов. Состояние — localStorage. Прототип. */
(function () {
  "use strict";
  var KEY = "wniikp_kabinet_v2";
  var LABS = [
    { id: "all", name: "Все лаборатории", methods: "сводно по всем лабораториям института" },
    { id: "micro", name: "Микробиология, гигиена и санитария", methods: "КМАФАнМ · дрожжи и плесени · БГКП · патогенные" },
    { id: "chrom", name: "Хроматографические исследования", methods: "жирнокислотный состав · трансизомеры · стеролы · сахара" },
    { id: "physchem", name: "Физико-химические исследования", methods: "перекисное/кислотное число · влага и aw · реология · идентификация шоколада" },
    { id: "flour", name: "Технология мучных кондитерских изделий", methods: "прочность печенья · намокаемость · плотность теста" },
    { id: "choc", name: "Технология шоколадных и сахаристых изделий", methods: "идентификация шоколада · дисперсность · прочность студня" }
  ];
  var INSTR = [
    { id: "kt", name: "КТ-сканер" },
    { id: "nmr", name: "ЯМР-спектрометр" },
    { id: "chrom", name: "Хроматограф" },
    { id: "struct", name: "Структурометр" }
  ];
  var DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
  var STATUS = { new: "Принят", work: "В работе", done: "Готов" };

  var SEED = {
    samples: [
      { id: "К-101", lab: "micro", date: "08.06", product: "Печенье сахарное", client: "ООО «Сластёна»", tests: ["КМАФАнМ (ГОСТ 33536-2015)", "Дрожжи и плесени (ГОСТ 10444.12-2013)", "БГКП (ГОСТ 31747-2012)"], status: "work" },
      { id: "К-102", lab: "choc", date: "08.06", product: "Шоколад молочный", client: "Фабрика «Заря»", tests: ["Идентификационные признаки шоколада", "Массовая доля масла какао (МВИ 45-…)", "Степень измельчения (ГОСТ Р 54052-2010)"], status: "new" },
      { id: "К-103", lab: "choc", date: "07.06", product: "Мармелад желейный", client: "ИП Орлова", tests: ["Массовая доля редуцирующих веществ (ГОСТ 5903-89)", "Массовая доля фруктового сырья (МВИ 39-…)", "Прочность студня (ГОСТ 26185-84)"], status: "done", result: "соответствует" },
      { id: "К-104", lab: "chrom", date: "07.06", product: "Пряники заварные", client: "ООО «Тула-Хлеб»", tests: ["Жирнокислотный состав (ГОСТ 30623-2018)", "Перекисное число (ГОСТ 26593-85)", "Кислотное число (ГОСТ 31933-2012)"], status: "work" },
      { id: "К-105", lab: "physchem", date: "06.06", product: "Конфеты глазированные", client: "Кондитер «Победа»", tests: ["КТ-морфометрия пористости", "Массовая доля влаги (ГОСТ 5900-2014)", "Активность воды (ГОСТ ISO 21807-2015)"], status: "done", result: "соответствует" },
      { id: "К-106", lab: "flour", date: "09.06", product: "Вафли", client: "ООО «Хрустик»", tests: ["Массовая доля общего жира (ГОСТ 31902-2012)", "Намокаемость (ГОСТ 10114)", "Массовая доля вафельной крошки (ГОСТ 5897-90)"], status: "new" }
    ],
    bookings: { kt: { 0: "К-105", 2: "К-101" }, nmr: { 1: "К-104" }, chrom: { 0: "К-104", 3: "К-102" }, struct: { 2: "К-103" } }
  };

  var state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { state = null; }
  if (!state || !state.samples) state = JSON.parse(JSON.stringify(SEED));
  if (!state.lab) state.lab = "all";
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

  /* ---------- вкладки ---------- */
  function showTab(name) {
    document.querySelectorAll(".kb-tab").forEach(function (t) { t.classList.toggle("active", t.dataset.tab === name); });
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
    var recent = s.slice().reverse().slice(0, 5).map(function (x) {
      return '<tr><td><b>' + esc(x.id) + '</b></td><td>' + esc(x.product) + '</td><td>' + esc(x.client) + '</td><td>' + badge(x.status) + "</td></tr>";
    }).join("");
    $("kb-dash").innerHTML =
      '<h2>Дашборд</h2>' + labInfo() +
      '<div class="kb-kpis">' + card(total, "Образцов всего") + card(nw, "Новые", "amber") + card(work, "В работе", "blue") + card(done, "Готово", "green") + card(load + "%", "Загрузка приборов") + "</div>" +
      '<div class="kb-grid2">' +
      '<div class="kb-box"><h3>Загрузка приборов (неделя)</h3>' + instrBars() + "</div>" +
      '<div class="kb-box"><h3>Последние образцы</h3><table class="kb-table"><tbody>' + recent + "</tbody></table></div>" +
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
  function renderJournal() {
    var rows = state.samples.map(function (x, idx) {
      if (curLab() !== "all" && x.lab !== curLab()) return "";
      var acts = "";
      if (x.status === "new") acts += '<button class="kb-mini" data-act="work" data-i="' + idx + '">→ В работу</button>';
      if (x.status === "work") acts += '<button class="kb-mini" data-act="done" data-i="' + idx + '">→ Готов</button>';
      if (x.status === "done") acts += '<button class="kb-mini primary" data-act="proto" data-i="' + idx + '">Протокол</button>';
      var tests = x.tests.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
      return '<tr><td><b>' + esc(x.id) + '</b><div class="kb-sub">' + esc(x.date) + '</div></td>' +
        "<td>" + esc(x.product) + '<div class="kb-sub">' + esc(x.client) + "</div></td>" +
        '<td><ul class="kb-tests">' + tests + "</ul></td>" +
        "<td>" + badge(x.status) + "</td><td>" + acts + "</td></tr>";
    }).join("");
    $("kb-journal").innerHTML =
      '<h2>Журнал образцов <span class="kb-sub">(LIMS-lite)</span></h2>' + labInfo() +
      '<div class="kb-box" style="margin-bottom:16px"><h3>Принять образец</h3>' +
      '<div class="kb-form">' +
      '<input id="js-prod" placeholder="Продукт (напр. Печенье сахарное)">' +
      '<input id="js-cli" placeholder="Заказчик">' +
      '<input id="js-tests" placeholder="Испытания через запятую">' +
      '<button class="kb-mini primary" id="js-add">Принять</button></div></div>' +
      '<table class="kb-table"><thead><tr><th>Образец</th><th>Продукт / заказчик</th><th>Испытания</th><th>Статус</th><th></th></tr></thead><tbody>' + rows + "</tbody></table>";
    $("js-add").addEventListener("click", function () {
      var prod = $("js-prod").value.trim(); if (!prod) return;
      var n = state.samples.length + 101;
      state.samples.push({ id: "К-" + n, lab: (curLab() === "all" ? "physchem" : curLab()), date: "—", product: prod, client: $("js-cli").value.trim() || "—", tests: ($("js-tests").value.trim() ? $("js-tests").value.split(",").map(function (t) { return t.trim(); }) : ["—"]), status: "new" });
      save(); renderJournal();
    });
    $("kb-journal").querySelectorAll(".kb-mini[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.dataset.i, a = b.dataset.act;
        if (a === "work") state.samples[i].status = "work";
        else if (a === "done") { state.samples[i].status = "done"; state.samples[i].result = "соответствует"; }
        else if (a === "proto") { showProtocol(state.samples[i]); return; }
        save(); renderJournal(); renderDash();
      });
    });
  }

  /* ---------- календарь приборов ---------- */
  function renderCal() {
    var head = "<tr><th>Прибор</th>" + DAYS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr>";
    var body = INSTR.map(function (i) {
      var cells = DAYS.map(function (d, di) {
        var bk = (state.bookings[i.id] || {})[di];
        return '<td class="kb-cell ' + (bk ? "busy" : "free") + '" data-i="' + i.id + '" data-d="' + di + '">' + (bk ? esc(bk) : "+") + "</td>";
      }).join("");
      return "<tr><td><b>" + esc(i.name) + "</b></td>" + cells + "</tr>";
    }).join("");
    $("kb-cal").innerHTML =
      '<h2>Календарь загрузки приборов</h2>' +
      '<p class="kb-sub">Клик по ячейке — забронировать прибор под образец / снять бронь. Демо-неделя.</p>' +
      '<table class="kb-cal-tab"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
    $("kb-cal").querySelectorAll(".kb-cell").forEach(function (c) {
      c.addEventListener("click", function () {
        var iid = c.dataset.i, di = c.dataset.d;
        state.bookings[iid] = state.bookings[iid] || {};
        if (state.bookings[iid][di]) { delete state.bookings[iid][di]; }
        else {
          var ids = state.samples.map(function (x) { return x.id; });
          var v = prompt("ID образца для брони (" + ids.join(", ") + "):", ids[0] || "К-");
          if (!v) return;
          state.bookings[iid][di] = v.trim();
        }
        save(); renderCal();
      });
    });
  }

  /* ---------- протокол ---------- */
  function showProtocol(x) {
    var rows = x.tests.map(function (t, n) {
      return "<tr><td>" + (n + 1) + "</td><td>" + esc(t) + '</td><td class="r">соответствует</td></tr>';
    }).join("");
    $("kb-proto-body").innerHTML =
      '<div class="proto-head"><div><b>ВНИИ кондитерской промышленности</b><br>филиал ФГБНУ «ФНЦ пищевых систем им. В.М. Горбатова» РАН<br>107023, Москва, ул. Электрозаводская, 20с3</div>' +
      '<div class="proto-no">ПРОТОКОЛ ИСПЫТАНИЙ<br>№ ' + esc(x.id) + "/2026</div></div>" +
      '<table class="proto-meta"><tbody>' +
      "<tr><td>Образец</td><td><b>" + esc(x.product) + "</b> (" + esc(x.id) + ")</td></tr>" +
      "<tr><td>Заказчик</td><td>" + esc(x.client) + "</td></tr>" +
      "<tr><td>Дата поступления</td><td>" + esc(x.date) + ".2026</td></tr>" +
      "</tbody></table>" +
      '<table class="proto-tab"><thead><tr><th>№</th><th>Показатель / метод</th><th>Результат</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      '<p class="proto-concl"><b>Заключение:</b> образец <b>' + esc(x.result || "—") + "</b> требованиям нормативной документации по исследованным показателям.</p>" +
      '<div class="proto-sign"><span>Зав. лабораторией ______________</span><span>Исполнитель ______________</span></div>' +
      '<p class="kb-sub" style="margin-top:10px">Демонстрационный протокол. Реальные результаты, бланк и подписи формирует институт.</p>';
    $("kb-proto-modal").classList.remove("hidden");
  }

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
    $("kb-proto-close").addEventListener("click", function () { $("kb-proto-modal").classList.add("hidden"); });
    $("kb-proto-print").addEventListener("click", function () { window.print(); });
    $("kb-reset").addEventListener("click", function () { state = JSON.parse(JSON.stringify(SEED)); state.lab = "all"; save(); if ($("kb-lab")) $("kb-lab").value = "all"; showTab("dash"); });
    showTab("dash");
  });
})();
