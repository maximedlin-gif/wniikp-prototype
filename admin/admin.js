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
 '<symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/></symbol>'+
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
  {id:'З-238',client:'ООО «Пряничный двор»',phone:'+7 (920) 555-12-30',email:'zakaz@pryanik-dvor.ru',service:'Срок годности (пряники)',amount:48000,status:'new',mgr:'Орлова',date:'07.06',notes:[],events:[]},
  {id:'З-237',client:'ИП Сидорова (глазурь)',phone:'+7 (905) 441-88-02',email:'sidorova.glaze@mail.ru',service:'Подбор аналога жира',amount:62000,status:'new',mgr:'Орлова',date:'06.06',notes:[],events:[]},
  {id:'З-235',client:'АО «Сластёна»',phone:'+7 (495) 770-33-18',email:'lab@slastena.ru',service:'КТ-морфометрия бисквита',amount:90000,status:'work',mgr:'Орлова',date:'05.06',notes:[],events:[]},
  {id:'З-233',client:'ООО «Кейк-Хаус»',phone:'+7 (812) 244-90-55',email:'info@cakehouse.ru',service:'Идентификация шоколада',amount:36000,status:'work',mgr:'Петров',date:'04.06',notes:[],events:[]},
  {id:'З-230',client:'Кондитерская «Мишка»',phone:'+7 (903) 128-44-71',email:'mishka.konditer@yandex.ru',service:'Обучение: органолептика',amount:72000,status:'bill',mgr:'Петров',date:'02.06',billDate:'02.06',dueDate:'07.06',notes:[],events:[]},
  {id:'З-228',client:'ООО «ВкусПром»',phone:'+7 (846) 339-21-04',email:'quality@vkusprom.ru',service:'Маркировка + ТУ',amount:55000,status:'paid',mgr:'Орлова',date:'31.05',billDate:'28.05',dueDate:'04.06',notes:[],events:[],paidDate:'02.06'},
  {id:'З-224',client:'Фабрика «Заря»',phone:'+7 (4812) 65-43-21',email:'zarya.fabrika@mail.ru',service:'Микробиология партии',amount:28000,status:'paid',mgr:'Петров',date:'28.05',billDate:'25.05',dueDate:'01.06',notes:[],events:[],paidDate:'30.05'},
  {id:'З-219',client:'ООО «Десерт+»',phone:'+7 (343) 287-66-19',email:'order@desertplus.ru',service:'Срок годности (печенье)',amount:45000,status:'done',mgr:'Орлова',date:'22.05',billDate:'20.05',dueDate:'27.05',notes:[],events:[],paidDate:'24.05',act:true}
 ],
 lab:[
  {id:'И-512',sample:'Бисквит К-12',method:'КТ-морфометрия',due:'10.06',who:'Зайцев',status:'work'},
  {id:'И-511',sample:'Глазурь Г-3',method:'Триглицеридный состав (ГХ)',due:'09.06',who:'Зайцев',status:'work'},
  {id:'И-509',sample:'Пряник П-7',method:'Активность воды + порча жиров',due:'08.06',who:'Кузнецова',status:'new'},
  {id:'И-507',sample:'Шоколад Ш-2',method:'Идентификация по ГОСТ 31721',due:'07.06',who:'Кузнецова',status:'done'},
  {id:'И-505',sample:'Печенье Пч-4',method:'Перекисное/кислотное число',due:'06.06',who:'Зайцев',status:'done'}
 ],
 tickets:[
  {id:'T-44',subj:'Не отправляется форма заявки в Safari',from:'Менеджер',status:'work',priority:'high',assignee:'Смирнов В.',cat:'Сайт',due:'10.06',thread:[{who:'Менеджер',msg:'В Safari кнопка «Отправить» не реагирует.'}]},
  {id:'T-43',subj:'Добавить новость о семинаре 26–28 окт',from:'Пресс-служба',status:'new',priority:'normal',assignee:'',cat:'Контент',due:'15.06',thread:[]},
  {id:'T-41',subj:'Обновить телефон в подвале',from:'Бухгалтерия',status:'done',priority:'low',assignee:'Смирнов В.',cat:'Контент',due:'05.06',thread:[{who:'Смирнов В.',msg:'Телефон обновлён, опубликовано.'}]},
  {id:'T-40',subj:'Заменить фото на странице «Об институте»',from:'Дирекция',status:'new',priority:'normal',assignee:'',cat:'Контент',due:'12.06',thread:[]}
 ],
 tasks:[
  {id:'П-12',title:'Подготовить отчёт по загрузке лаборатории за май',assignee:'Белявская И. Г.',from:'Белецкий С. Л.',due:'12.06',status:'progress',report:''},
  {id:'П-11',title:'Обновить прайс по услугам срока годности и согласовать с бухгалтерией',assignee:'Орлова Е.',from:'Белецкий С. Л.',due:'10.06',status:'report',report:'Прайс обновлён, согласован с Ивановой Н. Готов к публикации на сайте.'},
  {id:'П-10',title:'Закрыть тикеты по сайту до конца недели',assignee:'Смирнов В.',from:'Белецкий С. Л.',due:'09.06',status:'done',report:'Тикеты T-41 закрыт, T-44 в работе у разработчика.'},
  {id:'П-09',title:'Подготовить КП по КТ-морфометрии для трёх фабрик',assignee:'Орлова Е.',from:'Белецкий С. Л.',due:'13.06',status:'new',report:''}
 ],
 content:{
  'Новости':'ВНИИКП провёл отраслевой семинар по контролю качества шоколада и какао-продуктов. В программе — идентификация по ГОСТ 31721, дисперсность, экспертиза фальсификаций.',
  'Услуги':'Более 100 аккредитованных методик по ГОСТ и МВИ: жиры и окислительная порча, шоколад и какао, мучные и сахаристые изделия, микробиология, сроки годности, КТ-контроль структуры.',
  'Обучение':'Семинары и повышение квалификации для технологов кондитерских производств: органолептика и дефекты, установление срока годности, маркировка и ТУ.',
  'Кейсы':'Реальные задачи производств: подбор аналога жира, продление срока годности печенья, разбор рекламации по шоколаду.',
  'КТ-контроль':'Неразрушающий контроль внутренней структуры изделий по компьютерной томограмме: пористость, размер и распределение пор, плотность — без разрезания образца.',
  'Контакты/реквизиты':'107023, Москва, ул. Электрозаводская, д. 20, стр. 3. Тел. +7 (495) 963-65-35, conditerprom@mail.ru.'
 },
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
 director:{label:'Директор',who:'Белецкий С. Л.',menu:['dash','tasks','leads','finance','lab','reports','users']},
 manager:{label:'Менеджер',who:'Орлова Е.',menu:['dash','tasks','leads']},
 accountant:{label:'Бухгалтерия',who:'Иванова Н.',menu:['dash','tasks','finance','leads','reports']},
 lab_head:{label:'Рук. лаборатории',who:'Белявская И. Г.',menu:['dash','tasks','lab','reports']},
 scientist:{label:'Научный сотрудник',who:'Зайцев Д.',menu:['tasks','lab']},
 support:{label:'Техподдержка',who:'Смирнов В.',menu:['dash','tasks','tickets','content','holidays']},
 admin:{label:'Администратор',who:'Администратор',menu:['dash','tasks','leads','finance','lab','content','holidays','tickets','users']}
};
var MOD={dash:['i-dash','Дашборд'],tasks:['i-report','Поручения'],leads:['i-leads','Заявки'],finance:['i-fin','Финансы'],
 lab:['i-lab','Лаборатория'],content:['i-content','Контент сайта'],tickets:['i-help','Техподдержка'],
 users:['i-users','Пользователи и права'],reports:['i-report','Отчёты'],holidays:['i-cal','Праздники']};
var STATUS={new:['b-new','Новая'],work:['b-work','В работе'],bill:['b-bill','Счёт выставлен'],paid:['b-paid','Оплачено'],done:['b-done','Выполнено']};
function sb(s){return '<span class="badge '+STATUS[s][0]+'">'+STATUS[s][1]+'</span>';}
var state={role:null,mod:'dash',finView:'list',uType:'budget'};
var holIconData=null; // data-URL загруженной своей иконки (на время заполнения формы)

// ---------- сохранение демо-данных (localStorage) ----------
var ADMKEY='wniikp_admin_v1';
var DEFAULTS=JSON.parse(JSON.stringify({leads:DATA.leads,lab:DATA.lab,tickets:DATA.tickets,holidays:DATA.holidays,tasks:DATA.tasks,content:DATA.content,users:DATA.users}));
function saveData(){try{localStorage.setItem(ADMKEY,JSON.stringify({leads:DATA.leads,lab:DATA.lab,tickets:DATA.tickets,holidays:DATA.holidays,tasks:DATA.tasks,content:DATA.content,users:DATA.users,log:LOG,uType:state.uType}));}catch(e){}}
function loadData(){try{var s=JSON.parse(localStorage.getItem(ADMKEY)); if(s&&s.leads){DATA.leads=s.leads;DATA.lab=s.lab;DATA.tickets=s.tickets;DATA.holidays=s.holidays; if(s.tasks)DATA.tasks=s.tasks; if(s.content)DATA.content=s.content; if(s.users)DATA.users=s.users; if(s.log)LOG=s.log; if(s.uType)state.uType=s.uType;}}catch(e){}}
function resetData(){DATA.leads=JSON.parse(JSON.stringify(DEFAULTS.leads));DATA.lab=JSON.parse(JSON.stringify(DEFAULTS.lab));DATA.tickets=JSON.parse(JSON.stringify(DEFAULTS.tickets));DATA.holidays=JSON.parse(JSON.stringify(DEFAULTS.holidays));DATA.tasks=JSON.parse(JSON.stringify(DEFAULTS.tasks));DATA.content=JSON.parse(JSON.stringify(DEFAULTS.content||{}));DATA.users=JSON.parse(JSON.stringify(DEFAULTS.users));LOG=[{t:'07.06 09:14',who:'Система',msg:'Демо-данные сброшены'}];saveData();}
loadData();

