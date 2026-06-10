/* ВНИИКП — онлайн-инструменты для клиентов: подбор испытаний, оценка срока годности, расчёт пищевой ценности. Прототип. */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ---------- Вкладки ---------- */
  var tabs = document.querySelectorAll(".ttab");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      document.querySelectorAll(".tool").forEach(function (p) { p.classList.add("hidden"); });
      var pane = $("tool-" + t.dataset.tool);
      if (pane) pane.classList.remove("hidden");
    });
  });

  /* =====================================================================
     1. ПОДБОР ИСПЫТАНИЙ (конструктор заявки)
     ===================================================================== */
  var PRODUCTS = [
    { id: "flour", label: "Мучные: печенье, пряники, кексы, вафли" },
    { id: "choc",  label: "Шоколад и какао-продукты" },
    { id: "sugar", label: "Сахаристые: конфеты, мармелад, пастила, карамель" },
    { id: "raw",   label: "Сырьё: мука, жиры, какао-бобы" }
  ];
  var GOALS = [
    { id: "quality",  label: "Подтвердить качество и безопасность" },
    { id: "claim",    label: "Рекламация / спор о качестве" },
    { id: "shelf",    label: "Установить срок годности" },
    { id: "launch",   label: "Вывод нового продукта (ТУ + маркировка)" },
    { id: "incoming", label: "Входной контроль сырья" },
    { id: "ident",    label: "Идентификация / экспертиза" }
  ];
  // База рекомендаций: показатель → когда добавлять
  function recommend(p, g) {
    var out = [];
    function add(name) { if (out.indexOf(name) < 0) out.push(name); }

    // безопасность — почти всегда
    if (g === "quality" || g === "claim" || g === "shelf" || g === "incoming") {
      add("Органолептическая оценка");
    }
    if (g === "quality" || g === "shelf") {
      add("КМАФАнМ (ГОСТ 33536-2015)");
      add("Дрожжи и плесневые грибы (ГОСТ 10444.12-2013)");
      add("БГКП (ГОСТ 31747-2012)");
    }
    // влага/жиры — база
    if (g === "quality" || g === "claim" || g === "shelf") {
      add("Массовая доля влаги (ГОСТ 5900-2014)");
    }
    // по продукту
    if (p === "flour") {
      add("Намокаемость (ГОСТ 10114)");
      add("Плотность (ГОСТ 15810)");
      add("Щёлочность (ГОСТ 5898-2022)");
      if (g !== "incoming") add("Массовая доля общего жира (ГОСТ 31902-2012)");
    }
    if (p === "choc") {
      add("Идентификационные признаки шоколада (ГОСТ 31723/31682/31722-2012)");
      add("Массовая доля масла какао (МВИ 45-00334675-2015)");
      add("Степень измельчения — лазерная дифракция (ГОСТ Р 54052-2010)");
    }
    if (p === "sugar") {
      add("Массовая доля общего сахара (ГОСТ 5903-89)");
      add("Массовая доля редуцирующих веществ (ГОСТ 5903-89)");
      add("Структурно-механические показатели (прочность студня)");
      add("Массовая доля фруктового сырья (МВИ 39-00334675-2014)");
    }
    if (p === "raw") {
      add("Зольность (ГОСТ 27494-2016)");
      add("Цветность муки (ГОСТ 27558-2022)");
      add("Жирнокислотный состав (ГОСТ 30623-2018)");
      add("Товароведческий анализ какао-бобов");
    }
    // по задаче
    if (g === "shelf" || g === "claim") {
      add("Перекисное число (ГОСТ 26593-85)");
      add("Кислотное число (ГОСТ 31933-2012)");
      add("Анизидиновое число (ГОСТ 31756-2012)");
    }
    if (g === "shelf") {
      add("Активность воды (ГОСТ ISO 21807-2015)");
      add("Установление срока годности (ГОСТ Р 70412-2022)");
    }
    if (g === "claim") {
      add("Независимое экспертное заключение института");
    }
    if (g === "launch") {
      add("Расчёт пищевой и энергетической ценности");
      add("Разработка ТУ / ТИ");
      add("Экспертиза маркировки (ТР ТС)");
    }
    if (g === "ident") {
      add("Состав триглицеридов — содержание ЭМК (ГОСТ Р ИСО 23275)");
      add("Массовая доля трансизомеров (ГОСТ Р 54687-2011)");
      add("Экспертная оценка на соответствие НД");
    }
    if (g === "incoming") {
      add("Показатели качества сырья по нормативной документации");
    }
    return out;
  }
  (function initPodbor() {
    var ps = $("pbProduct"), gs = $("pbGoal");
    if (!ps) return;
    PRODUCTS.forEach(function (p) { ps.appendChild(el("option", "", p.label)).value = p.id; });
    GOALS.forEach(function (g) { gs.appendChild(el("option", "", g.label)).value = g.id; });
    function map(sel, arr) { return arr[sel.selectedIndex].id; }
    $("pbRun").addEventListener("click", function () {
      var list = recommend(map(ps, PRODUCTS), map(gs, GOALS));
      var box = $("pbResult");
      var rows = list.map(function (n) {
        return '<li><label><input type="checkbox" checked> <span>' + n + "</span></label></li>";
      }).join("");
      box.innerHTML =
        '<div class="tool-res">' +
        "<h3>Рекомендованный набор испытаний</h3>" +
        '<p class="muted">Отметьте нужное и отправьте заявку — институт подтвердит состав, срок и стоимость.</p>' +
        '<ul class="pick">' + rows + "</ul>" +
        '<a class="btn btn-primary" href="index.html#zayavka">Оставить заявку с этим набором →</a>' +
        '<p class="muted" style="font-size:13px;margin-top:10px">Подбор предварительный. Точный перечень под вашу задачу согласует специалист института.</p>' +
        "</div>";
      box.scrollIntoView({ block: "nearest" });
    });
  })();

  /* =====================================================================
     2. ЭКСПРЕСС-ОЦЕНКА СРОКА ГОДНОСТИ
     ===================================================================== */
  (function initSrok() {
    var run = $("skRun");
    if (!run) return;
    run.addEventListener("click", function () {
      var aw = parseFloat($("skAw").value);
      var fat = parseFloat($("skFat").value);
      var moist = parseFloat($("skMoist").value);
      var pack = $("skPack").value;       // herm / open
      var pres = $("skPres").value;       // yes / no
      if (isNaN(aw)) aw = (isNaN(moist) ? 0.6 : Math.min(0.99, 0.2 + moist / 50));

      // микробиологический риск по aw
      var micro = aw >= 0.85 ? 2 : aw >= 0.6 ? 1 : 0;
      if (pres === "yes") micro = Math.max(0, micro - 1);
      if (pack === "herm") micro = Math.max(0, micro - 0);
      // окислительный риск по жиру
      var oxid = isNaN(fat) ? 0 : fat >= 25 ? 2 : fat >= 10 ? 1 : 0;
      if (pack === "herm") oxid = Math.max(0, oxid - 1);

      var risk = Math.max(micro, oxid);
      var levelTxt = ["низкий", "средний", "высокий"][risk];
      var levelCls = ["ok", "warn", "bad"][risk];
      var estTxt = ["длительный (ориентир от 3 месяцев)", "средний (ориентир 1–3 месяца)", "малый (ориентир недели)"][risk];

      var mech = [];
      if (micro >= oxid && micro > 0) mech.push("микробиологическая порча (плесени, дрожжи) из-за высокой активности воды");
      if (oxid >= micro && oxid > 0) mech.push("окисление жировой фазы (прогоркание)");
      if (!mech.length) mech.push("выраженных факторов риска по введённым данным не выявлено");

      var tests = ["Массовая доля влаги (ГОСТ 5900-2014)", "Активность воды (ГОСТ ISO 21807-2015)"];
      if (oxid > 0) {
        tests.push("Перекисное число (ГОСТ 26593-85)");
        tests.push("Кислотное число (ГОСТ 31933-2012)");
        tests.push("Анизидиновое число (ГОСТ 31756-2012)");
        tests.push("Индукционный период (ГОСТ 31758-2012)");
      }
      if (micro > 0) {
        tests.push("КМАФАнМ (ГОСТ 33536-2015)");
        tests.push("Дрожжи и плесени (ГОСТ 10444.12-2013)");
        tests.push("БГКП (ГОСТ 31747-2012)");
      }

      $("skResult").innerHTML =
        '<div class="tool-res">' +
        '<div class="risk risk-' + levelCls + '">Предварительный риск порчи: <b>' + levelTxt + "</b></div>" +
        "<p><b>Ожидаемый срок годности:</b> " + estTxt + "</p>" +
        "<p><b>Основной механизм:</b> " + mech.join("; ") + ".</p>" +
        "<h4>Что нужно измерить для обоснования</h4>" +
        '<ul class="pkg">' + tests.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
        '<a class="btn btn-primary" href="usluga-srok-godnosti.html">Заказать установление срока годности →</a>' +
        '<div class="norm" style="margin-top:14px"><svg class="ic" aria-hidden="true"><use href="#ico-info"></use></svg> <b>Важно.</b> Это предварительная ориентировочная оценка по упрощённой модели. Официальное обоснование срока годности выполняется по <b>ГОСТ Р 70412-2022</b> и МУК 4.2.1847-04 с реальными испытаниями.</div>' +
        "</div>";
      $("skResult").scrollIntoView({ block: "nearest" });
    });
  })();

  /* =====================================================================
     3. КАЛЬКУЛЯТОР ПИЩЕВОЙ ЦЕННОСТИ
     ===================================================================== */
  // на 100 г: [белки, жиры, углеводы]
  var ING = [
    ["Мука пшеничная в/с", 10.3, 1.1, 70.6],
    ["Мука ржаная", 8.9, 1.7, 70],
    ["Сахар-песок", 0, 0, 99.7],
    ["Сахарная пудра", 0, 0, 99.8],
    ["Мёд", 0.8, 0, 80.3],
    ["Патока крахмальная", 0, 0, 78],
    ["Глюкозный сироп", 0, 0, 80],
    ["Инвертный сироп", 0, 0, 75],
    ["Масло сливочное", 0.5, 82.5, 0.8],
    ["Маргарин", 0.3, 82, 1],
    ["Масло растительное", 0, 99.9, 0],
    ["Масло какао", 0, 99.9, 0],
    ["Яйцо куриное / меланж", 12.7, 11.5, 0.7],
    ["Молоко сухое цельное", 26, 25, 37],
    ["Молоко сгущённое с сахаром", 7.2, 8.5, 56],
    ["Сливки 33%", 2.2, 33, 3.5],
    ["Сметана 20%", 2.8, 20, 3.2],
    ["Творог 9%", 16.7, 9, 2],
    ["Какао-порошок", 24.2, 17.5, 27.9],
    ["Какао тёртое", 13.5, 54, 22],
    ["Шоколад тёмный", 5.4, 35.4, 52.6],
    ["Фундук", 15, 61.5, 16.1],
    ["Миндаль", 18.6, 53.7, 13],
    ["Арахис", 26.3, 45.2, 9.9],
    ["Изюм", 2.9, 0.6, 66],
    ["Повидло яблочное", 0.4, 0, 65],
    ["Джем фруктовый", 0.3, 0, 56],
    ["Крахмал кукурузный", 1, 0.6, 85.2],
    ["Желатин", 87.2, 0.4, 0.7],
    ["Агар / пектин", 4, 0, 76],
    ["Соль / сода / разрыхлитель", 0, 0, 0],
    ["Вода", 0, 0, 0]
  ];
  (function initNutri() {
    var rows = $("ntRows");
    if (!rows) return;
    function ingSelect() {
      var s = el("select", "nt-ing");
      ING.forEach(function (i, idx) { var o = el("option", "", i[0]); o.value = idx; s.appendChild(o); });
      return s;
    }
    function addRow() {
      var r = el("div", "nt-row");
      var s = ingSelect();
      var g = el("input", "nt-g");
      g.type = "number"; g.min = "0"; g.placeholder = "граммы";
      var del = el("button", "nt-del", "✕"); del.type = "button"; del.setAttribute("aria-label", "Удалить");
      del.addEventListener("click", function () { r.remove(); });
      r.appendChild(s); r.appendChild(g); r.appendChild(del);
      rows.appendChild(r);
    }
    addRow(); addRow(); addRow();
    $("ntAdd").addEventListener("click", addRow);
    $("ntCalc").addEventListener("click", function () {
      var mass = 0, P = 0, F = 0, C = 0;
      rows.querySelectorAll(".nt-row").forEach(function (r) {
        var idx = +r.querySelector(".nt-ing").value;
        var g = parseFloat(r.querySelector(".nt-g").value);
        if (isNaN(g) || g <= 0) return;
        var i = ING[idx];
        mass += g; P += i[1] * g / 100; F += i[2] * g / 100; C += i[3] * g / 100;
      });
      if (mass <= 0) { $("ntResult").innerHTML = '<p class="muted">Добавьте ингредиенты и массу в граммах.</p>'; return; }
      var k = 100 / mass;
      var kcal100 = (4 * P + 9 * F + 4 * C) * k;
      function f(x) { return (Math.round(x * 10) / 10).toFixed(1); }
      $("ntResult").innerHTML =
        '<div class="tool-res">' +
        "<h3>Пищевая ценность на 100 г продукта</h3>" +
        '<table class="nutab"><tbody>' +
        "<tr><td>Белки</td><td><b>" + f(P * k) + "</b> г</td></tr>" +
        "<tr><td>Жиры</td><td><b>" + f(F * k) + "</b> г</td></tr>" +
        "<tr><td>Углеводы</td><td><b>" + f(C * k) + "</b> г</td></tr>" +
        "<tr><td>Энергетическая ценность</td><td><b>" + Math.round(kcal100) + "</b> ккал / " + Math.round(kcal100 * 4.184) + " кДж</td></tr>" +
        "</tbody></table>" +
        '<p class="muted" style="font-size:13px">Общая масса смеси: ' + Math.round(mass) + " г. Расчёт по справочным значениям состава сырья (без учёта потерь при выпечке).</p>" +
        '<div class="norm" style="margin-top:10px"><svg class="ic" aria-hidden="true"><use href="#ico-info"></use></svg> <b>Для маркировки</b> требуется официальный расчёт/измерение — институт выполняет его по заявке с учётом технологических потерь. <a href="index.html#zayavka">Заказать →</a></div>' +
        "</div>";
      $("ntResult").scrollIntoView({ block: "nearest" });
    });
  })();
})();
