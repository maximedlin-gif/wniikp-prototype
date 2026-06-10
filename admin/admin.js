/* ВНИИКП back-office — интерактивный прототип. Демо-данные в памяти сессии, без бэкенда. */
(function(){
var SPRITE='<svg xmlns="http://www.w3.org/2000/svg" style="display:none">'+
 '<symbol id="i-dash" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/></symbol>'+
 '<symbol id="i-leads" viewBox="0 0 24 24"><path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 8l9 6 9-6"/></symbol>'+
 '<symbol id="i-fin" viewBox="0 0 24 24"><path d="M8.5 20.5V4.5h4.8a4 4 0 0 1 0 8H6"/><path d="M6 16.5h7.5"/></symbol>'+
 '<symbol id="i-lab" viewBox="0 0 24 24"><path d="M9 3h6M10 3v5.5L5.2 17A2 2 0 0 0 7 20h10a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.7 14h8.6"/></symbol>'+
 '<symbol id="i-content" viewBox="0 0 24 24"><path d="M13.5 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5z"/><path d="M13.5 3v4.5H18M9 13h6M9 16.5h6"/></symbol>'+
 '<symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a3 3 0 0 1 5.6 1.3c0 2-3 2.5-3 4M12 17h.01"/></symbol>'+
 '<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M20.5 20a5.5 5.5 0 0 0-4-5.3"/></symbol>'+
 '<symbol id="i-report" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 4-6"/></symbol>'+
 '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></symbol>'+
 '<symbol id="i-out" viewBox="0 0 24 24"><path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3"/><path d="M10 8l-4 4 4 4M6 12h10"/></symbol>'+
 '<symbol id="i-scan" viewBox="0 0 24 24"><path d="M4 8.5V5.5A1.5 1.5 0 0 1 5.5 4H8.5M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3"/><circle cx="12" cy="12" r="3"/></symbol>'+
 '<symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.4l2.6 2.6L16 9.2"/></symbol>'+
 '<symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><circle cx="8.5" cy="14" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="15.5" cy="14" r="1"/></symbol>'+
 '<symbol id="ico-cake" viewBox="0 0 24 24"><path d="M3.5 20.5h17"/><path d="M5 20.5v-7.3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7.3"/><path d="M5 14.6c1.4 1.1 2.6 1.1 4 0s2.6-1.1 4 0 2.6 1.1 4 0 2-1 2-1"/><path d="M12 8.4V6"/><circle cx="12" cy="4.5" r="1.05"/></symbol>'+
 '<symbol id="ico-cookie" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="9.4" cy="10" r="1"/><circle cx="14.6" cy="9.4" r="1"/><circle cx="13.6" cy="14" r="1"/><circle cx="9" cy="14.6" r="1"/></symbol>'+
 '<symbol id="ico-chocolate" viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="1.6"/><path d="M5 9h14M5 14.5h14M12 3.5v17"/></symbol>'+
 '<symbol id="ico-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"/></symbol>'+
 '<symbol id="ico-scan" viewBox="0 0 24 24"><path d="M4 8.5V5.5A1.5 1.5 0 0 1 5.5 4H8.5M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3"/><circle cx="12" cy="12" r="3"/></symbol>'+
 '<symbol id="i-grip" viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h14"/></symbol>'+
 '</svg>';
function ic(n){return '<svg class="ic" aria-hidden="true"><use href="#i-'+n+'"></use></svg>';}
function money(n){return n.toLocaleString('ru-RU')+' ₽';}
function esc(s){return (s||'').replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});}
function val(id){return (document.getElementById(id)||{}).value||'';}
function isImg(s){return /^data:/.test(s)||/^https?:\/\//.test(s)||/\.(png|jpe?g|svg|webp|gif)$/i.test(s);}
function iconMarkup(icon,cls){return isImg(icon)?'<img class="'+(cls||'')+'" src="'+icon+'" alt="">':'<svg class="ic" aria-hidden="true"><use href="#'+(icon||'ico-spark')+'"></use></svg>';}

var DATA={
 planFHD:2400000,
 revMonths:[['Янв',1180],['Фев',1320],['Мар',1410],['Апр',1270],['Май',1560],['Июн',1840]],
 revServices:[['Сроки годности',640],['Шоколад/какао',420],['КТ-морфометрия',360],['Обучение',280],['Микробиология',140]],
 leads:[
  {id:'З-238',client:'ООО «Пряничный двор»',service:'Срок годности (пряники)',amount:48000,status:'new',mgr:'Орлова',date:'07.06',notes:[]},
  {id:'З-237',client:'ИП Сидорова (глазурь)',service:'Подбор аналога жира',amount:62000,status:'new',mgr:'Орлова',date:'06.06',notes:[]},
  {id:'З-235',client:'АО «Сластёна»',service:'КТ-морфометрия бисквита',amount:90000,status:'work',mgr:'Орлова',date:'05.06',notes:[]},
  {id:'З-233',client:'ООО «Кейк-Хаус»',service:'Идентификация шоколада',amount:36000,status:'work',mgr:'Петров',date:'04.06',notes:[]},
  {id:'З-230',client:'Кондитерская «Мишка»',service:'Обучение: органолептика',amount:72000,status:'bill',mgr:'Петров',date:'02.06',notes:[]},
  {id:'З-228',client:'ООО «ВкусПром»',service:'Маркировка + ТУ',amount:55000,status:'paid',mgr:'Орлова',date:'31.05',notes:[],paidDate:'02.06'},
  {id:'З-224',client:'Фабрика «Заря»',service:'Микробиология партии',amount:28000,status:'paid',mgr:'Петров',date:'28.05',notes:[],paidDate:'30.05'},
  {id:'З-219',client:'ООО «Десерт+»',service:'Срок годности (печенье)',amount:45000,status:'done',mgr:'Орлова',date:'22.05',notes:[],paidDate:'24.05',act:true}
 ],
 lab:[
  {id:'И-512',sample:'Бисквит К-12',method:'КТ-морфометрия',due:'10.06',who:'Зайцев',status:'work'},
  {id:'И-511',sample:'Глазурь Г-3',method:'Триглицеридный состав (ГХ)',due:'09.06',who:'Зайцев',status:'work'},
  {id:'И-509',sample:'Пряник П-7',method:'Активность воды + порча жиров',due:'08.06',who:'Кузнецова',status:'new'},
  {id:'И-507',sample:'Шоколад Ш-2',method:'Идентификация по ГОСТ 31721',due:'07.06',who:'Кузнецова',status:'done'},
  {id:'И-505',sample:'Печенье Пч-4',method:'Перекисное/кислотное число',due:'06.06',who:'Зайцев',status:'done'}
 ],
 tickets:[
  {id:'T-44',subj:'Не отправляется форма заявки в Safari',from:'Менеджер',status:'work'},
  {id:'T-43',subj:'Добавить новость о семинаре 26–28 окт',from:'Пресс-служба',status:'new'},
  {id:'T-41',subj:'Обновить телефон в подвале',from:'Бухгалтерия',status:'done'},
  {id:'T-40',subj:'Заменить фото на странице «Об институте»',from:'Дирекция',status:'new'}
 ],
 users:[
  {nm:'Белецкий С. Л.',role:'Директор',dept:'Дирекция',acc:'Полный'},
  {nm:'Орлова Е.',role:'Менеджер',dept:'Отдел продаж',acc:'Заявки'},
  {nm:'Петров А.',role:'Менеджер',dept:'Отдел продаж',acc:'Заявки'},
  {nm:'Иванова Н.',role:'Бухгалтерия',dept:'Финансы',acc:'Финансы'},
  {nm:'Белявская И. Г.',role:'Рук. лаборатории',dept:'Научный отдел',acc:'Лаборатория (все)'},
  {nm:'Зайцев Д.',role:'Научный сотрудник',dept:'Научный отдел',acc:'Лаборатория (свои)'},
  {nm:'Кузнецова М.',role:'Научный сотрудник',dept:'Научный отдел',acc:'Лаборатория (свои)'},
  {nm:'Смирнов В.',role:'Техподдержка',dept:'IT',acc:'Контент, тикеты'}
 ],
 holidays:[
  {key:'konditer',month:5,day:3,icon:'ico-cake',enabled:true,name:'С Днём кондитера!',msg:'3 мая 1932 года был основан наш институт — именно от этой даты ведёт начало профессиональный праздник кондитеров России.',cta:{text:'Об институте',href:'o-institute.html'}},
  {key:'pryanik',month:4,day:21,icon:'ico-cookie',enabled:true,name:'День пряника',msg:'Поздравляем мастеров пряничного дела! Институт помогает с рецептурой, сроками годности и контролем качества пряников.',cta:{text:'Решения для производств',href:'resheniya.html'}},
  {key:'pechenye',month:7,day:9,icon:'ico-cookie',enabled:true,name:'День сахарного печенья',msg:'Сладкого праздника! Контроль качества жиров и сроков годности печенья — задача нашей лаборатории.',cta:{text:'Установление срока годности',href:'usluga-srok-godnosti.html'}},
  {key:'chocolate',month:7,day:11,icon:'ico-chocolate',enabled:true,name:'Всемирный день шоколада',msg:'С праздником всех, кто работает с шоколадом! Институт проводит идентификацию и экспертизу шоколада и какао-продуктов.',cta:{text:'Услуги института',href:'uslugi.html'}},
  {key:'foodworker',special:'oct3sun',icon:'ico-spark',enabled:true,name:'С Днём работника пищевой промышленности!',msg:'Поздравляем коллег отрасли с профессиональным праздником (третье воскресенье октября).',cta:{text:'Обучение и повышение квалификации',href:'obuchenie.html'}}
 ]
};
var LOG=[{t:'07.06 09:14',who:'Система',msg:'Сессия начата (демо)'}];
function logAct(who,msg){LOG.unshift({t:'07.06 '+nowt(),who:who,msg:msg});}
function nowt(){var d=10+LOG.length;return (d<10?'0':'')+d+':0'+(LOG.length%6);}

var ROLES={
 director:{label:'Директор',who:'Белецкий С. Л.',menu:['dash','leads','finance','lab','reports','users']},
 manager:{label:'Менеджер',who:'Орлова Е.',menu:['dash','leads']},
 accountant:{label:'Бухгалтерия',who:'Иванова Н.',menu:['dash','finance','reports']},
 lab_head:{label:'Рук. лаборатории',who:'Белявская И. Г.',menu:['dash','lab','reports']},
 scientist:{label:'Научный сотрудник',who:'Зайцев Д.',menu:['lab']},
 support:{label:'Техподдержка',who:'Смирнов В.',menu:['dash','tickets','content','holidays']},
 admin:{label:'Администратор',who:'Администратор',menu:['dash','leads','finance','lab','content','holidays','tickets','users']}
};
var MOD={dash:['i-dash','Дашборд'],leads:['i-leads','Заявки'],finance:['i-fin','Финансы'],
 lab:['i-lab','Лаборатория'],content:['i-content','Контент сайта'],tickets:['i-help','Техподдержка'],
 users:['i-users','Пользователи и права'],reports:['i-report','Отчёты'],holidays:['i-cal','Праздники']};
var STATUS={new:['b-new','Новая'],work:['b-work','В работе'],bill:['b-bill','Счёт выставлен'],paid:['b-paid','Оплачено'],done:['b-done','Выполнено']};
function sb(s){return '<span class="badge '+STATUS[s][0]+'">'+STATUS[s][1]+'</span>';}
var state={role:null,mod:'dash',finView:'list'};
var holIconData=null; // data-URL загруженной своей иконки (на время заполнения формы)

// ---------- charts ----------
function lineChart(rows){var w=580,h=180,p=28,max=Math.max.apply(null,rows.map(function(r){return r[1];}))*1.1,st=(w-p*2)/(rows.length-1);
 var pts=rows.map(function(r,i){return [p+i*st,h-p-(r[1]/max)*(h-p*2)];});
 var ln=pts.map(function(q,i){return (i?'L':'M')+q[0].toFixed(0)+' '+q[1].toFixed(0);}).join(' ');
 var ar=ln+' L'+pts[pts.length-1][0].toFixed(0)+' '+(h-p)+' L'+p+' '+(h-p)+' Z';
 var d=pts.map(function(q){return '<circle cx="'+q[0].toFixed(0)+'" cy="'+q[1].toFixed(0)+'" r="3.5" fill="#c41019"/>';}).join('');
 var l=rows.map(function(r,i){return '<text x="'+(p+i*st).toFixed(0)+'" y="'+(h-8)+'" font-size="11" fill="#6a7783" text-anchor="middle">'+r[0]+'</text>';}).join('');
 return '<svg class="chart" viewBox="0 0 '+w+' '+h+'"><path d="'+ar+'" fill="#c4101914"/><path d="'+ln+'" fill="none" stroke="#c41019" stroke-width="2.5"/>'+d+l+'</svg>';}
function barList(rows){var max=Math.max.apply(null,rows.map(function(r){return r[1];}));
 return '<div class="bars">'+rows.map(function(r){return '<div class="bar"><div class="col" style="height:'+(r[1]/max*100).toFixed(0)+'%"></div><small>'+r[0].split(' ')[0]+'</small></div>';}).join('')+'</div>';}

// ---------- helpers ----------
function sum(arr){return arr.reduce(function(a,b){return a+b;},0);}
function paidLeads(){return DATA.leads.filter(function(l){return l.status==='paid'||l.status==='done';});}
function factRevenue(){return sum(paidLeads().map(function(l){return l.amount;}))+1610000;}

function kpi(lab,val,chg,icon){var c=chg===undefined?'':'<div class="chg '+(chg>=0?'up':'down')+'">'+(chg>=0?'▲ +':'▼ ')+chg+'% к прошлому мес.</div>';
 return '<div class="kpi"><div class="lab">'+ic(icon)+lab+'</div><div class="val">'+val+'</div>'+c+'</div>';}

// ---------- modules ----------
function mDash(role){
 if(role==='accountant') return mFinance(role);
 if(role==='lab_head'||role==='scientist') return mLab(role);
 if(role==='support') return mTickets(role);
 if(role==='manager'){
  var mine=DATA.leads.filter(function(l){return l.mgr==='Орлова';});
  return '<div class="kpis">'+kpi('Мои заявки',mine.length,undefined,'i-leads')+kpi('В работе',mine.filter(function(l){return l.status==='work';}).length,undefined,'i-leads')+kpi('Ждут счёта',DATA.leads.filter(function(l){return l.status==='bill';}).length,undefined,'i-fin')+kpi('Средний чек',money(54000),undefined,'i-report')+'</div>'+leadsKanban(true);
 }
 return '<div class="kpis">'+kpi('Выручка за месяц',money(1840000),12,'i-fin')+kpi('Заявок за месяц',DATA.leads.length,8,'i-leads')+kpi('Конверсия в оплату','31%',4,'i-report')+kpi('Загрузка лабораторий','78%',undefined,'i-lab')+'</div>'+
  '<div class="grid2"><div class="panel"><h3>'+ic('i-fin')+'Выручка по месяцам, тыс. ₽</h3>'+lineChart(DATA.revMonths)+'</div><div class="panel"><h3>'+ic('i-report')+'Выручка по услугам, тыс. ₽</h3>'+barList(DATA.revServices)+'</div></div>'+
  '<div class="panel"><h3>'+ic('i-leads')+'Последние заявки<span class="hint">режим просмотра</span></h3>'+leadsTable(DATA.leads.slice(0,6))+'</div>';
}
function leadsTable(rows){return '<table class="tbl"><tr><th>№</th><th>Клиент</th><th>Услуга</th><th>Менеджер</th><th>Статус</th><th class="num">Сумма</th></tr>'+
 rows.map(function(l){return '<tr data-lead="'+l.id+'"><td>'+l.id+'</td><td>'+l.client+'</td><td>'+l.service+'</td><td>'+l.mgr+'</td><td>'+sb(l.status)+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+'</table>';}
function leadsKanban(editable){var cols=['new','work','bill','paid','done'];
 return '<div class="kanban">'+cols.map(function(c){var it=DATA.leads.filter(function(l){return l.status===c;});
  return '<div class="kcol"><h4>'+STATUS[c][1]+'<span>'+it.length+'</span></h4>'+it.map(function(l){return '<div class="lead" data-lead="'+l.id+'"><div class="cl">'+l.client+'</div><div class="sv">'+l.service+'</div><div class="am">'+money(l.amount)+'</div></div>';}).join('')+'</div>';}).join('')+'</div>';}
function mLeads(role){var ro=(role==='director');
 return '<div class="panel" style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><b>Воронка продаж</b><span class="muted">кликните заявку → действия</span>'+(ro?'<span class="hint">режим просмотра</span>':'<button class="btn btn-primary" style="margin-left:auto" data-act="new-lead">+ Новая заявка</button>')+'</div>'+leadsKanban(!ro);}

function mFinance(role){
 if(state.finView==='report') return finReport(role);
 var paid=paidLeads();
 return '<div class="kpis">'+kpi('Выручка за месяц',money(1840000),12,'i-fin')+kpi('Оплачено счетов',paid.length,undefined,'i-check')+kpi('Ожидает оплаты',money(sum(DATA.leads.filter(function(l){return l.status==='bill';}).map(function(l){return l.amount;}))),undefined,'i-fin')+kpi('План ФХД, факт',(factRevenue()/DATA.planFHD*100).toFixed(0)+'%',undefined,'i-report')+'</div>'+
  '<div class="panel" style="display:flex;gap:10px;align-items:center"><b>'+ic('i-shield')+' Контроль и отчётность</b><span class="muted">доходы от платных услуг · КОСГУ 130</span><button class="btn btn-primary" style="margin-left:auto" data-act="fin-report">Отчёт для Счётной палаты</button></div>'+
  '<div class="panel"><h3>'+ic('i-fin')+'Динамика выручки, тыс. ₽</h3>'+lineChart(DATA.revMonths)+'</div>'+
  '<div class="panel"><h3>'+ic('i-report')+'Счета и оплаты<span class="hint"><button class="btn btn-ghost" data-act="csv-invoices">Экспорт CSV</button></span></h3>'+
   '<table class="tbl"><tr><th>Счёт</th><th>Клиент</th><th>Услуга</th><th>Статус</th><th class="num">Сумма</th></tr>'+
   DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;}).map(function(l){return '<tr><td>СЧ-'+l.id.slice(2)+'</td><td>'+l.client+'</td><td>'+l.service+'</td><td>'+sb(l.status)+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+'</table></div>';
}
function finReport(role){
 var rows=paidLeads();
 var fact=sum(rows.map(function(l){return l.amount;}));
 var closed=rows.filter(function(l){return l.act;}).length;
 var pct=(factRevenue()/DATA.planFHD*100).toFixed(0);
 var reg='<table class="tbl"><tr><th>Договор</th><th>Счёт</th><th>Акт</th><th>Заказчик</th><th>Услуга</th><th>Оплата</th><th>КОСГУ</th><th class="num">Сумма</th></tr>'+
  rows.map(function(l){var act=l.act?'<span class="doc-ok">А-'+l.id.slice(2)+'</span>':'<span class="doc-no">нет акта</span>';
   return '<tr><td>Д-'+l.id.slice(2)+'</td><td>СЧ-'+l.id.slice(2)+'</td><td>'+act+'</td><td>'+l.client+'</td><td>'+l.service+'</td><td>'+(l.paidDate||'—')+'</td><td>131</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+
  '<tr><td colspan="7"><b>Итого доходов от платных услуг (КОСГУ 130)</b></td><td class="num"><b>'+money(fact)+'</b></td></tr></table>';
 var trail='<table class="tbl"><tr><th>Время</th><th>Пользователь</th><th>Действие</th></tr>'+LOG.slice(0,8).map(function(e){return '<tr><td>'+e.t+'</td><td>'+e.who+'</td><td>'+esc(e.msg)+'</td></tr>';}).join('')+'</table>';
 return '<div class="panel" style="display:flex;gap:10px;align-items:center"><button class="btn btn-ghost" data-act="fin-list">← к финансам</button><b>'+ic('i-shield')+' Отчёт для контроля (Счётная палата / учредитель)</b><span class="hint">июнь 2026 · приносящая доход деятельность</span></div>'+
  '<div class="ctrl-cards">'+
   ctrlCard('Доходы от платных услуг','КОСГУ 130 (детал. 131)',money(fact),'ok')+
   ctrlCard('План ФХД — исполнение','факт / план '+money(DATA.planFHD),pct+'%',pct<50?'warn':'ok')+
   ctrlCard('Закрыто актами','полнота первички',closed+' из '+rows.length,closed<rows.length?'warn':'ok')+
   ctrlCard('Целевое использование','только цели по уставу','соответствует','ok')+'</div>'+
  '<div class="planbar"><div class="planbar-fill" style="width:'+Math.min(100,pct)+'%"></div><span>План ФХД: '+money(DATA.planFHD)+' · Факт: '+money(factRevenue())+' ('+pct+'%)</span></div>'+
  '<div class="panel"><h3>'+ic('i-fin')+'Реестр доходов: договор → счёт → акт → поступление<span class="hint"><button class="btn btn-ghost" data-act="csv-registry">Выгрузить (CSV)</button> <button class="btn btn-ghost" data-act="csv-737">Для ф. 0503737</button></span></h3>'+reg+'</div>'+
  '<div class="panel"><h3>'+ic('i-shield')+'Аудиторский след (кто и когда менял данные)</h3>'+trail+'</div>'+
  '<div class="norm-note">Отчёт формирует операционные данные для статотчётности учреждения: <b>ф. 0503737</b> «Отчёт об исполнении плана ФХД» (приказ Минфина № 33н), доходы по <b>КОСГУ 130</b>. Счётная палата проверяет полноту доходов, соответствие плану ФХД, целевое использование и наличие первички (договор/счёт/акт). Бухгалтерская отчётность и проводки ведутся в 1С/бухпрограмме — портал отдаёт сверочный реестр.</div>';
}
function ctrlCard(t,sub,val,st){return '<div class="ctrl-card '+st+'"><div class="cc-t">'+t+'</div><div class="cc-v">'+val+'</div><div class="cc-s">'+sub+'</div></div>';}

function mLab(role){var head=(role==='scientist')?'<span class="access-pill">доступ: только свои задания</span>':'<span class="access-pill">доступ: вся лаборатория</span>';
 var rows=DATA.lab; if(role==='scientist') rows=rows.filter(function(t){return t.who==='Зайцев';});
 return '<div class="panel"><h3>'+ic('i-lab')+'Задания на испытания '+head+'</h3>'+
  '<table class="tbl"><tr><th>№</th><th>Образец</th><th>Метод</th><th>Срок</th><th>Исполнитель</th><th>Статус</th><th></th></tr>'+
  rows.map(function(t){var act=t.method.indexOf('КТ')>-1?'<button class="btn btn-ghost" data-act="kt">'+ic('i-scan')+'КТ-модуль</button>':'';
   var pr=t.status==='done'?'<span class="doc-ok">'+ic('i-check')+' протокол загружен</span>':'<button class="btn btn-primary" data-act="lab-done" data-id="'+t.id+'">Загрузить протокол</button>';
   return '<tr><td>'+t.id+'</td><td>'+t.sample+'</td><td>'+t.method+'</td><td>'+t.due+'</td><td>'+t.who+'</td><td>'+sb(t.status)+'</td><td class="row-actions">'+act+pr+'</td></tr>';}).join('')+'</table></div>'+
  (role==='lab_head'?'<div class="panel"><h3>'+ic('i-report')+'Загрузка по сотрудникам</h3>'+barList([['Зайцев',DATA.lab.filter(function(t){return t.who==='Зайцев'&&t.status!=='done';}).length||1],['Кузнецова',DATA.lab.filter(function(t){return t.who==='Кузнецова'&&t.status!=='done';}).length||1],['Резерв',1]])+'</div>':'');
}
function mTickets(role){return '<div class="panel"><h3>'+ic('i-help')+'Тикеты техподдержки</h3>'+
 '<table class="tbl"><tr><th>№</th><th>Тема</th><th>От кого</th><th>Статус</th><th></th></tr>'+
 DATA.tickets.map(function(t){return '<tr><td>'+t.id+'</td><td>'+t.subj+'</td><td>'+t.from+'</td><td>'+sb(t.status)+'</td><td class="row-actions"><button class="btn btn-ghost" data-act="ticket-open" data-id="'+t.id+'">Открыть</button>'+(t.status!=='done'?'<button class="btn btn-primary" data-act="ticket-close" data-id="'+t.id+'">Закрыть</button>':'')+'</td></tr>';}).join('')+'</table></div>';}
function mContent(){var secs=[['Новости','novosti.html'],['Услуги','uslugi.html'],['Обучение','obuchenie.html'],['Кейсы','keysy.html'],['КТ-контроль','kt-morfometriya.html'],['Контакты/реквизиты','site.json']];
 return '<div class="panel"><h3>'+ic('i-content')+'Редактирование контента сайта<span class="hint">правки → пересборка (build.py)</span></h3>'+
  '<table class="tbl"><tr><th>Раздел</th><th>Источник</th><th></th></tr>'+secs.map(function(s){return '<tr><td>'+s[0]+'</td><td><code>'+s[1]+'</code></td><td class="row-actions"><button class="btn btn-ghost" data-act="content-edit" data-name="'+s[0]+'">Редактировать</button><button class="btn btn-primary" data-act="content-pub" data-name="'+s[0]+'">Опубликовать</button></td></tr>';}).join('')+'</table></div>';}
function mUsers(){var rows=[['Дашборд','yes','part','part','part','no','part','yes'],['Заявки','part','yes','part','no','no','no','yes'],['Финансы','part','no','yes','no','no','no','yes'],['Лаборатория','part','no','no','yes','part','no','yes'],['Контент','no','no','no','no','no','yes','yes'],['Техподдержка','no','no','no','no','no','yes','yes'],['Пользователи','part','no','no','no','no','no','yes']];
 var heads=['Директор','Менеджер','Бухг.','Рук.лаб.','Науч.сотр.','Тех.под.','Админ'];
 function cell(v){return v==='yes'?'<span class="yes">✓</span>':v==='part'?'<span class="part">просмотр</span>':'<span class="no">—</span>';}
 var rbac='<table class="rbac"><tr><th>Модуль \\ Роль</th>'+heads.map(function(h){return '<th>'+h+'</th>';}).join('')+'</tr>'+rows.map(function(r){return '<tr><td>'+r[0]+'</td>'+r.slice(1).map(function(v){return '<td>'+cell(v)+'</td>';}).join('')+'</tr>';}).join('')+'</table>';
 var users='<table class="tbl"><tr><th>Сотрудник</th><th>Роль</th><th>Отдел</th><th>Доступ</th><th></th></tr>'+DATA.users.map(function(u){return '<tr><td>'+u.nm+'</td><td>'+u.role+'</td><td>'+u.dept+'</td><td><span class="access-pill">'+u.acc+'</span></td><td><button class="btn btn-ghost" data-act="toast" data-msg="Редактирование прав — в боевой версии">Изменить</button></td></tr>';}).join('')+'</table>';
 return '<div class="panel"><h3>'+ic('i-users')+'Сотрудники<span class="hint">'+DATA.users.length+' учётных записей</span></h3>'+users+'</div><div class="panel"><h3>'+ic('i-users')+'Матрица доступа (RBAC)</h3>'+rbac+'</div>';}
function mReports(){return '<div class="panel"><h3>'+ic('i-report')+'Отчёты</h3><table class="tbl"><tr><th>Отчёт</th><th>Период</th><th></th></tr>'+
 [['Выручка по услугам','Июнь 2026'],['Воронка продаж и конверсия','II квартал'],['Загрузка лабораторий','Июнь 2026'],['Доходы для Счётной палаты (КОСГУ 130)','Июнь 2026']].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td class="row-actions"><button class="btn btn-ghost" data-act="toast" data-msg="PDF будет сформирован">PDF</button><button class="btn btn-ghost" data-act="csv-registry">CSV</button></td></tr>';}).join('')+'</table></div>';}
var HMONTHS=['','января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
var HICONS=[['ico-cake','Торт'],['ico-cookie','Печенье'],['ico-chocolate','Шоколад'],['ico-spark','Звёзды'],['ico-scan','КТ']];
function holDate(h){return h.special==='oct3sun'?'3-е воскр. октября':(h.day+' '+HMONTHS[h.month]);}
function mHolidays(){
 var cards=DATA.holidays.map(function(h,idx){
  var on=h.enabled!==false; var lastIdx=DATA.holidays.length-1;
  return '<div class="holcard'+(on?'':' off')+'" draggable="true" data-id="'+h.key+'">'+
    '<div class="fxprev holcard-prev">'+fxInner(h.icon,h.name,h.msg||'',h.cta?h.cta.text:'')+'</div>'+
    '<div class="holcard-meta"><span class="holcard-grip" title="Перетащите, чтобы изменить порядок">'+ic('i-grip')+'</span><span class="holcard-move"><button class="btn btn-ghost mv" data-act="hol-up" data-id="'+h.key+'" title="Поднять"'+(idx===0?' disabled':'')+'>&uarr;</button><button class="btn btn-ghost mv" data-act="hol-down" data-id="'+h.key+'" title="Опустить"'+(idx===lastIdx?' disabled':'')+'>&darr;</button></span><span class="holcard-date">'+ic('i-cal')+holDate(h)+'</span>'+
      (on?'<span class="badge b-paid">вкл</span>':'<span class="badge b-new">выкл</span>')+
      '<span class="holcard-acts"><button class="btn btn-ghost" data-act="hol-prev" data-id="'+h.key+'">На сайте</button><button class="btn btn-ghost" data-act="hol-edit" data-id="'+h.key+'">Изменить</button><button class="btn btn-ghost" data-act="hol-toggle" data-id="'+h.key+'">'+(on?'Выключить':'Включить')+'</button><button class="btn btn-ghost" data-act="hol-del" data-id="'+h.key+'">Удалить</button></span>'+
    '</div></div>';
 }).join('');
 return '<div class="panel" style="display:flex;gap:10px;align-items:center"><b>'+ic('i-cal')+' Праздники отрасли</b><span class="muted">так баннеры выглядят на сайте — появляются в свои даты</span><button class="btn btn-ghost" style="margin-left:auto" data-act="hol-export">Экспорт holidays.json</button><button class="btn btn-primary" data-act="hol-add">+ Добавить праздник</button></div>'+
  '<div class="holcards">'+cards+'</div>'+
  '<div class="norm-note">Каждая карточка — живое превью баннера. Изменения попадают на сайт через файл <b>holidays.json</b>: кнопка «Экспорт» → файл кладётся в корень сайта (в боевой версии сохраняется автоматически). «На сайте» открывает страницу с этим праздником в новой вкладке.</div>';
}
function fxInner(icon,name,msg,ctaText){
 return iconMarkup(icon,'fx-img')+'<div class="fxp-text"><b>'+esc(name)+'</b> <span>'+esc(msg)+'</span></div>'+(ctaText?'<span class="fxp-cta">'+esc(ctaText)+' &rarr;</span>':'');
}
function renderHolPreview(){
 var box=document.getElementById('holPrev'); if(!box) return;
 box.innerHTML=fxInner(holIconData||val('hIcon')||'ico-spark', val('hName')||'Заголовок баннера', val('hMsg')||'Текст поздравления появится здесь', val('hCtaT'));
}
function holForm(key){
 var h=key?DATA.holidays.find(function(x){return x.key===key;}):{name:'',msg:'',icon:'ico-cake',month:1,day:1,enabled:true,cta:{text:'',href:''}};
 var sp=h.special==='oct3sun';
 holIconData=(h.icon&&isImg(h.icon))?h.icon:null;
 var iconOpts=HICONS.map(function(o){return '<option value="'+o[0]+'"'+(h.icon===o[0]?' selected':'')+'>'+o[1]+'</option>';}).join('');
 var monOpts=HMONTHS.map(function(m,i){return i?'<option value="'+i+'"'+(h.month===i?' selected':'')+'>'+m+'</option>':'';}).join('');
 var inp='width:100%;padding:10px;border:1px solid #e6eaef;border-radius:9px;font-family:inherit';
 openDrawer('<div class="dh"><h3>'+(key?'Изменить праздник':'Новый праздник')+'</h3><button class="x" data-act="close">×</button></div><div class="db">'+
  '<div class="fxprev-label">Превью — так баннер увидят на сайте:</div><div class="fxprev" id="holPrev"></div>'+
  '<div class="fld"><label>Тип даты</label><select id="hType" style="'+inp+'"><option value="fixed"'+(!sp?' selected':'')+'>Фиксированная (день и месяц)</option><option value="oct3sun"'+(sp?' selected':'')+'>3-е воскресенье октября</option></select></div>'+
  '<div class="fld" id="hDateRow"'+(sp?' style="display:none"':'')+'><label>Дата</label><div style="display:flex;gap:8px"><input id="hDay" type="number" min="1" max="31" value="'+(h.day||1)+'" style="width:90px;padding:10px;border:1px solid #e6eaef;border-radius:9px"><select id="hMonth" style="flex:1;padding:10px;border:1px solid #e6eaef;border-radius:9px">'+monOpts+'</select></div></div>'+
  '<div class="fld"><label>Иконка</label><select id="hIcon" style="'+inp+'">'+iconOpts+'</select></div>'+
  '<div class="fld"><label>…или загрузите свою иконку (PNG/SVG)</label><div style="display:flex;gap:8px;align-items:center"><input type="file" id="hIconFile" accept="image/png,image/svg+xml,image/jpeg,image/webp" style="font-size:13px;flex:1"><button type="button" class="btn btn-ghost" data-act="hol-icon-reset">Сбросить</button></div></div>'+
  '<div class="fld"><label>Заголовок баннера</label><input id="hName" value="'+esc(h.name)+'" style="'+inp+'" placeholder="С праздником!"></div>'+
  '<div class="fld"><label>Текст поздравления</label><textarea id="hMsg" rows="3" style="'+inp+'">'+esc(h.msg)+'</textarea></div>'+
  '<div class="fld"><label>Текст кнопки</label><input id="hCtaT" value="'+esc(h.cta?h.cta.text:'')+'" style="'+inp+'" placeholder="Об институте"></div>'+
  '<div class="fld"><label>Ссылка кнопки</label><input id="hCtaH" value="'+esc(h.cta?h.cta.href:'')+'" style="'+inp+'" placeholder="o-institute.html"></div>'+
  '<label style="display:flex;gap:8px;align-items:center;margin:6px 0 4px"><input type="checkbox" id="hEn"'+(h.enabled!==false?' checked':'')+'> Показывать на сайте</label>'+
  '<div class="btnrow"><button class="btn btn-primary" data-act="hol-save" data-id="'+(key||'')+'">Сохранить</button><button class="btn btn-ghost" data-act="close">Отмена</button></div></div>');
 renderHolPreview();
}
function moveHolidayStep(key,dir){
 var arr=DATA.holidays, i=arr.findIndex(function(x){return x.key===key;}); if(i<0)return false;
 var j=i+dir; if(j<0||j>=arr.length)return false;
 var t=arr[i]; arr[i]=arr[j]; arr[j]=t; return true;
}
function moveHoliday(fromKey,toKey,after){
 var arr=DATA.holidays, fi=arr.findIndex(function(x){return x.key===fromKey;}); if(fi<0)return;
 var item=arr.splice(fi,1)[0];
 var ti=arr.findIndex(function(x){return x.key===toKey;});
 if(ti<0){arr.push(item);return;}
 arr.splice(after?ti+1:ti,0,item);
}
function dlJSON(name,obj){var b=new Blob([JSON.stringify(obj,null,2)],{type:'application/json;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();}
var RENDER={dash:mDash,leads:mLeads,finance:mFinance,lab:mLab,tickets:mTickets,content:mContent,users:mUsers,reports:mReports,holidays:mHolidays};

// ---------- shell ----------
function renderApp(){var R=ROLES[state.role],menu=R.menu; if(menu.indexOf(state.mod)<0)state.mod=menu[0];
 var sidebar='<aside class="sidebar"><div class="brand"><img src="../img/logo.png" alt="ВНИИКП"><b>ВНИИКП<br><span style="font-weight:500;color:#9fb0bf;font-size:11px">система управления</span></b></div><nav class="menu"><div class="grp">Кабинет: '+R.label+'</div>'+menu.map(function(m){return '<a data-mod="'+m+'" class="'+(m===state.mod?'active':'')+'">'+ic2(MOD[m][0])+MOD[m][1]+'</a>';}).join('')+'</nav><div class="foot">Прототип · демо-данные</div></aside>';
 var initials=R.who.split(' ').slice(0,2).map(function(x){return x[0];}).join('');
 var roleOpts=Object.keys(ROLES).map(function(k){return '<option value="'+k+'"'+(k===state.role?' selected':'')+'>'+ROLES[k].label+'</option>';}).join('');
 var top='<div class="topbar"><div class="pagetitle">'+MOD[state.mod][1]+'</div><div class="spacer"></div><input class="search" placeholder="Поиск…"><div class="role-switch">Войти как: <select id="roleSel">'+roleOpts+'</select></div><div class="user"><div class="avatar">'+initials+'</div><div><div class="nm">'+R.who+'</div><div class="rl">'+R.label+'</div></div></div><button class="x" id="logout" title="Выйти">'+ic('i-out')+'</button></div>';
 var main='<div class="main">'+top+'<div class="demobar">⚙ ПРОТОТИП — кнопки рабочие, данные демонстрационные (сохраняются в сессии). Боевая версия: backend + авторизация + онлайн-оплата + 152-ФЗ.</div><div class="content">'+RENDER[state.mod](state.role)+'</div></div>';
 document.getElementById('app').innerHTML=SPRITE+'<div class="shell">'+sidebar+main+'</div><div class="drawer-bg" id="dbg"></div><div class="drawer" id="drawer"></div><div id="toast" class="toast"></div>';
}
function ic2(id){return '<svg class="ic" aria-hidden="true"><use href="#'+id+'"></use></svg>';}
function go(){renderApp();}
function toast(m){var t=document.getElementById('toast'); if(!t)return; t.textContent=m; t.classList.add('show'); clearTimeout(toast._); toast._=setTimeout(function(){t.classList.remove('show');},2600);}
function closeDrawer(){var d=document.getElementById('drawer'),b=document.getElementById('dbg'); if(d)d.classList.remove('open'); if(b)b.classList.remove('open');}
function openDrawer(html){var d=document.getElementById('drawer'); d.innerHTML=html; d.classList.add('open'); document.getElementById('dbg').classList.add('open');}

function renderLogin(){var roles=[['director','i-dash','Директор'],['manager','i-leads','Менеджер'],['accountant','i-fin','Бухгалтерия'],['lab_head','i-lab','Рук. лаборатории'],['scientist','i-lab','Научный сотрудник'],['support','i-help','Техподдержка'],['admin','i-users','Администратор']];
 document.getElementById('app').innerHTML=SPRITE+'<div class="login"><div class="login-card"><img src="../img/logo.png" alt="ВНИИКП"><h1>Система управления ВНИИКП</h1><p class="sub">Вход для сотрудников · единый портал</p><div class="fld"><label>Логин</label><input value="demo@vniikp.ru"></div><div class="fld"><label>Пароль</label><input type="password" value="••••••••"></div><div class="demo-note">— прототип, выберите роль для входа —</div><div class="role-grid">'+roles.map(function(r){return '<button data-role="'+r[0]+'">'+ic2(r[1])+r[2]+'</button>';}).join('')+'</div></div></div>';}

// ---------- lead drawer ----------
function openLead(id){var l=DATA.leads.find(function(x){return x.id===id;}); if(!l)return;
 var ro=(state.role==='director');
 var acts='';
 if(!ro){
  if(l.status==='new'||l.status==='work') acts='<button class="btn btn-ghost" data-act="lead-reply" data-id="'+id+'">Ответить</button><button class="btn btn-primary" data-act="lead-bill" data-id="'+id+'">Выставить счёт</button><button class="btn btn-ghost" data-act="lead-tolab" data-id="'+id+'">Передать в лабораторию</button>';
  else if(l.status==='bill') acts='<button class="btn btn-ghost" data-act="lead-reply" data-id="'+id+'">Ответить</button><button class="btn btn-primary" data-act="lead-paid" data-id="'+id+'">Принять оплату</button>';
  else if(l.status==='paid') acts='<button class="btn btn-primary" data-act="lead-act" data-id="'+id+'">Сформировать акт</button>';
  else acts='<span class="doc-ok">'+ic('i-check')+' сделка закрыта, акт сформирован</span>';
 } else acts='<span class="muted">режим просмотра (директор)</span>';
 var notes=l.notes.length?('<h4 style="margin:16px 0 6px;font-size:13px;color:#6a7783">Переписка</h4>'+l.notes.map(function(n){return '<div class="note">'+esc(n)+'</div>';}).join('')):'';
 openDrawer('<div class="dh"><div><h3>Заявка '+l.id+'</h3><div class="muted" style="font-size:13px">от '+l.date+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="kv"><b>Клиент</b><span>'+l.client+'</span></div><div class="kv"><b>Услуга</b><span>'+l.service+'</span></div><div class="kv"><b>Сумма</b><span>'+money(l.amount)+'</span></div><div class="kv"><b>Менеджер</b><span>'+l.mgr+'</span></div><div class="kv"><b>Статус</b><span>'+sb(l.status)+'</span></div>'+notes+'<div class="btnrow">'+acts+'</div></div>');
}
function replyForm(id){var l=DATA.leads.find(function(x){return x.id===id;});
 openDrawer('<div class="dh"><div><h3>Ответ клиенту</h3><div class="muted" style="font-size:13px">'+l.client+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Сообщение</label><textarea id="replyTxt" rows="5" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit" placeholder="Здравствуйте! По вашей заявке…"></textarea></div><div class="btnrow"><button class="btn btn-primary" data-act="lead-send" data-id="'+id+'">Отправить</button><button class="btn btn-ghost" data-act="lead-open" data-id="'+id+'">Назад</button></div></div>');}

// ---------- CSV ----------
function download(name,text){var b=new Blob([text],{type:'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();}
function csvInvoices(){var rows=DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;});
 var t='Счёт;Клиент;Услуга;Статус;Сумма\n'+rows.map(function(l){return 'СЧ-'+l.id.slice(2)+';'+l.client+';'+l.service+';'+STATUS[l.status][1]+';'+l.amount;}).join('\n');download('scheta.csv',t);}
function csvRegistry(){var rows=paidLeads();var t='Договор;Счёт;Акт;Заказчик;Услуга;Дата оплаты;КОСГУ;Сумма\n'+rows.map(function(l){return 'Д-'+l.id.slice(2)+';СЧ-'+l.id.slice(2)+';'+(l.act?'А-'+l.id.slice(2):'нет')+';'+l.client+';'+l.service+';'+(l.paidDate||'')+';131;'+l.amount;}).join('\n');download('reestr_dohodov_KOSGU130.csv',t);}

// ---------- events ----------
document.addEventListener('click',function(e){
 var rb=e.target.closest('[data-role]'); if(rb){state.role=rb.getAttribute('data-role');state.mod=ROLES[state.role].menu[0];state.finView='list';go();return;}
 var mn=e.target.closest('[data-mod]'); if(mn){state.mod=mn.getAttribute('data-mod');state.finView='list';go();return;}
 if(e.target.closest('#logout')){state.role=null;renderLogin();return;}
 if(e.target.closest('#dbg')){closeDrawer();return;}
 var a=e.target.closest('[data-act]'); if(!a)
   { var ld=e.target.closest('[data-lead]'); if(ld) openLead(ld.getAttribute('data-lead')); return; }
 var act=a.getAttribute('data-act'), id=a.getAttribute('data-id'), L=id?DATA.leads.find(function(x){return x.id===id;}):null, who=ROLES[state.role].who;
 switch(act){
  case 'close': closeDrawer(); break;
  case 'lead-open': openLead(id); break;
  case 'lead-reply': replyForm(id); break;
  case 'lead-send': var v=(document.getElementById('replyTxt')||{}).value||''; if(v.trim()){L.notes.push('Вы: '+v.trim());logAct(who,'ответ клиенту по '+id);toast('Ответ отправлен клиенту');} openLead(id); break;
  case 'lead-bill': L.status='bill';logAct(who,'выставлен счёт по '+id);closeDrawer();go();toast('Счёт выставлен по '+id); break;
  case 'lead-paid': L.status='paid';L.paidDate='07.06';logAct(who,'принята оплата по '+id);closeDrawer();go();toast('Оплата зафиксирована по '+id); break;
  case 'lead-act': L.status='done';L.act=true;logAct(who,'сформирован акт по '+id);closeDrawer();go();toast('Акт сформирован, сделка закрыта'); break;
  case 'lead-tolab': DATA.lab.unshift({id:'И-'+(513+DATA.lab.length),sample:'Образец по '+id,method:L.service,due:'12.06',who:'Кузнецова',status:'new'});logAct(who,'заявка '+id+' передана в лабораторию');closeDrawer();toast('Передано в лабораторию (создано задание)'); break;
  case 'new-lead': openDrawer('<div class="dh"><h3>Новая заявка</h3><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Клиент</label><input id="nlc" placeholder="ООО «…»"></div><div class="fld"><label>Услуга</label><input id="nls" placeholder="Срок годности…"></div><div class="fld"><label>Сумма, ₽</label><input id="nla" type="number" placeholder="50000"></div><div class="btnrow"><button class="btn btn-primary" data-act="new-lead-save">Создать</button></div></div>'); break;
  case 'new-lead-save': var c=(document.getElementById('nlc')||{}).value,s=(document.getElementById('nls')||{}).value,am=+((document.getElementById('nla')||{}).value)||0; if(c){var nid='З-'+(239+DATA.leads.length);DATA.leads.unshift({id:nid,client:c,service:s||'—',amount:am,status:'new',mgr:who,date:'07.06',notes:[]});logAct(who,'создана заявка '+nid);} closeDrawer();go();toast('Заявка создана'); break;
  case 'lab-done': var t=DATA.lab.find(function(x){return x.id===id;}); if(t){t.status='done';logAct(who,'загружен протокол '+id);} go();toast('Протокол загружен, задание выполнено'); break;
  case 'kt': window.open('../kt-morfometriya.html','_blank'); break;
  case 'ticket-open': var tk=DATA.tickets.find(function(x){return x.id===id;}); openDrawer('<div class="dh"><div><h3>Тикет '+id+'</h3><div class="muted" style="font-size:13px">от '+tk.from+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><p>'+esc(tk.subj)+'</p><div class="fld"><label>Комментарий</label><textarea rows="4" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit"></textarea></div><div class="btnrow"><button class="btn btn-primary" data-act="ticket-close" data-id="'+id+'">Решить и закрыть</button></div></div>'); break;
  case 'ticket-close': var tk2=DATA.tickets.find(function(x){return x.id===id;}); if(tk2){tk2.status='done';logAct(who,'закрыт тикет '+id);} closeDrawer();go();toast('Тикет закрыт'); break;
  case 'content-pub': logAct(who,'опубликован раздел «'+a.getAttribute('data-name')+'»');toast('Опубликовано: «'+a.getAttribute('data-name')+'» (пересборка build.py)'); break;
  case 'content-edit': toast('Редактор раздела «'+a.getAttribute('data-name')+'» — в боевой версии'); break;
  case 'fin-report': state.finView='report';go(); break;
  case 'fin-list': state.finView='list';go(); break;
  case 'csv-invoices': csvInvoices();toast('Счета выгружены в CSV'); break;
  case 'csv-registry': csvRegistry();toast('Реестр доходов выгружен (CSV)'); break;
  case 'csv-737': logAct(who,'выгрузка для ф. 0503737');toast('Данные подготовлены для ф. 0503737'); break;
  case 'toast': toast(a.getAttribute('data-msg')); break;
  case 'hol-add': holForm(null); break;
  case 'hol-up': if(moveHolidayStep(id,-1)){logAct(who,'праздник поднят');go();toast('Порядок обновлён');} break;
  case 'hol-down': if(moveHolidayStep(id,1)){logAct(who,'праздник опущен');go();toast('Порядок обновлён');} break;
  case 'hol-icon-reset': holIconData=null; var fir=document.getElementById('hIconFile'); if(fir)fir.value=''; document.getElementById('hIcon').value='ico-cake'; renderHolPreview(); toast('Иконка — из списка'); break;
  case 'hol-edit': holForm(id); break;
  case 'hol-prev': window.open('../index.html?prazdnik='+id,'_blank'); break;
  case 'hol-toggle': var hh=DATA.holidays.find(function(x){return x.key===id;}); if(hh){hh.enabled=(hh.enabled===false);logAct(who,(hh.enabled?'включён':'выключен')+' праздник «'+hh.name+'»');} go(); toast(hh&&hh.enabled?'Праздник включён':'Праздник выключен'); break;
  case 'hol-del': DATA.holidays=DATA.holidays.filter(function(x){return x.key!==id;}); logAct(who,'удалён праздник'); closeDrawer(); go(); toast('Праздник удалён'); break;
  case 'hol-export': dlJSON('holidays.json',DATA.holidays); logAct(who,'экспортирован holidays.json'); toast('holidays.json выгружен — положите в корень сайта'); break;
  case 'hol-save': {
    var hname=val('hName').trim(); if(!hname){toast('Укажите заголовок');break;}
    var o={icon:holIconData||val('hIcon')||'ico-spark',enabled:document.getElementById('hEn').checked,name:hname,msg:val('hMsg').trim()};
    var ctaH=val('hCtaH').trim(); if(ctaH){o.cta={text:val('hCtaT').trim()||'Подробнее',href:ctaH};}
    if(val('hType')==='oct3sun'){o.special='oct3sun';} else {o.month=+val('hMonth')||1;o.day=+val('hDay')||1;}
    if(id){var ix=DATA.holidays.findIndex(function(x){return x.key===id;}); o.key=id; if(ix>-1)DATA.holidays[ix]=o; logAct(who,'изменён праздник «'+hname+'»');}
    else {o.key='h'+(DATA.holidays.length+1); DATA.holidays.push(o); logAct(who,'добавлен праздник «'+hname+'»');}
    closeDrawer(); go(); toast('Праздник сохранён (демо)'); break; }
 }
});
document.addEventListener('change',function(e){
 if(e.target.id==='roleSel'){state.role=e.target.value;state.mod=ROLES[state.role].menu[0];state.finView='list';go();}
 if(e.target.id==='hType'){var r=document.getElementById('hDateRow'); if(r)r.style.display=(e.target.value==='oct3sun')?'none':'';}
 if(e.target.id==='hIcon'){holIconData=null;}
 if(e.target.id==='hIconFile'){var f=e.target.files&&e.target.files[0]; if(f){if(f.size>400000)toast('Иконку лучше до ~300 КБ'); var rd=new FileReader(); rd.onload=function(){holIconData=rd.result; renderHolPreview();}; rd.readAsDataURL(f);}}
 if(document.getElementById('holPrev')) renderHolPreview();
});
document.addEventListener('input',function(e){ if(document.getElementById('holPrev')) renderHolPreview(); });

// drag-and-drop сортировка карточек праздников
var dragKey=null;
function clearDnd(){var l=document.querySelectorAll('.holcard.dragging,.holcard.drag-over');for(var i=0;i<l.length;i++){l[i].classList.remove('dragging');l[i].classList.remove('drag-over');}}
document.addEventListener('dragstart',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c)return; dragKey=c.getAttribute('data-id'); c.classList.add('dragging'); try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragKey);}catch(_){}});
document.addEventListener('dragover',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c||!dragKey)return; e.preventDefault(); try{e.dataTransfer.dropEffect='move';}catch(_){} var l=document.querySelectorAll('.holcard.drag-over'); for(var i=0;i<l.length;i++)if(l[i]!==c)l[i].classList.remove('drag-over'); if(c.getAttribute('data-id')!==dragKey)c.classList.add('drag-over');});
document.addEventListener('drop',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c||!dragKey)return; e.preventDefault(); var toKey=c.getAttribute('data-id'); if(toKey!==dragKey){var r=c.getBoundingClientRect(); var after=e.clientY>(r.top+r.height/2); moveHoliday(dragKey,toKey,after); var who=state.role?ROLES[state.role].who:'—'; logAct(who,'изменён порядок праздников'); dragKey=null; clearDnd(); go(); toast('Порядок обновлён');} else {dragKey=null; clearDnd();}});
document.addEventListener('dragend',function(){dragKey=null; clearDnd();});

var _rp=(location.search.match(/[?&]role=([a-z_]+)/)||[])[1];
if(_rp&&ROLES[_rp]){state.role=_rp;go();} else { renderLogin(); }
})();