// ---------- НДС и тип учреждения ----------
function vatOf(l){var s=String(l.service||'').toLowerCase(); if(/обучен/.test(s))return 'none'; if(/маркир|\bту\b|рецептур/.test(s))return '20'; return 'lgota';}
function vatLabel(l){return {none:'без НДС',20:'НДС 20%',lgota:'льгота п.149 НК'}[vatOf(l)];}
function vatShort(l){return {none:'—',20:'20%',lgota:'льгота'}[vatOf(l)];}
function vatAmount(l){return vatOf(l)==='20'?Math.round(l.amount-l.amount/1.2):0;}
function formNo(){return state.uType==='kazna'?'0503127':'0503737';}
function formName(){return state.uType==='kazna'?'Отчёт об исполнении бюджетной сметы (ф. 0503127, казённое учреждение)':'Отчёт об исполнении плана ФХД (ф. 0503737, бюджетное/автономное учреждение)';}

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
function plural(n,one,few,many){var m=n%100,d=n%10; if(m>10&&m<20)return many; if(d===1)return one; if(d>=2&&d<=4)return few; return many;}
function paidLeads(){return DATA.leads.filter(function(l){return l.status==='paid'||l.status==='done';});}
function factRevenue(){return sum(paidLeads().map(function(l){return l.amount;}))+1610000;}

// сроки/просрочки. Демо-«сегодня» — 9 июня (день года ≈ (мес-1)*30+день)
var ADMIN_TODAY=(6-1)*30+9;
function adoy(s){var m=String(s||'').match(/(\d{1,2})\.(\d{1,2})/);return m?(+m[2]-1)*30+(+m[1]):null;}
function leadAge(l){var d=adoy(l.date);return d==null?null:Math.max(0,ADMIN_TODAY-d);}
function leadHot(l){return (l.status==='new'||l.status==='work')&&leadAge(l)>2;}
function agePill(l){var a=leadAge(l); if(a==null||l.status!=='new'&&l.status!=='work')return ''; return '<div class="lead-age'+(a>2?' hot':'')+'">'+(a>2?'⏱ ':'')+a+' '+plural(a,'день','дня','дней')+(a>2?' без ответа':'')+'</div>';}
function labOverdue(t){var d=adoy(t.due);return t.status!=='done'&&d!=null&&d<ADMIN_TODAY;}
function notifList(role){var R=ROLES[role],who=R.who,n=[];
 if(R.menu.indexOf('leads')>-1){var nl=DATA.leads.filter(function(l){return l.status==='new'&&!l.seen;}); if(nl.length)n.push({mod:'leads',txt:nl.length+' '+plural(nl.length,'новая заявка','новые заявки','новых заявок')+' с сайта'}); var hot=DATA.leads.filter(leadHot); if(hot.length)n.push({mod:'leads',txt:hot.length+' '+plural(hot.length,'заявка горит','заявки горят','заявок горят')+' — нет ответа >2 дн.'});}
 if(role==='director'||role==='admin'){var rep=DATA.tasks.filter(function(t){return t.status==='report';}); if(rep.length)n.push({mod:'tasks',txt:rep.length+' '+plural(rep.length,'отчёт ждёт','отчёта ждут','отчётов ждут')+' приёмки'});}
 else {var mine=DATA.tasks.filter(function(t){return t.assignee===who&&(t.status==='new'||t.status==='progress');}); if(mine.length)n.push({mod:'tasks',txt:mine.length+' '+plural(mine.length,'поручение','поручения','поручений')+' от руководства'});}
 if(R.menu.indexOf('lab')>-1){var ov=DATA.lab.filter(labOverdue); if(ov.length)n.push({mod:'lab',txt:ov.length+' '+plural(ov.length,'задание просрочено','задания просрочены','заданий просрочено')});}
 if(R.menu.indexOf('tickets')>-1){var ot=DATA.tickets.filter(function(t){return t.status!=='done';}); if(ot.length)n.push({mod:'tickets',txt:ot.length+' '+plural(ot.length,'открытый тикет','открытых тикета','открытых тикетов')});}
 return n;}

function kpi(lab,val,chg,icon){var c=chg===undefined?'':'<div class="chg '+(chg>=0?'up':'down')+'">'+(chg>=0?'▲ +':'▼ ')+chg+'% к прошлому мес.</div>';
 return '<div class="kpi"><div class="lab">'+ic(icon)+lab+'</div><div class="val">'+val+'</div>'+c+'</div>';}

// ---------- modules ----------
function mDash(role){
 if(role==='accountant') return mFinance(role);
 if(role==='lab_head'||role==='scientist') return mLab(role);
 if(role==='support') return mTickets(role);
 if(role==='manager'){
  var mine=DATA.leads.filter(function(l){return l.mgr==='Орлова';});
  var hot=DATA.leads.filter(leadHot).length;
  return '<div class="kpis">'+kpi('Мои заявки',mine.length,undefined,'i-leads')+kpi('В работе',mine.filter(function(l){return l.status==='work';}).length,undefined,'i-leads')+kpi('Ждут счёта',DATA.leads.filter(function(l){return l.status==='bill';}).length,undefined,'i-fin')+'<div class="kpi'+(hot?' kpi-hot':'')+'"><div class="lab">'+ic('i-leads')+'Горящие (нет ответа >2 дн.)</div><div class="val">'+hot+'</div></div>'+'</div>'+leadsKanban(true);
 }
 return '<div class="kpis">'+kpi('Выручка за месяц',money(1840000),12,'i-fin')+kpi('Заявок за месяц',DATA.leads.length,8,'i-leads')+kpi('Конверсия в оплату','31%',4,'i-report')+kpi('Загрузка лабораторий','78%',undefined,'i-lab')+'</div>'+
  '<div class="grid2"><div class="panel"><h3>'+ic('i-fin')+'Выручка по месяцам, тыс. ₽</h3>'+lineChart(DATA.revMonths)+'</div><div class="panel"><h3>'+ic('i-report')+'Выручка по услугам, тыс. ₽</h3>'+barList(DATA.revServices)+'</div></div>'+
  '<div class="panel"><h3>'+ic('i-leads')+'Последние заявки<span class="hint">режим просмотра</span></h3>'+leadsTable(DATA.leads.slice(0,6))+'</div>';
}
function leadsTable(rows){if(!rows.length)return '<div class="empty">Заявок пока нет.</div>';
 return '<table class="tbl"><tr><th>№</th><th>Клиент</th><th>Услуга</th><th>Менеджер</th><th>Статус</th><th class="num">Сумма</th></tr>'+
 rows.map(function(l){return '<tr data-lead="'+l.id+'" tabindex="0"><td>'+l.id+'</td><td>'+esc(l.client)+'</td><td>'+esc(l.service)+'</td><td>'+esc(l.mgr)+'</td><td>'+sb(l.status)+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+'</table>';}
function leadsKanban(editable){var cols=['new','work','bill','paid','done'];
 return '<div class="kanban">'+cols.map(function(c){var it=DATA.leads.filter(function(l){return l.status===c;});
  var cards=it.length?it.map(function(l){return '<div class="lead'+(leadHot(l)?' hot':'')+'"'+(editable?' draggable="true"':'')+' data-lead="'+l.id+'" tabindex="0" role="button" aria-label="Заявка '+l.id+', '+esc(l.client)+'"><div class="cl">'+esc(l.client)+'</div><div class="sv">'+esc(l.service)+'</div><div class="am">'+money(l.amount)+'</div>'+agePill(l)+'</div>';}).join(''):'<div class="kempty">пусто</div>';
  return '<div class="kcol" data-status="'+c+'"><h4>'+STATUS[c][1]+'<span>'+it.length+'</span></h4>'+cards+'</div>';}).join('')+'</div>';}
function dragSetStatus(id,ns){var l=DATA.leads.find(function(x){return x.id===id;}); if(!l||l.status===ns)return;
 var who=ROLES[state.role].who, permMap={bill:'bill',paid:'paid',done:'act'};
 if(permMap[ns]&&!can(permMap[ns])){toast('Недостаточно прав для статуса «'+STATUS[ns][1]+'»');go();return;}
 l.status=ns;
 if(ns==='bill')l.billBy=l.billBy||who;
 if(ns==='paid'){l.paidDate=l.paidDate||'09.06';l.paidBy=l.paidBy||who;}
 if(ns==='done'){l.act=true;l.actBy=l.actBy||who;}
 logLeadEvent(l,who,'Перемещена в «'+STATUS[ns][1]+'» (перетаскивание)');
 logAct(who,'заявка '+id+' → '+STATUS[ns][1]+' (drag&drop)');
 go();toast('Заявка '+id+' → '+STATUS[ns][1]);}
function mLeads(role){var ro=(role==='director');
 return '<div class="panel" style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><b>Воронка продаж</b><span class="muted">кликните заявку → действия</span>'+(ro?'<span class="hint">режим просмотра</span>':'<button class="btn btn-primary" style="margin-left:auto" data-act="new-lead">+ Новая заявка</button>')+'</div>'+leadsKanban(!ro);}

function mContracts(){
 var deals=DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;});
 if(!deals.length) return '<div class="panel"><h3>'+ic('i-content')+'Журнал договоров</h3><div class="empty">Договоров пока нет.</div></div>';
 var st={bill:'счёт выставлен',paid:'оплачен',done:'закрыт актом'};
 var rows=deals.map(function(l){return '<tr><td>Д-'+l.id.slice(2)+'</td><td>'+(l.billDate||l.date||'—')+'</td><td>'+esc(l.client)+'</td><td>'+esc(l.service)+'</td><td>'+vatShort(l)+'</td><td>'+st[l.status]+'</td><td>'+(l.dueDate||'—')+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('');
 return '<div class="panel"><h3>'+ic('i-content')+'Журнал договоров<span class="hint">'+deals.length+' '+plural(deals.length,'договор','договора','договоров')+'</span></h3><table class="tbl"><tr><th>Договор</th><th>Дата</th><th>Заказчик</th><th>Предмет</th><th>НДС</th><th>Статус</th><th>Срок оплаты</th><th class="num">Сумма</th></tr>'+rows+'</table></div>';
}
function debtorAging(){
 var bills=DATA.leads.filter(function(l){return l.status==='bill';});
 if(!bills.length) return '';
 var overdue=0,total=0;
 var rows=bills.map(function(l){var due=adoy(l.dueDate); var od=(due!=null&&due<ADMIN_TODAY)?(ADMIN_TODAY-due):0; total+=l.amount; if(od)overdue+=l.amount;
  return '<tr'+(od?' class="risk-row"':'')+'><td>СЧ-'+l.id.slice(2)+'</td><td>'+esc(l.client)+'</td><td>'+(l.billDate||'—')+'</td><td>'+(l.dueDate||'—')+'</td><td>'+(od?'<span class="lead-age hot">просрочено '+od+' '+plural(od,'день','дня','дней')+'</span>':'<span class="doc-ok">в срок</span>')+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('');
 var head=overdue?'<div class="risk-head bad">'+ic('i-fin')+' Просроченная дебиторка: <b>'+money(overdue)+'</b> из '+money(total)+' ожидающих оплаты':'<div class="risk-head ok">'+ic('i-check')+' Просроченной дебиторки нет';
 return '<div class="panel"><h3>'+ic('i-fin')+'Дебиторка по срокам<span class="hint">неоплаченные счета</span></h3>'+head+'</div><table class="tbl"><tr><th>Счёт</th><th>Заказчик</th><th>Дата счёта</th><th>Срок оплаты</th><th>Состояние</th><th class="num">Сумма</th></tr>'+rows+'</table></div>';
}
function mFinance(role){
 if(state.finView==='report') return finReport(role);
 var paid=paidLeads();
 return '<div class="kpis">'+kpi('Выручка за месяц',money(1840000),12,'i-fin')+kpi('Оплачено счетов',paid.length,undefined,'i-check')+kpi('Ожидает оплаты',money(sum(DATA.leads.filter(function(l){return l.status==='bill';}).map(function(l){return l.amount;}))),undefined,'i-fin')+kpi('План ФХД, факт',(factRevenue()/DATA.planFHD*100).toFixed(0)+'%',undefined,'i-report')+'</div>'+
  '<div class="panel" style="display:flex;gap:10px;align-items:center"><b>'+ic('i-shield')+' Контроль и отчётность</b><span class="muted">доходы от платных услуг · подстатья 131 · КФО 2</span><button class="btn btn-primary" style="margin-left:auto" data-act="fin-report">Отчёт для Счётной палаты</button></div>'+
  '<div class="panel"><h3>'+ic('i-fin')+'Динамика выручки, тыс. ₽</h3>'+lineChart(DATA.revMonths)+'</div>'+
  '<div class="panel"><h3>'+ic('i-report')+'Счета и оплаты<span class="hint"><button class="btn btn-ghost" data-act="csv-invoices">Экспорт CSV</button></span></h3>'+
   '<table class="tbl"><tr><th>Счёт</th><th>Клиент</th><th>Услуга</th><th>Статус</th><th class="num">Сумма</th></tr>'+
   DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;}).map(function(l){return '<tr><td>СЧ-'+l.id.slice(2)+'</td><td>'+l.client+'</td><td>'+l.service+'</td><td>'+sb(l.status)+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+'</table></div>'+debtorAging()+mContracts();
}
function dealReady(l){ // комплектность первички по сделке
 var schet=['bill','paid','done'].indexOf(l.status)>-1;
 var oplata=['paid','done'].indexOf(l.status)>-1;
 var akt=!!l.act;
 var gaps=[]; if(!schet)gaps.push('счёт'); if(!oplata)gaps.push('оплата'); if(!akt)gaps.push('акт');
 return {dogovor:true,schet:schet,oplata:oplata,akt:akt,ok:gaps.length===0,gaps:gaps};
}
function svetofor(){
 var deals=DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;});
 if(!deals.length) return '<div class="panel"><h3>'+ic('i-shield')+'Светофор готовности к проверке</h3><div class="empty">Нет сделок с движением по доходам.</div></div>';
 var risk=0, bad=0;
 var ck=function(v){return v?'<span class="doc-ok">'+ic('i-check')+'</span>':'<span class="doc-no">нет</span>';};
 var body=deals.map(function(l){var r=dealReady(l); if(!r.ok){risk+=l.amount;bad++;}
  return '<tr class="'+(r.ok?'':'risk-row')+'"><td><b>'+l.id+'</b></td><td>'+l.client+'</td><td>'+ck(r.dogovor)+'</td><td>'+ck(r.schet)+'</td><td>'+ck(r.akt)+'</td><td>'+ck(r.oplata)+'</td><td>КФО 2 · 131</td><td>'+vatShort(l)+'</td><td class="num">'+money(l.amount)+'</td><td>'+(r.ok?'<span class="badge b-paid">готово</span>':'<span class="badge b-new">нет: '+r.gaps.join(', ')+'</span>')+'</td></tr>';}).join('');
 var headline=bad? '<div class="risk-head bad">'+ic('i-shield')+' Под риском на проверке: <b>'+money(risk)+'</b> — '+bad+' '+plural(bad,'сделка','сделки','сделок')+' с неполной первичкой' : '<div class="risk-head ok">'+ic('i-check')+' Все сделки укомплектованы: договор → счёт → акт → поступление, КФО и НДС проставлены';
 return '<div class="panel"><h3>'+ic('i-shield')+'Светофор готовности к проверке<span class="hint">комплектность первички по каждой сделке</span></h3>'+headline+'</div>'+
  '<table class="tbl svetofor"><tr><th>Сделка</th><th>Заказчик</th><th>Договор</th><th>Счёт</th><th>Акт</th><th>Оплата</th><th>КФО/КОСГУ</th><th>НДС</th><th class="num">Сумма</th><th>Готовность</th></tr>'+body+'</table></div>';
}
function finReport(role){
 var rows=paidLeads();
 var fact=sum(rows.map(function(l){return l.amount;}));
 var totalVat=sum(rows.map(vatAmount));
 var closed=rows.filter(function(l){return l.act;}).length;
 var pct=(factRevenue()/DATA.planFHD*100).toFixed(0);
 var reg=rows.length?('<table class="tbl"><tr><th>Договор</th><th>Счёт</th><th>Акт</th><th>Заказчик</th><th>Услуга</th><th>Оплата</th><th>КФО</th><th>КОСГУ</th><th>НДС</th><th class="num">Сумма</th></tr>'+
  rows.map(function(l){var act=l.act?'<span class="doc-ok">А-'+l.id.slice(2)+'</span>':'<span class="doc-no">нет акта</span>';
   return '<tr><td>Д-'+l.id.slice(2)+'</td><td>СЧ-'+l.id.slice(2)+'</td><td>'+act+'</td><td>'+l.client+'</td><td>'+l.service+'</td><td>'+(l.paidDate||'—')+'</td><td>2</td><td>131</td><td>'+vatShort(l)+'</td><td class="num">'+money(l.amount)+'</td></tr>';}).join('')+
  '<tr><td colspan="9"><b>Итого доходов от платных услуг (подстатья 131, счёт 205.31)</b></td><td class="num"><b>'+money(fact)+'</b></td></tr>'+
  '<tr><td colspan="9">в т.ч. НДС к уплате (по облагаемым услугам)</td><td class="num">'+money(totalVat)+'</td></tr></table>'):'<div class="empty">Оплаченных доходов пока нет — реестр пуст.</div>';
 var trail='<table class="tbl"><tr><th>Время</th><th>Пользователь</th><th>Действие</th></tr>'+LOG.slice(0,8).map(function(e){return '<tr><td>'+e.t+'</td><td>'+e.who+'</td><td>'+esc(e.msg)+'</td></tr>';}).join('')+'</table>';
 var uSel='<span class="hint">Тип учреждения: <select id="uTypeSel"><option value="budget"'+(state.uType!=='kazna'?' selected':'')+'>Бюджетное / автономное</option><option value="kazna"'+(state.uType==='kazna'?' selected':'')+'>Казённое</option></select></span>';
 return '<div class="panel" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="btn btn-ghost" data-act="fin-list">← к финансам</button><b>'+ic('i-shield')+' Отчёт для контроля (Счётная палата / учредитель)</b><span class="hint">июнь 2026 · приносящая доход деятельность</span>'+uSel+'</div>'+
  svetofor()+
  '<div class="ctrl-cards">'+
   ctrlCard('Кассовые поступления (КФО 2)','подстатья 131 · счёт 205.31',money(fact),'ok')+
   ctrlCard('План ФХД — исполнение','кассовые поступления / план',pct+'%',pct<50?'warn':'ok')+
   ctrlCard('Закрыто актами','полнота первички',closed+' из '+rows.length,closed<rows.length?'warn':'ok')+
   ctrlCard('Целевое использование','раздельный учёт КФО 2 / 4','соответствует','ok')+'</div>'+
  '<div class="planbar"><div class="planbar-fill" style="width:'+Math.min(100,pct)+'%"></div><span>План ФХД: '+money(DATA.planFHD)+' · Кассовые поступления: '+money(factRevenue())+' ('+pct+'%)</span></div>'+
  '<div class="panel"><h3>'+ic('i-fin')+'Реестр доходов: договор → счёт → акт → поступление<span class="hint"><button class="btn btn-ghost" data-act="csv-registry">Выгрузить (CSV)</button> <button class="btn btn-ghost" data-act="csv-737">Для ф. '+formNo()+'</button></span></h3>'+reg+'</div>'+
  '<div class="panel"><h3>'+ic('i-shield')+'Аудиторский след (кто и когда менял данные)</h3>'+trail+'</div>'+
  '<div class="norm-note">Сверочный реестр операционных данных для статотчётности: <b>'+formName()+'</b>. Доходы от платных услуг — подстатья <b>КОСГУ 131</b> (счёт 205.31), вид финобеспечения <b>КФО 2</b>; раздельно от субсидии на госзадание (КФО 4). План ФХД исполняется <b>кассовым методом</b> (по поступлениям). Счётная палата проверяет полноту доходов, целевое использование, раздельный учёт и наличие первички (договор → счёт → акт → поступление). Проводки, НДС и бухотчётность ведутся в 1С/бухпрограмме — портал отдаёт сверочный реестр.</div>';
}
function ctrlCard(t,sub,val,st){return '<div class="ctrl-card '+st+'"><div class="cc-t">'+t+'</div><div class="cc-v">'+val+'</div><div class="cc-s">'+sub+'</div></div>';}

function mLab(role){var head=(role==='scientist')?'<span class="access-pill">доступ: только свои задания</span>':'<span class="access-pill">доступ: вся лаборатория</span>';
 var rows=DATA.lab; if(role==='scientist') rows=rows.filter(function(t){return t.who==='Зайцев';});
 var tbl=rows.length?('<table class="tbl"><tr><th>№</th><th>Образец</th><th>Метод</th><th>Срок</th><th>Исполнитель</th><th>Статус</th><th></th></tr>'+
  rows.map(function(t){var ov=labOverdue(t);var act=t.method.indexOf('КТ')>-1?'<button class="btn btn-ghost" data-act="kt">'+ic('i-scan')+'КТ-модуль</button>':'';
   var pr=t.status==='done'?'<span class="doc-ok">'+ic('i-check')+' протокол загружен</span>':'<button class="btn btn-primary" data-act="lab-done" data-id="'+t.id+'">Загрузить протокол</button>';
   return '<tr'+(ov?' class="risk-row"':'')+'><td>'+t.id+'</td><td>'+esc(t.sample)+'</td><td>'+esc(t.method)+'</td><td>'+t.due+(ov?' <span class="lead-age hot">просрочено</span>':'')+'</td><td>'+esc(t.who)+'</td><td>'+sb(t.status)+'</td><td class="row-actions">'+act+pr+'</td></tr>';}).join('')+'</table>'):'<div class="empty">'+(role==='scientist'?'У вас нет назначенных заданий.':'Заданий на испытания нет.')+'</div>';
 return '<div class="panel"><h3>'+ic('i-lab')+'Задания на испытания '+head+'</h3>'+tbl+'</div>'+
  (role==='lab_head'?'<div class="panel"><h3>'+ic('i-report')+'Загрузка по сотрудникам</h3>'+barList([['Зайцев',DATA.lab.filter(function(t){return t.who==='Зайцев'&&t.status!=='done';}).length||1],['Кузнецова',DATA.lab.filter(function(t){return t.who==='Кузнецова'&&t.status!=='done';}).length||1],['Резерв',1]])+'</div>':'');
}
function prBadge(p){var m={high:['b-new','высокий'],normal:['b-work','обычный'],low:['b-done','низкий']}[p]||['b-work',p||'—']; return '<span class="badge '+m[0]+'">'+m[1]+'</span>';}
function mTickets(role){
 if(!DATA.tickets.length) return '<div class="panel"><h3>'+ic('i-help')+'Тикеты техподдержки</h3><div class="empty">Открытых тикетов нет.</div></div>';
 var rows=DATA.tickets.map(function(t){var ov=labOverdue({due:t.due,status:t.status});
  return '<tr data-ticket="'+t.id+'"'+(ov?' class="risk-row"':'')+'><td><b>'+t.id+'</b></td><td>'+esc(t.subj)+'</td><td>'+prBadge(t.priority)+'</td><td>'+esc(t.cat||'—')+'</td><td>'+(t.assignee?esc(t.assignee):'<span class="muted">не назначен</span>')+'</td><td>'+(t.due||'—')+(ov?' <span class="lead-age hot">просрочено</span>':'')+'</td><td>'+sb(t.status)+'</td><td class="row-actions"><button class="btn btn-ghost" data-act="ticket-open" data-id="'+t.id+'">Открыть</button></td></tr>';
 }).join('');
 return '<div class="panel"><h3>'+ic('i-help')+'Тикеты техподдержки<span class="hint">'+DATA.tickets.filter(function(t){return t.status!=='done';}).length+' открытых</span></h3><table class="tbl"><tr><th>№</th><th>Тема</th><th>Приоритет</th><th>Категория</th><th>Исполнитель</th><th>Срок</th><th>Статус</th><th></th></tr>'+rows+'</table></div>';}
function openTicket(id){var t=DATA.tickets.find(function(x){return x.id===id;}); if(!t)return;
 var thread=(t.thread&&t.thread.length)?t.thread.map(function(m){return '<div class="note"><b>'+esc(m.who)+':</b> '+esc(m.msg)+'</div>';}).join(''):'<div class="muted" style="font-size:13px">Сообщений пока нет.</div>';
 var acts=t.status!=='done'?'<button class="btn btn-ghost" data-act="ticket-assign" data-id="'+id+'">Взять на себя</button><button class="btn btn-primary" data-act="ticket-close" data-id="'+id+'">Решить и закрыть</button>':'<span class="doc-ok">'+ic('i-check')+' тикет закрыт</span>';
 openDrawer('<div class="dh"><div><h3>Тикет '+t.id+'</h3><div class="muted" style="font-size:13px">от '+esc(t.from)+' · '+esc(t.cat||'')+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><p style="font-size:15px;font-weight:600;margin:0 0 12px">'+esc(t.subj)+'</p><div class="kv"><b>Приоритет</b><span>'+prBadge(t.priority)+'</span></div><div class="kv"><b>Исполнитель</b><span>'+(t.assignee?esc(t.assignee):'не назначен')+'</span></div><div class="kv"><b>Срок</b><span>'+(t.due||'—')+'</span></div><h4 style="margin:16px 0 6px;font-size:13px;color:#586673">Переписка</h4>'+thread+'<div class="fld" style="margin-top:10px"><textarea id="tkmsg" rows="3" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit" placeholder="Комментарий…"></textarea></div><div class="btnrow"><button class="btn btn-ghost" data-act="ticket-reply" data-id="'+id+'">Добавить в переписку</button>'+acts+'</div></div>');}
function taskBadge(st){var m={new:['b-new','Новое'],progress:['b-work','В работе'],report:['b-bill','Отчёт сдан'],done:['b-paid','Принято']}[st]||['b-new',st]; return '<span class="badge '+m[0]+'">'+m[1]+'</span>';}
function mTasks(role){var me=ROLES[role].who, boss=(role==='director'||role==='admin');
 var list=boss?DATA.tasks:DATA.tasks.filter(function(t){return t.assignee===me;});
 var head=boss
   ? '<div class="panel" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><b>'+ic('i-report')+' Поручения сотрудникам</b><span class="muted">ставьте задачи и принимайте отчёты</span><button class="btn btn-primary" style="margin-left:auto" data-act="task-new">+ Новое поручение</button></div>'
   : '<div class="panel" style="display:flex;align-items:center;gap:12px"><b>'+ic('i-report')+' Мои поручения</b><span class="muted">от руководства, со сроками</span></div>';
 if(!list.length) return head+'<div class="empty">'+(boss?'Поручений нет. Создайте первое.':'Активных поручений у вас нет.')+'</div>';
 var rows=list.map(function(t){var ov=labOverdue({due:t.due,status:t.status});
   var act='';
   if(boss){ if(t.status==='report')act+='<button class="btn btn-primary" data-act="task-accept" data-id="'+t.id+'">Принять</button><button class="btn btn-ghost" data-act="task-return" data-id="'+t.id+'">Вернуть</button>'; act+='<button class="btn btn-ghost" data-act="task-open" data-id="'+t.id+'">Открыть</button>'; }
   else { if(t.status==='new'||t.status==='progress')act+='<button class="btn btn-primary" data-act="task-report" data-id="'+t.id+'">Сдать отчёт</button>'; act+='<button class="btn btn-ghost" data-act="task-open" data-id="'+t.id+'">Открыть</button>'; }
   return '<tr'+(ov?' class="risk-row"':'')+'><td><b>'+t.id+'</b></td><td>'+esc(t.title)+(t.report?'<div class="kb-sub">отчёт: '+esc(t.report.slice(0,64))+'…</div>':'')+'</td><td>'+esc(boss?t.assignee:t.from)+'</td><td>'+t.due+(ov?' <span class="lead-age hot">просрочено</span>':'')+'</td><td>'+taskBadge(t.status)+'</td><td class="row-actions">'+act+'</td></tr>';
 }).join('');
 return head+'<div class="panel"><table class="tbl"><tr><th>№</th><th>Поручение</th><th>'+(boss?'Исполнитель':'От кого')+'</th><th>Срок</th><th>Статус</th><th></th></tr>'+rows+'</table></div>';
}
function openTask(id){var t=DATA.tasks.find(function(x){return x.id===id;}); if(!t)return; var boss=(state.role==='director'||state.role==='admin'), me=ROLES[state.role].who;
 var acts='';
 if(boss){ if(t.status==='report')acts='<button class="btn btn-primary" data-act="task-accept" data-id="'+id+'">Принять отчёт</button><button class="btn btn-ghost" data-act="task-return" data-id="'+id+'">Вернуть на доработку</button>'; else acts='<span class="muted" style="font-size:13px">'+(t.status==='done'?'Поручение закрыто':'Ожидаем отчёт исполнителя')+'</span>'; }
 else if(t.assignee===me && (t.status==='new'||t.status==='progress')){ acts='<button class="btn btn-primary" data-act="task-report" data-id="'+id+'">Сдать отчёт</button>'; }
 var rep=t.report?'<div class="sod" style="margin-top:14px"><div class="sod-t">'+ic('i-report')+' Отчёт исполнителя</div><div class="note">'+esc(t.report)+'</div></div>':'<div class="muted" style="font-size:13px;margin-top:10px">Отчёт ещё не сдан.</div>';
 openDrawer('<div class="dh"><div><h3>Поручение '+t.id+'</h3><div class="muted" style="font-size:13px">от '+esc(t.from)+' · срок '+t.due+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><p style="font-size:15px;font-weight:600;margin:0 0 12px">'+esc(t.title)+'</p><div class="kv"><b>Исполнитель</b><span>'+esc(t.assignee)+'</span></div><div class="kv"><b>Статус</b><span>'+taskBadge(t.status)+'</span></div>'+rep+'<div class="btnrow">'+acts+'</div></div>');
}
function openContentEditor(name){var txt=(DATA.content&&DATA.content[name])||''; openDrawer('<div class="dh"><div><h3>Редактор: '+esc(name)+'</h3><div class="muted" style="font-size:13px">правки → предпросмотр → публикация</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Текст раздела</label><textarea id="cedit" rows="7" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit">'+esc(txt)+'</textarea></div><div class="fld"><label>Предпросмотр</label><div id="cprev" class="content-prev">'+esc(txt)+'</div></div><div class="btnrow"><button class="btn btn-primary" data-act="content-save" data-name="'+esc(name)+'">Опубликовать</button><button class="btn btn-ghost" data-act="close">Отмена</button></div></div>');}
function taskReportForm(id){var t=DATA.tasks.find(function(x){return x.id===id;}); if(!t)return;
 openDrawer('<div class="dh"><div><h3>Отчёт по '+id+'</h3><div class="muted" style="font-size:13px">'+esc(t.title)+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Текст отчёта</label><textarea id="trep" rows="5" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit">'+esc(t.report||'')+'</textarea></div><div class="btnrow"><button class="btn btn-primary" data-act="task-report-save" data-id="'+id+'">Отправить отчёт</button><button class="btn btn-ghost" data-act="task-open" data-id="'+id+'">Назад</button></div></div>');
}
function mContent(){var secs=[['Новости','novosti.html'],['Услуги','uslugi.html'],['Обучение','obuchenie.html'],['Кейсы','keysy.html'],['КТ-контроль','kt-morfometriya.html'],['Контакты/реквизиты','site.json']];
 return '<div class="panel"><h3>'+ic('i-content')+'Редактирование контента сайта<span class="hint">правки → пересборка (build.py)</span></h3>'+
  '<table class="tbl"><tr><th>Раздел</th><th>Источник</th><th></th></tr>'+secs.map(function(s){return '<tr><td>'+s[0]+'</td><td><code>'+s[1]+'</code></td><td class="row-actions"><button class="btn btn-ghost" data-act="content-edit" data-name="'+s[0]+'">Редактировать</button><button class="btn btn-primary" data-act="content-pub" data-name="'+s[0]+'">Опубликовать</button></td></tr>';}).join('')+'</table></div>';}
function mUsers(){var rows=[['Дашборд','yes','part','part','part','no','part','yes'],['Заявки','part','yes','part','no','no','no','yes'],['Финансы','part','no','yes','no','no','no','yes'],['Лаборатория','part','no','no','yes','part','no','yes'],['Контент','no','no','no','no','no','yes','yes'],['Техподдержка','no','no','no','no','no','yes','yes'],['Пользователи','part','no','no','no','no','no','yes']];
 var heads=['Директор','Менеджер','Бухг.','Рук.лаб.','Науч.сотр.','Тех.под.','Админ'];
 function cell(v){return v==='yes'?'<span class="yes">✓</span>':v==='part'?'<span class="part">просмотр</span>':'<span class="no">—</span>';}
 var rbac='<table class="rbac"><tr><th>Модуль \\ Роль</th>'+heads.map(function(h){return '<th>'+h+'</th>';}).join('')+'</tr>'+rows.map(function(r){return '<tr><td>'+r[0]+'</td>'+r.slice(1).map(function(v){return '<td>'+cell(v)+'</td>';}).join('')+'</tr>';}).join('')+'</table>';
 var users='<table class="tbl"><tr><th>Сотрудник</th><th>Роль</th><th>Отдел</th><th>Доступ</th><th>Статус</th><th></th></tr>'+DATA.users.map(function(u,i){var off=u.active===false; return '<tr'+(off?' class="user-off"':'')+'><td>'+esc(u.nm)+'</td><td>'+esc(u.role)+'</td><td>'+esc(u.dept)+'</td><td><span class="access-pill">'+esc(u.acc)+'</span></td><td>'+(off?'<span class="badge b-done">выключен</span>':'<span class="badge b-paid">активен</span>')+'</td><td class="row-actions"><button class="btn btn-ghost" data-act="user-toggle" data-i="'+i+'">'+(off?'Включить':'Выключить')+'</button></td></tr>';}).join('')+'</table>';
 return '<div class="panel" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><b>'+ic('i-users')+' Сотрудники</b><span class="muted">'+DATA.users.length+' учётных записей</span><button class="btn btn-primary" style="margin-left:auto" data-act="user-add">+ Добавить сотрудника</button></div><div class="panel">'+users+'</div><div class="panel"><h3>'+ic('i-users')+'Матрица доступа (RBAC)</h3>'+rbac+'</div>';}
function mReports(){return '<div class="panel"><h3>'+ic('i-report')+'Отчёты<span class="hint">CSV — реальная выгрузка демо-данных</span></h3><table class="tbl"><tr><th>Отчёт</th><th>Период</th><th></th></tr>'+
 [['Выручка по услугам','Июнь 2026','rev'],['Воронка продаж и конверсия','II квартал','funnel'],['Загрузка лабораторий','Июнь 2026','lab'],['Доходы для Счётной палаты (подстатья 131)','Июнь 2026','reg']].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td class="row-actions"><button class="btn btn-ghost" data-act="toast" data-msg="PDF будет сформирован в боевой версии">PDF</button><button class="btn btn-primary" data-act="csv-report" data-rep="'+r[2]+'">CSV</button></td></tr>';}).join('')+'</table></div>';}
function csvReport(rep){
 if(rep==='reg'){csvRegistry();return;}
 var name,head,lines;
 if(rep==='rev'){name='vyruchka_po_uslugam.csv';head='Услуга;Сумма, тыс.₽';lines=DATA.revServices.map(function(r){return r[0]+';'+r[1];});}
 else if(rep==='funnel'){name='voronka_prodazh.csv';head='Статус;Кол-во;Сумма';var cols=['new','work','bill','paid','done'];lines=cols.map(function(c){var it=DATA.leads.filter(function(l){return l.status===c;});return STATUS[c][1]+';'+it.length+';'+sum(it.map(function(l){return l.amount;}));});}
 else {name='zagruzka_laboratorij.csv';head='Исполнитель;Активных заданий';var mp={};DATA.lab.forEach(function(t){if(t.status!=='done')mp[t.who]=(mp[t.who]||0)+1;});lines=Object.keys(mp).map(function(k){return k+';'+mp[k];});}
 download(name,'﻿'+head+'\n'+lines.join('\n'));
}
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
  '<div class="holcards">'+(DATA.holidays.length?cards:'<div class="empty">Праздников пока нет. Добавьте первый — кнопка «+ Добавить праздник».</div>')+'</div>'+
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
var RENDER={dash:mDash,tasks:mTasks,leads:mLeads,finance:mFinance,lab:mLab,tickets:mTickets,content:mContent,users:mUsers,reports:mReports,holidays:mHolidays};

// ---------- shell ----------
function renderApp(){var R=ROLES[state.role],menu=R.menu; if(menu.indexOf(state.mod)<0)state.mod=menu[0];
 var newCount=DATA.leads.filter(function(l){return l.status==='new'&&!l.seen;}).length;
 var sidebar='<aside class="sidebar"><div class="brand"><img src="../img/logo.png" alt="ВНИИКП"><b>ВНИИКП<br><span style="font-weight:500;color:#9fb0bf;font-size:11px">система управления</span></b></div><nav class="menu" aria-label="Разделы">'+'<div class="grp">Кабинет: '+R.label+'</div>'+menu.map(function(m){return '<a data-mod="'+m+'" tabindex="0" role="button"'+(m===state.mod?' aria-current="page"':'')+' class="'+(m===state.mod?'active':'')+'">'+ic2(MOD[m][0])+MOD[m][1]+(m==='leads'&&newCount?'<span class="menu-badge">'+newCount+'</span>':'')+'</a>';}).join('')+'</nav><div class="foot">Прототип · демо-данные</div></aside>';
 var initials=R.who.split(' ').slice(0,2).map(function(x){return x[0];}).join('');
 var roleOpts=Object.keys(ROLES).map(function(k){return '<option value="'+k+'"'+(k===state.role?' selected':'')+'>'+ROLES[k].label+'</option>';}).join('');
 var viOn=document.body.classList.contains('vi');
 var notes=notifList(state.role);
 var top='<div class="topbar"><button class="tmenu" id="menuBtn" type="button" aria-label="Меню">☰</button><div class="pagetitle">'+MOD[state.mod][1]+'</div><div class="spacer"></div><input class="search" id="globalSearch" placeholder="Поиск по странице…" title="Фильтр заявок/строк на текущем экране"><div class="bell-wrap"><button class="tbell" id="bellBtn" type="button" title="Уведомления">'+ic('i-bell')+(notes.length?'<span class="bell-badge">'+notes.length+'</span>':'')+'</button><div class="notif-panel" id="notifPanel"><div class="np-head">Уведомления</div>'+(notes.length?notes.map(function(x){return '<a class="np-item" data-mod="'+x.mod+'">'+esc(x.txt)+'</a>';}).join(''):'<div class="np-empty">Новых уведомлений нет</div>')+'<div class="np-foot"><button class="btn btn-ghost" data-act="sim-lead">Имитировать заявку с сайта</button></div></div></div><button class="ta11y'+(viOn?' on':'')+'" id="a11yBtn" type="button" aria-pressed="'+(viOn?'true':'false')+'" title="Версия для слабовидящих">Аа</button><button class="treset" id="resetBtn" type="button" title="Сбросить демо-данные к исходному виду">Сбросить демо</button><div class="role-switch">Войти как: <select id="roleSel">'+roleOpts+'</select></div><div class="user"><div class="avatar">'+initials+'</div><div><div class="nm">'+R.who+'</div><div class="rl">'+R.label+'</div></div></div><button class="x" id="logout" title="Выйти">'+ic('i-out')+'</button></div>';
 var main='<div class="main">'+top+'<div class="demobar">⚙ ПРОТОТИП — кнопки рабочие, данные демонстрационные (сохраняются в сессии). Боевая версия: backend + авторизация + онлайн-оплата + 152-ФЗ.</div><div class="content">'+RENDER[state.mod](state.role)+'</div></div>';
 document.getElementById('app').innerHTML=SPRITE+'<div class="shell">'+sidebar+main+'</div><div class="drawer-bg" id="dbg"></div><div class="drawer" id="drawer"></div><div id="toast" class="toast"></div>';
}
function ic2(id){return '<svg class="ic" aria-hidden="true"><use href="#'+id+'"></use></svg>';}
function go(){saveData();renderApp();}
function toast(m,undoLabel){var t=document.getElementById('toast'); if(!t)return; t.innerHTML=esc(m)+(undoLabel?' <button type="button" class="toast-undo">'+esc(undoLabel)+'</button>':''); t.classList.add('show'); clearTimeout(toast._); toast._=setTimeout(function(){t.classList.remove('show');},undoLabel?6000:2600); var b=t.querySelector('.toast-undo'); if(b)b.addEventListener('click',function(){t.classList.remove('show'); if(toast._undo)toast._undo();});}
var lastFocusAdmin=null;
function closeDrawer(){var d=document.getElementById('drawer'),b=document.getElementById('dbg'); if(d)d.classList.remove('open'); if(b)b.classList.remove('open'); if(lastFocusAdmin&&lastFocusAdmin.focus){try{lastFocusAdmin.focus();}catch(_){}lastFocusAdmin=null;}}
function openDrawer(html){var d=document.getElementById('drawer'); lastFocusAdmin=document.activeElement; d.innerHTML=html; d.classList.add('open'); document.getElementById('dbg').classList.add('open'); var f=d.querySelector('button:not(.x),select,input,textarea,[tabindex]'); if(f){try{f.focus();}catch(_){}}}

function renderLogin(){var roles=[['director','i-dash','Директор'],['manager','i-leads','Менеджер'],['accountant','i-fin','Бухгалтерия'],['lab_head','i-lab','Рук. лаборатории'],['scientist','i-lab','Научный сотрудник'],['support','i-help','Техподдержка'],['admin','i-users','Администратор']];
 document.getElementById('app').innerHTML=SPRITE+'<div class="login"><div class="login-card"><img src="../img/logo.png" alt="ВНИИКП"><h1>Система управления ВНИИКП</h1><p class="sub">Вход для сотрудников · единый портал</p><div class="fld"><label>Логин</label><input value="demo@vniikp.ru"></div><div class="fld"><label>Пароль</label><input type="password" value="••••••••"></div><div class="demo-note">— прототип, выберите роль для входа —</div><div class="role-grid">'+roles.map(function(r){return '<button data-role="'+r[0]+'">'+ic2(r[1])+r[2]+'</button>';}).join('')+'</div></div></div>';}

// ---------- lead drawer + разделение обязанностей ----------
var PERM={bill:['manager','admin'],paid:['accountant','admin'],act:['accountant','admin'],reply:['manager','accountant','admin'],tolab:['manager','admin','lab_head']};
function can(a){return PERM[a]&&PERM[a].indexOf(state.role)>-1;}
function whoDoes(a){return {bill:'Менеджер',paid:'Бухгалтерия',act:'Бухгалтерия',tolab:'Менеджер / лаборатория'}[a];}
function lbtn(kind,act,id,label){return '<button class="btn btn-'+kind+'" data-act="'+act+'" data-id="'+id+'">'+label+'</button>';}
function permHint(t){return '<span class="perm-hint">'+ic('i-shield')+' '+t+'</span>';}
function contactLinks(l){var p=[]; if(l.phone)p.push('<a href="tel:'+l.phone.replace(/[^+\d]/g,'')+'">'+esc(l.phone)+'</a>'); if(l.email)p.push('<a href="mailto:'+esc(l.email)+'">'+esc(l.email)+'</a>'); return p.length?p.join('<br>'):'<span class="muted">не указаны</span>';}
function updateLeadBadge(){var a=document.querySelector('.menu a[data-mod="leads"]'); if(!a)return; var old=a.querySelector('.menu-badge'); if(old)old.remove(); var n=DATA.leads.filter(function(l){return l.status==='new'&&!l.seen;}).length; if(n)a.insertAdjacentHTML('beforeend','<span class="menu-badge">'+n+'</span>');}
function logLeadEvent(l,who,msg){ l.events=l.events||[]; l.events.push({t:'09.06',who:who,msg:msg}); }
function synthEvents(l){var ev=[]; ev.push({t:l.date,who:l.mgr,msg:'Заявка поступила'}); if(l.billDate)ev.push({t:l.billDate,who:l.billBy||l.mgr,msg:'Выставлен счёт'}); if(l.paidDate)ev.push({t:l.paidDate,who:l.paidBy||'Бухгалтерия',msg:'Поступила оплата'}); if(l.act)ev.push({t:l.paidDate||l.date,who:l.actBy||'Бухгалтерия',msg:'Сформирован акт, сделка закрыта'}); return ev;}
function leadTimeline(l){var ev=(l.events&&l.events.length)?l.events:synthEvents(l); if(!ev.length)return ''; return '<div class="lead-tl"><div class="tl-t">'+ic('i-report')+' История заявки</div>'+ev.map(function(e){return '<div class="tl-row"><span class="tl-d">'+esc(e.t||'')+'</span><span class="tl-m">'+esc(e.msg)+'</span><span class="tl-w">'+esc(e.who||'')+'</span></div>';}).join('')+'</div>';}
// сквозной поток: передача заявки реальным образцом в кабинет лаборатории (общий localStorage одного origin)
function pushToKabinet(l){
 try{ var KK='wniikp_kabinet_v8', raw=localStorage.getItem(KK); if(!raw)return false; var st=JSON.parse(raw); if(!st||!st.samples)return false;
  var n=st.samples.length+101, sid='К-'+n, s=String(l.service||'').toLowerCase();
  var lab=/шоколад|идентифик|мармелад/.test(s)?'choc':/микроб|кмафанм|партии/.test(s)?'micro':/жир|хромат|перекис|аналог/.test(s)?'chrom':/мучн|вафл|печень|пряник/.test(s)?'flour':'physchem';
  st.samples.push({id:sid,lab:lab,date:'09.06',due:'16.06',product:l.service,client:l.client,tests:[l.service],status:'new',fromLead:l.id});
  localStorage.setItem(KK,JSON.stringify(st)); return sid;
 }catch(e){return false;}
}
function orderFlow(l){
 var stages=[['Заявка',true],['Счёт',['bill','paid','done'].indexOf(l.status)>-1],['В лаборатории',!!l.toLab],['Протокол',!!l.protocolReady],['Оплата',['paid','done'].indexOf(l.status)>-1],['Акт',!!l.act]];
 var link=l.kabinetSampleId?'<a class="of-link" href="../kabinet.html" target="_blank">Открыть образец '+esc(l.kabinetSampleId)+' в кабинете лаборатории →</a>':'';
 if(l.protocolReady)link='<div class="of-ready">'+ic('i-check')+' Протокол '+esc(l.protocolNo||'')+' готов в лаборатории</div>'+link;
 return '<div class="of-wrap"><div class="of-t">Сквозной поток заказа</div><div class="order-flow">'+stages.map(function(s,i){return (i?'<span class="of-arrow">→</span>':'')+'<span class="of-step'+(s[1]?' done':'')+'">'+esc(s[0])+'</span>';}).join('')+'</div>'+link+'</div>';
}
function openLead(id){var l=DATA.leads.find(function(x){return x.id===id;}); if(!l)return;
 if(!l.seen){l.seen=true;saveData();updateLeadBadge();}
 var acts='';
 if(state.role==='director'){ acts='<span class="muted">режим просмотра (директор)</span>'; }
 else {
  var p=[];
  if(l.status==='new'||l.status==='work'){
   if(can('reply'))p.push(lbtn('ghost','lead-reply',id,'Ответить'));
   if(can('bill'))p.push(lbtn('primary','lead-bill',id,'Выставить счёт')); else p.push(permHint('Счёт выставляет '+whoDoes('bill')));
   if(can('tolab'))p.push(lbtn('ghost','lead-tolab',id,'Передать в лабораторию'));
  } else if(l.status==='bill'){
   if(can('reply'))p.push(lbtn('ghost','lead-reply',id,'Ответить'));
   if(can('paid'))p.push(lbtn('primary','lead-paid',id,'Принять оплату')); else p.push(permHint('Оплату подтверждает '+whoDoes('paid')));
  } else if(l.status==='paid'){
   if(can('act'))p.push(lbtn('primary','lead-act',id,'Сформировать акт')); else p.push(permHint('Акт формирует '+whoDoes('act')));
  } else { p.push('<span class="doc-ok">'+ic('i-check')+' сделка закрыта, акт сформирован</span>'); }
  acts=p.join('');
 }
 var ctl='<div class="sod"><div class="sod-t">'+ic('i-shield')+' Контроль (разделение обязанностей)</div>'+
  '<div class="sod-r"><span>Счёт выставил</span><b>'+esc(l.billBy||'—')+'</b></div>'+
  '<div class="sod-r"><span>Оплату подтвердил</span><b>'+esc(l.paidBy||'—')+'</b></div>'+
  '<div class="sod-r"><span>Акт сформировал</span><b>'+esc(l.actBy||'—')+'</b></div></div>';
 var notes=l.notes.length?('<h4 style="margin:16px 0 6px;font-size:13px;color:#586673">Переписка</h4>'+l.notes.map(function(n){return '<div class="note">'+esc(n)+'</div>';}).join('')):'';
 openDrawer('<div class="dh"><div><h3>Заявка '+l.id+'</h3><div class="muted" style="font-size:13px">от '+l.date+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="kv"><b>Клиент</b><span>'+esc(l.client)+'</span></div><div class="kv"><b>Контакты</b><span class="kv-contacts">'+contactLinks(l)+'</span></div><div class="kv"><b>Услуга</b><span>'+esc(l.service)+'</span></div><div class="kv"><b>Сумма</b><span>'+money(l.amount)+'</span></div><div class="kv"><b>НДС</b><span>'+vatLabel(l)+'</span></div><div class="kv"><b>Менеджер</b><span>'+esc(l.mgr)+'</span></div><div class="kv"><b>Статус</b><span>'+sb(l.status)+'</span></div>'+orderFlow(l)+ctl+leadTimeline(l)+notes+'<div class="btnrow">'+acts+'</div></div>');
}
function replyForm(id){var l=DATA.leads.find(function(x){return x.id===id;});
 openDrawer('<div class="dh"><div><h3>Ответ клиенту</h3><div class="muted" style="font-size:13px">'+l.client+'</div></div><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Сообщение</label><textarea id="replyTxt" rows="5" style="width:100%;padding:11px;border:1px solid #e6eaef;border-radius:10px;font-family:inherit" placeholder="Здравствуйте! По вашей заявке…"></textarea></div><div class="btnrow"><button class="btn btn-primary" data-act="lead-send" data-id="'+id+'">Отправить</button><button class="btn btn-ghost" data-act="lead-open" data-id="'+id+'">Назад</button></div></div>');}

// ---------- CSV ----------
function download(name,text){var b=new Blob([text],{type:'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();}
function csvInvoices(){var rows=DATA.leads.filter(function(l){return ['bill','paid','done'].indexOf(l.status)>-1;});
 var t='Счёт;Клиент;Услуга;Статус;Сумма\n'+rows.map(function(l){return 'СЧ-'+l.id.slice(2)+';'+l.client+';'+l.service+';'+STATUS[l.status][1]+';'+l.amount;}).join('\n');download('scheta.csv',t);}
function csvRegistry(){var rows=paidLeads();var t='Договор;Счёт;Акт;Заказчик;Услуга;Дата оплаты;КФО;КОСГУ;НДС;Сумма\n'+rows.map(function(l){return 'Д-'+l.id.slice(2)+';СЧ-'+l.id.slice(2)+';'+(l.act?'А-'+l.id.slice(2):'нет')+';'+l.client+';'+l.service+';'+(l.paidDate||'')+';2;131;'+vatShort(l)+';'+l.amount;}).join('\n');download('reestr_dohodov_131.csv',t);}

// ---------- events ----------
document.addEventListener('click',function(e){
 var rb=e.target.closest('[data-role]'); if(rb){state.role=rb.getAttribute('data-role');state.mod=ROLES[state.role].menu[0];state.finView='list';logAct(ROLES[state.role].who,'вход в систему как «'+ROLES[state.role].label+'»');go();return;}
 var mn=e.target.closest('[data-mod]'); if(mn){state.mod=mn.getAttribute('data-mod');state.finView='list';go();return;}
 if(e.target.closest('#logout')){state.role=null;renderLogin();return;}
 if(e.target.closest('#menuBtn')){var sbar=document.querySelector('.sidebar'); if(sbar)sbar.classList.toggle('open'); return;}
 if(e.target.closest('#bellBtn')){var np=document.getElementById('notifPanel'); if(np)np.classList.toggle('open'); return;}
 if(e.target.closest('#a11yBtn')){var vion=document.body.classList.toggle('vi'); try{localStorage.setItem('wniikp_admin_vi',vion?'1':'0');}catch(_){}; var ab=e.target.closest('#a11yBtn'); ab.setAttribute('aria-pressed',vion?'true':'false'); ab.classList.toggle('on',vion); return;}
 if(e.target.closest('#resetBtn')){if(confirm('Сбросить демо-данные системы управления к исходному состоянию? Изменения (заявки, оплаты, праздники) будут возвращены.')){resetData();go();toast('Демо-данные сброшены');} return;}
 if(e.target.closest('#dbg')){closeDrawer();return;}
 var a=e.target.closest('[data-act]'); if(!a)
   { var ld=e.target.closest('[data-lead]'); if(ld) openLead(ld.getAttribute('data-lead')); return; }
 var act=a.getAttribute('data-act'), id=a.getAttribute('data-id'), L=id?DATA.leads.find(function(x){return x.id===id;}):null, who=ROLES[state.role].who;
 switch(act){
  case 'close': closeDrawer(); break;
  case 'lead-open': openLead(id); break;
  case 'lead-reply': replyForm(id); break;
  case 'lead-send': var v=(document.getElementById('replyTxt')||{}).value||''; if(v.trim()){L.notes.push('Вы: '+v.trim());logLeadEvent(L,who,'Ответ клиенту');logAct(who,'ответ клиенту по '+id);toast('Ответ отправлен клиенту');} openLead(id); break;
  case 'lead-bill': if(!can('bill')){toast('Недостаточно прав: счёт выставляет '+whoDoes('bill'));break;} L.status='bill';L.billBy=who;L.billDate=L.billDate||'09.06';L.dueDate=L.dueDate||'16.06';logLeadEvent(L,who,'Выставлен счёт');logAct(who,'выставлен счёт по '+id);closeDrawer();go();toast('Счёт выставлен по '+id); break;
  case 'lead-paid': if(!can('paid')){toast('Недостаточно прав: оплату подтверждает '+whoDoes('paid'));break;} L.status='paid';L.paidDate='09.06';L.paidBy=who;logLeadEvent(L,who,'Поступила оплата');logAct(who,'принята оплата по '+id);closeDrawer();go();toast('Оплата зафиксирована по '+id); break;
  case 'lead-act': { if(!can('act')){toast('Недостаточно прав: акт формирует '+whoDoes('act'));break;} var snapA=JSON.parse(JSON.stringify(L)); L.status='done';L.act=true;L.actBy=who;logLeadEvent(L,who,'Сформирован акт, сделка закрыта');logAct(who,'сформирован акт по '+id);closeDrawer();go(); toast._undo=function(){var ix=DATA.leads.findIndex(function(x){return x.id===id;}); if(ix>-1)DATA.leads[ix]=snapA; logAct(who,'отменён акт по '+id); go(); toast('Действие отменено');}; toast('Акт сформирован, сделка закрыта','Отменить'); break; }
  case 'lead-tolab': { if(!can('tolab')){toast('Недостаточно прав: передаёт в лабораторию '+whoDoes('tolab'));break;} DATA.lab.unshift({id:'И-'+(513+DATA.lab.length),sample:'Образец по '+id,method:L.service,due:'12.06',who:'Кузнецова',status:'new'}); L.toLab=true; var sid=pushToKabinet(L); if(sid)L.kabinetSampleId=sid; logLeadEvent(L,who,'Передана в лабораторию'+(sid?' (образец '+sid+')':'')); logAct(who,'заявка '+id+' передана в лабораторию'+(sid?', создан образец '+sid:'')); closeDrawer();go(); toast(sid?('Передано — образец '+sid+' создан в кабинете лаборатории'):'Передано в лабораторию (создано задание)'); break; }
  case 'new-lead': openDrawer('<div class="dh"><h3>Новая заявка</h3><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Клиент</label><input id="nlc" placeholder="ООО «…»"></div><div class="fld"><label>Телефон</label><input id="nlp" placeholder="+7 (___) ___-__-__"></div><div class="fld"><label>E-mail</label><input id="nle" type="email" placeholder="client@example.ru"></div><div class="fld"><label>Услуга</label><input id="nls" placeholder="Срок годности…"></div><div class="fld"><label>Сумма, ₽</label><input id="nla" type="number" placeholder="50000"></div><div class="btnrow"><button class="btn btn-primary" data-act="new-lead-save">Создать</button></div></div>'); break;
  case 'new-lead-save': var c=(document.getElementById('nlc')||{}).value,s=(document.getElementById('nls')||{}).value,am=+((document.getElementById('nla')||{}).value)||0,ph=(document.getElementById('nlp')||{}).value,em=(document.getElementById('nle')||{}).value; if(c){var nid='З-'+(239+DATA.leads.length);DATA.leads.unshift({id:nid,client:c,phone:ph,email:em,service:s||'—',amount:am,status:'new',mgr:who,date:'09.06',notes:[],events:[],seen:true});logAct(who,'создана заявка '+nid);} closeDrawer();go();toast('Заявка создана'); break;
  case 'lab-done': var t=DATA.lab.find(function(x){return x.id===id;}); if(t){t.status='done';logAct(who,'загружен протокол '+id);} go();toast('Протокол загружен, задание выполнено'); break;
  case 'sim-lead': { var pool=[['ООО «Бисквит-Мастер»','Срок годности (бисквит)','+7 (931) 200-55-10','order@biskvit.ru',54000],['ИП Громова','Идентификация мёда в прянике','+7 (902) 717-30-44','gromova@mail.ru',39000],['АО «КондитерУрал»','КТ-морфометрия зефира','+7 (343) 901-22-87','lab@konditerural.ru',88000]]; var p=pool[DATA.leads.length%pool.length], nid='З-'+(239+DATA.leads.length); DATA.leads.unshift({id:nid,client:p[0],service:p[1],phone:p[2],email:p[3],amount:p[4],status:'new',mgr:'Орлова',date:'09.06',notes:[],events:[],seen:false}); logAct('Система','новая заявка '+nid+' с сайта'); go(); toast('Новая заявка '+nid+' поступила с сайта'); break; }
  case 'task-new': var uopts=DATA.users.filter(function(u){return u.nm!=='Белецкий С. Л.';}).map(function(u){return '<option>'+esc(u.nm)+'</option>';}).join(''); openDrawer('<div class="dh"><h3>Новое поручение</h3><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>Исполнитель</label><select id="tas">'+uopts+'</select></div><div class="fld"><label>Поручение</label><input id="tti" placeholder="Что нужно сделать"></div><div class="fld"><label>Срок (дд.мм)</label><input id="tdu" placeholder="15.06"></div><div class="btnrow"><button class="btn btn-primary" data-act="task-create">Создать поручение</button></div></div>'); break;
  case 'task-create': var ta=val('tas'),tt=val('tti').trim(),td=val('tdu').trim()||'—'; if(tt){var ntid='П-'+(13+DATA.tasks.length);DATA.tasks.unshift({id:ntid,title:tt,assignee:ta,from:who,due:td,status:'new',report:''});logAct(who,'создано поручение '+ntid+' для '+ta);} closeDrawer();go();toast('Поручение создано'); break;
  case 'task-open': openTask(id); break;
  case 'task-report': taskReportForm(id); break;
  case 'task-report-save': var tr=DATA.tasks.find(function(x){return x.id===id;}); var rv=val('trep').trim(); if(tr&&rv){tr.report=rv;tr.status='report';logAct(who,'сдан отчёт по поручению '+id);} closeDrawer();go();toast('Отчёт отправлен руководителю'); break;
  case 'task-accept': var ta2=DATA.tasks.find(function(x){return x.id===id;}); if(ta2){ta2.status='done';logAct(who,'принят отчёт по поручению '+id);} closeDrawer();go();toast('Отчёт принят, поручение закрыто'); break;
  case 'task-return': var ta3=DATA.tasks.find(function(x){return x.id===id;}); if(ta3){ta3.status='progress';logAct(who,'поручение '+id+' возвращено на доработку');} closeDrawer();go();toast('Возвращено на доработку'); break;
  case 'csv-report': csvReport(a.getAttribute('data-rep')); logAct(who,'выгрузка отчёта (CSV)'); toast('Отчёт выгружен в CSV'); break;
  case 'user-toggle': var ui=+a.getAttribute('data-i'),uu=DATA.users[ui]; if(uu){uu.active=(uu.active===false); logAct(who,(uu.active?'включена':'выключена')+' учётка «'+uu.nm+'»');} go(); toast(uu&&uu.active?'Учётка включена':'Учётка выключена'); break;
  case 'user-add': var ro=['Директор','Менеджер','Бухгалтерия','Рук. лаборатории','Научный сотрудник','Техподдержка','Администратор'].map(function(r){return '<option>'+r+'</option>';}).join(''); openDrawer('<div class="dh"><h3>Новый сотрудник</h3><button class="x" data-act="close">×</button></div><div class="db"><div class="fld"><label>ФИО</label><input id="unm" placeholder="Фамилия И. О."></div><div class="fld"><label>Роль</label><select id="uro">'+ro+'</select></div><div class="fld"><label>Отдел</label><input id="ude" placeholder="Научный отдел"></div><div class="btnrow"><button class="btn btn-primary" data-act="user-create">Создать учётку</button></div></div>'); break;
  case 'user-create': var unm=val('unm').trim(),uro=val('uro'),ude=val('ude').trim(); if(unm){DATA.users.push({nm:unm,role:uro,dept:ude||'—',acc:'—',active:true});logAct(who,'создана учётка «'+unm+'» ('+uro+')');} closeDrawer();go();toast('Учётка создана'); break;
  case 'kt': window.open('../kt-morfometriya.html','_blank'); break;
  case 'ticket-open': openTicket(id); break;
  case 'ticket-reply': var tkr=DATA.tickets.find(function(x){return x.id===id;}); var tkm=val('tkmsg').trim(); if(tkr&&tkm){tkr.thread=tkr.thread||[];tkr.thread.push({who:who,msg:tkm});if(tkr.status==='new')tkr.status='work';logAct(who,'комментарий к тикету '+id);} openTicket(id); break;
  case 'ticket-assign': var tka=DATA.tickets.find(function(x){return x.id===id;}); if(tka){tka.assignee=who;if(tka.status==='new')tka.status='work';logAct(who,'тикет '+id+' назначен на '+who);} openTicket(id); break;
  case 'ticket-close': var tk2=DATA.tickets.find(function(x){return x.id===id;}); if(tk2){tk2.status='done';logAct(who,'закрыт тикет '+id);} closeDrawer();go();toast('Тикет закрыт'); break;
  case 'content-pub': logAct(who,'опубликован раздел «'+a.getAttribute('data-name')+'»');toast('Опубликовано: «'+a.getAttribute('data-name')+'» (пересборка build.py)'); break;
  case 'content-edit': openContentEditor(a.getAttribute('data-name')); break;
  case 'content-save': var cn=a.getAttribute('data-name'),cv=val('cedit'); DATA.content=DATA.content||{}; DATA.content[cn]=cv; logAct(who,'обновлён и опубликован раздел «'+cn+'»'); closeDrawer();go();toast('Опубликовано: «'+cn+'» (в боевой версии — пересборка build.py)'); break;
  case 'fin-report': state.finView='report';go(); break;
  case 'fin-list': state.finView='list';go(); break;
  case 'csv-invoices': csvInvoices();logAct(who,'выгрузка реестра счетов (CSV)');toast('Счета выгружены в CSV'); break;
  case 'csv-registry': csvRegistry();logAct(who,'выгрузка реестра доходов с заказчиками — '+paidLeads().length+' позиций (CSV)');toast('Реестр доходов выгружен (CSV)'); break;
  case 'csv-737': logAct(who,'выгрузка для ф. 0503737');toast('Данные подготовлены для ф. 0503737'); break;
  case 'toast': toast(a.getAttribute('data-msg')); break;
  case 'hol-add': holForm(null); break;
  case 'hol-up': if(moveHolidayStep(id,-1)){logAct(who,'праздник поднят');go();toast('Порядок обновлён');} break;
  case 'hol-down': if(moveHolidayStep(id,1)){logAct(who,'праздник опущен');go();toast('Порядок обновлён');} break;
  case 'hol-icon-reset': holIconData=null; var fir=document.getElementById('hIconFile'); if(fir)fir.value=''; document.getElementById('hIcon').value='ico-cake'; renderHolPreview(); toast('Иконка — из списка'); break;
  case 'hol-edit': holForm(id); break;
  case 'hol-prev': window.open('../index.html?prazdnik='+id,'_blank'); break;
  case 'hol-toggle': var hh=DATA.holidays.find(function(x){return x.key===id;}); if(hh){hh.enabled=(hh.enabled===false);logAct(who,(hh.enabled?'включён':'выключен')+' праздник «'+hh.name+'»');} go(); toast(hh&&hh.enabled?'Праздник включён':'Праздник выключен'); break;
  case 'hol-del': { var hidx=DATA.holidays.findIndex(function(x){return x.key===id;}); if(hidx<0)break; var hsnap=DATA.holidays[hidx]; if(!confirm('Удалить праздник «'+hsnap.name+'»? Баннер перестанет показываться на сайте.'))break; DATA.holidays.splice(hidx,1); logAct(who,'удалён праздник «'+hsnap.name+'»'); closeDrawer(); go(); toast._undo=function(){DATA.holidays.splice(Math.min(hidx,DATA.holidays.length),0,hsnap); go(); toast('Удаление отменено');}; toast('Праздник «'+hsnap.name+'» удалён','Отменить'); break; }
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
 if(e.target.id==='roleSel'){state.role=e.target.value;state.mod=ROLES[state.role].menu[0];state.finView='list';logAct(ROLES[state.role].who,'переключение роли: «'+ROLES[state.role].label+'»');go();}
 if(e.target.id==='uTypeSel'){state.uType=e.target.value;go();}
 if(e.target.id==='hType'){var r=document.getElementById('hDateRow'); if(r)r.style.display=(e.target.value==='oct3sun')?'none':'';}
 if(e.target.id==='hIcon'){holIconData=null;}
 if(e.target.id==='hIconFile'){var f=e.target.files&&e.target.files[0]; if(f){if(f.size>400000)toast('Иконку лучше до ~300 КБ'); var rd=new FileReader(); rd.onload=function(){holIconData=rd.result; renderHolPreview();}; rd.readAsDataURL(f);}}
 if(document.getElementById('holPrev')) renderHolPreview();
});
document.addEventListener('input',function(e){
 if(document.getElementById('holPrev')) renderHolPreview();
 if(e.target.id==='cedit'){var cp=document.getElementById('cprev'); if(cp)cp.textContent=e.target.value;}
 if(e.target.id==='globalSearch'){var q=e.target.value.trim().toLowerCase();
  document.querySelectorAll('.content .lead').forEach(function(el){el.style.display=(!q||el.textContent.toLowerCase().indexOf(q)>-1)?'':'none';});
  document.querySelectorAll('.content table.tbl tr').forEach(function(tr){ if(tr.querySelector('th'))return; tr.style.display=(!q||tr.textContent.toLowerCase().indexOf(q)>-1)?'':'none';});
 }
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){closeDrawer();return;}
 if(e.key==='Enter'||e.key===' '){var t=e.target; if(t&&t.matches&&t.matches('a[data-mod],[data-lead]')){e.preventDefault();t.click();}}
});

// drag-and-drop сортировка карточек праздников
var dragKey=null;
function clearDnd(){var l=document.querySelectorAll('.holcard.dragging,.holcard.drag-over');for(var i=0;i<l.length;i++){l[i].classList.remove('dragging');l[i].classList.remove('drag-over');}}
document.addEventListener('dragstart',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c)return; dragKey=c.getAttribute('data-id'); c.classList.add('dragging'); try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragKey);}catch(_){}});
document.addEventListener('dragover',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c||!dragKey)return; e.preventDefault(); try{e.dataTransfer.dropEffect='move';}catch(_){} var l=document.querySelectorAll('.holcard.drag-over'); for(var i=0;i<l.length;i++)if(l[i]!==c)l[i].classList.remove('drag-over'); if(c.getAttribute('data-id')!==dragKey)c.classList.add('drag-over');});
document.addEventListener('drop',function(e){var c=e.target.closest&&e.target.closest('.holcard'); if(!c||!dragKey)return; e.preventDefault(); var toKey=c.getAttribute('data-id'); if(toKey!==dragKey){var r=c.getBoundingClientRect(); var after=e.clientY>(r.top+r.height/2); moveHoliday(dragKey,toKey,after); var who=state.role?ROLES[state.role].who:'—'; logAct(who,'изменён порядок праздников'); dragKey=null; clearDnd(); go(); toast('Порядок обновлён');} else {dragKey=null; clearDnd();}});
document.addEventListener('dragend',function(){dragKey=null; clearDnd();});

// drag-and-drop заявок между колонками канбана
var dragLead=null;
function clearLeadDnd(){document.querySelectorAll('.kcol.drop-target,.lead.dragging').forEach(function(x){x.classList.remove('drop-target');x.classList.remove('dragging');});}
document.addEventListener('dragstart',function(e){var c=e.target.closest&&e.target.closest('.lead[draggable="true"]'); if(!c)return; dragLead=c.getAttribute('data-lead'); c.classList.add('dragging'); try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragLead);}catch(_){}});
document.addEventListener('dragover',function(e){var col=e.target.closest&&e.target.closest('.kcol'); if(!col||!dragLead)return; e.preventDefault(); document.querySelectorAll('.kcol.drop-target').forEach(function(x){if(x!==col)x.classList.remove('drop-target');}); col.classList.add('drop-target');});
document.addEventListener('drop',function(e){var col=e.target.closest&&e.target.closest('.kcol'); if(!col||!dragLead)return; e.preventDefault(); var ns=col.getAttribute('data-status'),id=dragLead; dragLead=null; clearLeadDnd(); if(ns)dragSetStatus(id,ns);});
document.addEventListener('dragend',function(){dragLead=null; clearLeadDnd();});

try{ if(localStorage.getItem('wniikp_admin_vi')==='1') document.body.classList.add('vi'); }catch(_){}
var _rp=(location.search.match(/[?&]role=([a-z_]+)/)||[])[1];
if(_rp&&ROLES[_rp]){state.role=_rp;go();} else { renderLogin(); }
})();
