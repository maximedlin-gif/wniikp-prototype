/* ВНИИКП прототип — интерактив */

// ---- фирменный набор иконок (внедряемый SVG-спрайт) ----
(function(){
  var S='<symbol id="ico-spark" viewBox="0 0 24 24"><path d="M12 3.5 13.7 9 19 10.5 13.7 12 12 17.5 10.3 12 5 10.5 10.3 9z"/></symbol>'+
  '<symbol id="ico-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>'+
  '<symbol id="ico-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v5.5L5.2 17A2 2 0 0 0 7 20h10a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.7 14h8.6"/></symbol>'+
  '<symbol id="ico-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/></symbol>'+
  '<symbol id="ico-choc" viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M5 9h14M5 14.5h14M12 3.5v17"/></symbol>'+
  '<symbol id="ico-cookie" viewBox="0 0 24 24"><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5 3 3 0 0 1-3-3 2.4 2.4 0 0 1-2.6-2.6A3 3 0 0 1 12 3.5z"/><circle cx="9.5" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="13.5" cy="13.5" r=".9" fill="currentColor" stroke="none"/><circle cx="14.5" cy="9.5" r=".7" fill="currentColor" stroke="none"/></symbol>'+
  '<symbol id="ico-candy" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.3"/><path d="M8.2 10.2 3.5 8v8l4.7-2.2M15.8 10.2 20.5 8v8l-4.7-2.2"/></symbol>'+
  '<symbol id="ico-drop" viewBox="0 0 24 24"><path d="M12 3.5s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 12 3.5 12 3.5z"/></symbol>'+
  '<symbol id="ico-atom" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></symbol>'+
  '<symbol id="ico-microbe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/><path d="M12 6V3.2M12 20.8V18M6 12H3.2M20.8 12H18M7.8 7.8 6 6M18 18l-1.8-1.8M16.2 7.8 18 6M6 18l1.8-1.8"/><circle cx="10.4" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="13.4" cy="13.2" r=".9" fill="currentColor" stroke="none"/></symbol>'+
  '<symbol id="ico-doc" viewBox="0 0 24 24"><path d="M13.5 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5z"/><path d="M13.5 3v4.5H18M9 13h6M9 16.5h6"/></symbol>'+
  '<symbol id="ico-cap" viewBox="0 0 24 24"><path d="M2.5 9 12 5l9.5 4-9.5 4z"/><path d="M6.5 11v4.6c0 1.1 2.5 2.4 5.5 2.4s5.5-1.3 5.5-2.4V11"/><path d="M21.5 9.2v4.8"/></symbol>'+
  '<symbol id="ico-scan" viewBox="0 0 24 24"><path d="M4 8.5V5.5A1.5 1.5 0 0 1 5.5 4H8.5M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6"/></symbol>'+
  '<symbol id="ico-scales" viewBox="0 0 24 24"><path d="M12 3.5v17M7.5 20.5h9M5.5 7.5h13M12 4 6 7M12 4l6 3"/><path d="M5.5 7.5 3 13.2a3 3 0 0 0 5 0zM18.5 7.5 16 13.2a3 3 0 0 0 5 0z"/></symbol>'+
  '<symbol id="ico-launch" viewBox="0 0 24 24"><path d="M12 3.5c2.8 1.6 4.6 4.8 4.6 8.6l-2.3 2.4H9.7L7.4 12.1C7.4 8.3 9.2 5.1 12 3.5z"/><circle cx="12" cy="9.5" r="1.5"/><path d="M9.5 16 8 20M14.5 16 16 20"/></symbol>'+
  '<symbol id="ico-swap" viewBox="0 0 24 24"><path d="M4 8.5h13l-3.2-3.2M20 15.5H7l3.2 3.2"/></symbol>'+
  '<symbol id="ico-building" viewBox="0 0 24 24"><path d="M3 10 12 5l9 5"/><path d="M5 10v9M9 10v9M12 10v9M15 10v9M19 10v9M3 21h18"/></symbol>'+
  '<symbol id="ico-ruler" viewBox="0 0 24 24"><rect x="2.5" y="8" width="19" height="8" rx="1"/><path d="M6.5 8v3M10 8v4M13.5 8v3M17.5 8v4"/></symbol>'+
  '<symbol id="ico-pin" viewBox="0 0 24 24"><path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.3" r="2.4"/></symbol>'+
  '<symbol id="ico-phone" viewBox="0 0 24 24"><path d="M6 3.5h3l1.8 4.5-2.3 1.4a11 11 0 0 0 5.1 5.1l1.4-2.3 4.5 1.8v3A2 2 0 0 1 18.4 22 16 16 0 0 1 4 5.6 2 2 0 0 1 6 3.5z"/></symbol>'+
  '<symbol id="ico-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.6 6.5 12 12.8l8.4-6.3"/></symbol>'+
  '<symbol id="ico-accessibility" viewBox="0 0 24 24"><circle cx="12" cy="4.4" r="1.7"/><path d="M4.8 8.5h14.4M12 8.5v6.5M12 15l-3.2 6.5M12 15l3.2 6.5"/></symbol>'+
  '<symbol id="ico-calendar" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15.5" rx="2"/><path d="M4 9.5h16M8.5 3v4M15.5 3v4"/></symbol>'+
  '<symbol id="ico-ruble" viewBox="0 0 24 24"><path d="M8.5 20.5V4.5h4.8a4 4 0 0 1 0 8H6"/><path d="M6 16.5h7.5"/></symbol>'+
  '<symbol id="ico-upload" viewBox="0 0 24 24"><path d="M12 16V4.5M8 8l4-4 4 4"/><path d="M5 15.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-3.5"/></symbol>'+
  '<symbol id="ico-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/></symbol>'+
  '<symbol id="ico-warning" viewBox="0 0 24 24"><path d="M12 4 21 20H3z"/><path d="M12 10v4.5M12 17.4h.01"/></symbol>'+
  '<symbol id="ico-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.3"/><path d="M12 11v5.2M12 7.8h.01"/></symbol>'+
  '<symbol id="ico-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.4l2.6 2.6L16 9.2"/></symbol>'+
  '<symbol id="ico-book" viewBox="0 0 24 24"><path d="M12 6c-2-1.3-4.5-1.5-7-1v12c2.5-.5 5-.3 7 1 2-1.3 4.5-1.5 7-1V5c-2.5-.5-5-.3-7 1z"/><path d="M12 6v13"/></symbol>'+
  '<symbol id="ico-download" viewBox="0 0 24 24"><path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 18v1.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V18"/></symbol>'+
  '<symbol id="ico-chat" viewBox="0 0 24 24"><rect x="3.5" y="6.5" width="17" height="12" rx="3"/><path d="M12 3.3V6.5"/><circle cx="9" cy="12.5" r="1.2"/><circle cx="15" cy="12.5" r="1.2"/><path d="M2 12v2.4M22 12v2.4"/></symbol>'+
  '<symbol id="ico-send" viewBox="0 0 24 24"><path d="M4.5 12L20 5l-6.5 15-2.7-6.3z"/><path d="M11 13.7L20 5"/></symbol>'+
  '<symbol id="ico-cake" viewBox="0 0 24 24"><path d="M3.5 20.5h17"/><path d="M5 20.5v-7.3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7.3"/><path d="M5 14.6c1.4 1.1 2.6 1.1 4 0s2.6-1.1 4 0 2.6 1.1 4 0 2-1 2-1"/><path d="M12 8.4V6"/><circle cx="12" cy="4.5" r="1.05"/></symbol>'+
  '<symbol id="ico-cookie" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="9.4" cy="10" r="1"/><circle cx="14.6" cy="9.4" r="1"/><circle cx="13.6" cy="14" r="1"/><circle cx="9" cy="14.6" r="1"/></symbol>'+
  '<symbol id="ico-chocolate" viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="1.6"/><path d="M5 9h14M5 14.5h14M12 3.5v17"/></symbol>'+
  '<symbol id="ico-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></symbol>'+
  '<symbol id="ico-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></symbol>';
  var wrap=document.createElement('div');
  wrap.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+S+'</svg>';
  document.body.insertBefore(wrap,document.body.firstChild);
  // перепривязываем <use>, которые могли быть распарсены до вставки спрайта
  document.querySelectorAll('use').forEach(function(u){
    var h=u.getAttribute('href')||u.getAttribute('xlink:href');
    if(h){u.setAttribute('href',h);}
  });
})();

// ---- мобильное меню ----
document.addEventListener('click', e=>{
  if(e.target.closest('.burger')){
    document.querySelector('.nav')?.classList.toggle('open');
  }
});

// ---- версия для слабовидящих (ГОСТ Р 52872) ----
(function(){
  var KEY='wniikp-vi';
  var def={on:false,size:2,sch:'bw',img:'on',ls:0};
  var st=def;
  try{ st=Object.assign({},def,JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){}

  var bar=document.createElement('div');
  bar.className='vi-bar';
  bar.setAttribute('role','region');
  bar.setAttribute('aria-label','Настройки отображения для слабовидящих');
  bar.innerHTML=''+
    '<div class="vi-wrap">'+
      '<span class="vi-grp"><b>Размер</b>'+
        '<button data-vi="size:1" aria-label="Обычный размер">А</button>'+
        '<button data-vi="size:2" aria-label="Крупный размер">А+</button>'+
        '<button data-vi="size:3" aria-label="Очень крупный размер">А++</button></span>'+
      '<span class="vi-grp"><b>Цвет</b>'+
        '<button class="vi-sw vi-bw" data-vi="sch:bw" aria-label="Чёрным по белому">Б</button>'+
        '<button class="vi-sw vi-wb" data-vi="sch:wb" aria-label="Белым по чёрному">Ч</button>'+
        '<button class="vi-sw vi-blue" data-vi="sch:blue" aria-label="Тёмно-синим по голубому">С</button>'+
        '<button class="vi-sw vi-beige" data-vi="sch:beige" aria-label="Коричневым по бежевому">К</button></span>'+
      '<span class="vi-grp"><b>Изображения</b>'+
        '<button data-vi="img:on">Вкл</button>'+
        '<button data-vi="img:off">Выкл</button></span>'+
      '<span class="vi-grp"><b>Интервал</b>'+
        '<button data-vi="ls:0">Обычный</button>'+
        '<button data-vi="ls:1">Большой</button></span>'+
      '<button class="vi-off" data-vi="off">Обычная версия ✕</button>'+
    '</div>';
  document.body.insertBefore(bar, document.body.firstChild);

  function apply(){
    var c=document.body.classList;
    c.toggle('vi', st.on);
    ['1','2','3'].forEach(function(s){c.remove('vi-sz-'+s);});
    ['bw','wb','blue','beige'].forEach(function(s){c.remove('vi-sch-'+s);});
    if(st.on){ c.add('vi-sz-'+st.size); c.add('vi-sch-'+st.sch); }
    c.toggle('vi-noimg', st.on && st.img==='off');
    c.toggle('vi-ls', st.on && st.ls===1);
    bar.querySelectorAll('button[data-vi]').forEach(function(b){
      var v=b.getAttribute('data-vi');
      b.classList.toggle('on', v==='size:'+st.size||v==='sch:'+st.sch||v==='img:'+st.img||v==='ls:'+st.ls);
    });
    try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){}
  }

  document.addEventListener('click', function(e){
    if(e.target.closest('.a11y-toggle')){ st.on=true; apply(); window.scrollTo(0,0); return; }
    var b=e.target.closest('.vi-bar button[data-vi]');
    if(!b) return;
    var v=b.getAttribute('data-vi');
    if(v==='off'){ st.on=false; apply(); return; }
    var p=v.split(':');
    if(p[0]==='size') st.size=+p[1];
    else if(p[0]==='sch') st.sch=p[1];
    else if(p[0]==='img') st.img=p[1];
    else if(p[0]==='ls') st.ls=+p[1];
    apply();
  });

  apply();
})();

// ---- фильтр каталога услуг ----
(function(){
  const chips=document.querySelectorAll('.filters .chip');
  if(!chips.length) return;
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f=chip.dataset.filter;
    document.querySelectorAll('.cat').forEach(cat=>{
      cat.style.display = (f==='all'||cat.dataset.group===f)?'':'none';
    });
  }));
})();

// ---- демонстрационный анализ пористости (КТ-морфометрия) ----
(function(){
  const root=document.getElementById('ctdemo');
  if(!root) return;

  const srcCanvas=document.getElementById('ct-src');
  const outCanvas=document.getElementById('ct-out');
  const fileInput=document.getElementById('ct-file');
  const sampleBtn=document.getElementById('ct-sample');
  const sCtx=srcCanvas.getContext('2d');
  const oCtx=outCanvas.getContext('2d');
  const SIZE=300;
  srcCanvas.width=srcCanvas.height=SIZE;
  outCanvas.width=outCanvas.height=SIZE;

  function setStat(id,val){const el=document.getElementById(id); if(el) el.textContent=val;}

  // генератор синтетического «среза» пористого изделия
  function drawSample(){
    sCtx.fillStyle='#cdbfa6'; sCtx.fillRect(0,0,SIZE,SIZE); // матрица (тесто)
    // круглая область образца
    sCtx.save();
    sCtx.beginPath();sCtx.arc(SIZE/2,SIZE/2,SIZE/2-8,0,7);sCtx.clip();
    sCtx.fillStyle='#b7a587';sCtx.fillRect(0,0,SIZE,SIZE);
    // поры (тёмные пустоты) — детерминированно, без Math.random
    let seed=20260604;
    const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
    const n=90;
    for(let i=0;i<n;i++){
      const x=rnd()*SIZE, y=rnd()*SIZE, r=2+rnd()*rnd()*16;
      const g=sCtx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,'#1a140c');g.addColorStop(.7,'#2c2418');g.addColorStop(1,'rgba(120,105,80,0)');
      sCtx.fillStyle=g;sCtx.beginPath();sCtx.arc(x,y,r,0,7);sCtx.fill();
    }
    sCtx.restore();
    analyze();
  }

  function loadFile(file){
    const img=new Image();
    img.onload=()=>{
      // вписываем с покрытием
      const s=Math.max(SIZE/img.width,SIZE/img.height);
      const w=img.width*s,h=img.height*s;
      sCtx.fillStyle='#000';sCtx.fillRect(0,0,SIZE,SIZE);
      sCtx.drawImage(img,(SIZE-w)/2,(SIZE-h)/2,w,h);
      analyze();
    };
    img.src=URL.createObjectURL(file);
  }

  // порог Оцу по гистограмме яркости
  function otsu(gray){
    const hist=new Array(256).fill(0);
    for(let i=0;i<gray.length;i++) hist[gray[i]]++;
    const total=gray.length;
    let sum=0; for(let i=0;i<256;i++) sum+=i*hist[i];
    let sumB=0,wB=0,maxVar=-1,thr=128;
    for(let t=0;t<256;t++){
      wB+=hist[t]; if(wB===0) continue;
      const wF=total-wB; if(wF===0) break;
      sumB+=t*hist[t];
      const mB=sumB/wB, mF=(sum-sumB)/wF;
      const v=wB*wF*(mB-mF)*(mB-mF);
      if(v>maxVar){maxVar=v;thr=t;}
    }
    return thr;
  }

  function analyze(){
    const img=sCtx.getImageData(0,0,SIZE,SIZE);
    const d=img.data, N=SIZE*SIZE;
    const gray=new Uint8Array(N);
    // круглая ROI — считаем только образец
    const cx=SIZE/2, cy=SIZE/2, R=SIZE/2-8;
    const inRoi=new Uint8Array(N);
    let roiCount=0;
    for(let p=0,i=0;p<N;p++,i+=4){
      gray[p]=(d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114)|0;
      const x=p%SIZE, y=(p/SIZE)|0;
      if((x-cx)*(x-cx)+(y-cy)*(y-cy)<=R*R){inRoi[p]=1;roiCount++;}
    }
    // Оцу по пикселям ROI
    const roiGray=new Uint8Array(roiCount);
    for(let p=0,k=0;p<N;p++) if(inRoi[p]) roiGray[k++]=gray[p];
    const thr=otsu(roiGray);

    // бинаризация: поры = тёмное (ниже порога)
    const pore=new Uint8Array(N);
    let poreCount=0;
    for(let p=0;p<N;p++){ if(inRoi[p]&&gray[p]<thr){pore[p]=1;poreCount++;} }

    // связные компоненты (поры) — BFS, 4-связность
    const lab=new Int32Array(N).fill(0);
    const sizes=[];
    const stack=new Int32Array(N);
    let comp=0;
    for(let p=0;p<N;p++){
      if(pore[p]&&!lab[p]){
        comp++; let sp=0; stack[sp++]=p; lab[p]=comp; let sz=0;
        while(sp){
          const q=stack[--sp]; sz++;
          const x=q%SIZE, y=(q/SIZE)|0;
          if(x>0){const r=q-1; if(pore[r]&&!lab[r]){lab[r]=comp;stack[sp++]=r;}}
          if(x<SIZE-1){const r=q+1; if(pore[r]&&!lab[r]){lab[r]=comp;stack[sp++]=r;}}
          if(y>0){const r=q-SIZE; if(pore[r]&&!lab[r]){lab[r]=comp;stack[sp++]=r;}}
          if(y<SIZE-1){const r=q+SIZE; if(pore[r]&&!lab[r]){lab[r]=comp;stack[sp++]=r;}}
        }
        if(sz>=3) sizes.push(sz); // отсекаем шум
      }
    }

    const porosity=poreCount/roiCount*100;
    const nPores=sizes.length;
    const avg=nPores?sizes.reduce((a,b)=>a+b,0)/nPores:0;
    // эквивалентный диаметр, условные «мм» при демо-масштабе 0.05 мм/пиксель
    const px2mm=0.05;
    const avgDmm=2*Math.sqrt(avg/Math.PI)*px2mm;
    const maxDmm=nPores?2*Math.sqrt(Math.max(...sizes)/Math.PI)*px2mm:0;

    // визуализация: матрица серым, поры — янтарём
    const out=oCtx.createImageData(SIZE,SIZE);
    const od=out.data;
    for(let p=0,i=0;p<N;p++,i+=4){
      if(!inRoi[p]){od[i]=od[i+1]=od[i+2]=8;od[i+3]=255;continue;}
      if(pore[p]){od[i]=224;od[i+1]=138;od[i+2]=30;}
      else{const g=gray[p];od[i]=od[i+1]=od[i+2]=g;}
      od[i+3]=255;
    }
    oCtx.putImageData(out,0,0);

    // гистограмма размеров пор (по экв. диаметру)
    const bins=new Array(12).fill(0);
    const maxd=Math.max(maxDmm,0.6);
    sizes.forEach(s=>{const d2=2*Math.sqrt(s/Math.PI)*px2mm;let b=Math.min(11,Math.floor(d2/maxd*12));bins[b]++;});
    const maxBin=Math.max(...bins,1);
    const hist=document.getElementById('ct-hist');
    if(hist){hist.innerHTML=bins.map(b=>`<div class="bar" style="height:${(b/maxBin*100)|0}%"></div>`).join('');}

    setStat('ct-porosity', porosity.toFixed(1)+' %');
    setStat('ct-count', nPores.toLocaleString('ru-RU'));
    setStat('ct-avg', avgDmm.toFixed(2)+' мм');
    setStat('ct-max', maxDmm.toFixed(2)+' мм');
    setStat('ct-thr', thr);
  }

  fileInput?.addEventListener('change',e=>{const f=e.target.files[0]; if(f) loadFile(f);});
  sampleBtn?.addEventListener('click',drawSample);
  drawSample(); // стартуем с примера
})();

// ---- формы заявок: согласие на ПДн + экран благодарности (без alert) ----
(function(){
  document.querySelectorAll('form.lead-form').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      // нативная валидация (required-поля и обязательный чекбокс согласия) уже пройдена
      f.innerHTML = '<div class="form-success">'+
        '<svg class="ic" aria-hidden="true"><use href="#ico-check"></use></svg>'+
        '<h4>Заявка отправлена</h4>'+
        '<p>Спасибо! Мы свяжемся с вами в течение рабочего дня.</p>'+
        '<p class="form-note">Прототип: в боевой версии заявка уходит в Bitrix24 института.</p>'+
        '</div>';
    });
  });
})();

// ---- электронная библиотека: фильтр + кнопки (скачать/купить) ----
(function(){
  var grid=document.querySelector('.book-grid'); if(!grid) return;
  var chips=document.querySelectorAll('.bib-filters .chip');
  chips.forEach(function(c){ c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('active');}); c.classList.add('active');
    var f=c.getAttribute('data-filter');
    document.querySelectorAll('.book').forEach(function(b){
      var show = f==='all' || b.getAttribute('data-paid')===f || b.getAttribute('data-type')===f;
      b.style.display = show ? '' : 'none';
    });
  }); });
  var t=document.createElement('div');
  t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#15202b;color:#fff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:.22s;z-index:200;max-width:90vw;text-align:center';
  document.body.appendChild(t); var tm;
  function toast(m){t.textContent=m;t.style.opacity='1';t.style.transform='translate(-50%,0)';clearTimeout(tm);tm=setTimeout(function(){t.style.opacity='0';t.style.transform='translate(-50%,20px)';},2800);}
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-lib]'); if(!b) return; e.preventDefault();
    toast(b.getAttribute('data-lib')==='free' ? 'Скачивание — демо: файл подставит институт' : 'Покупка «'+b.getAttribute('data-title')+'» — демо. Оплата через институт (доход от платных услуг).');
  });
})();

// ---- ИИ-консультант (прототип: ответы по базе знаний сайта, без бэкенда) ----
(function(){
  if(document.querySelector('.assistant-fab')) return;
  var KB=[
    {kw:['срок','годност','хранен','просрочк','180','полк'],a:'Институт обосновывает и подтверждает <b>срок годности</b> испытаниями по МУК 4.2.1847-04 и профильным ГОСТ — с контролем порчи жиров, активности воды и микробиологии. На выходе — протокол и заключение на бланке института (принимают торговые сети и контролёры).',link:['Подробнее об услуге','usluga-srok-godnosti.html']},
    {kw:['кт','томограф','структур','пористост','морфометр','пор','бисквит','мякиш','воздушн','разрез'],a:'<b>КТ-морфометрия</b> — неразрушающий контроль структуры: пористость, размер и распределение пор, плотность — без разрезания образца. Удобно объективно сравнивать «до/после» при смене рецептуры. На странице есть рабочий расчётный модуль.',link:['Открыть КТ-контроль','kt-morfometriya.html']},
    {kw:['обуч','семинар','курс','повышен','квалифик','ремесл','школа','учеб','диплом','удостовер'],a:'Есть <b>семинары повышения квалификации</b> для предприятий и <b>«Ремесленная школа»</b> для малых производителей (органолептика и дефекты, сроки годности, маркировка, контроль сырья) — от 6 000 ₽. Обучение по лицензии института.',link:['Программы обучения','obuchenie.html']},
    {kw:['книг','библиотек','издани','монограф','журнал','методич','скачат','литератур','справочник','сборник','пособ'],a:'В <b>электронной библиотеке</b> — монографии, методические пособия, сборники конференций и журнал «Пищевые системы». Часть изданий бесплатна, часть — платно.',link:['Открыть библиотеку','biblioteka.html']},
    {kw:['рекламац','претенз','спор','арбитраж','прогорк','вернул','брак','конфликт','независим'],a:'При споре с сетью или контролёром институт даёт <b>независимое заключение</b>: экспертная органолептика по ГОСТ + физико-химия (перекисное и кислотное числа и др.).',link:['Решения для бизнеса','resheniya.html#reklamaciya']},
    {kw:['сырь','жир','аналог','замен','поставщик','импортозамещ','какао','мук','глазур'],a:'Если ушёл поставщик — подберём <b>аналог сырья</b> без потери качества: анализ состава, сравнительные испытания «старое vs новое», консультация технолога.',link:['Замена сырья','resheniya.html#syrye']},
    {kw:['шоколад','экспертиз','масла какао','идентифик','эквивалент','подлинн','фальсиф','дисперсн','измельчен','плитк','заменител'],a:'<b>Экспертиза и идентификация шоколада и какао</b>: подтверждаем подлинность, выявляем замену масла какао эквивалентами по жирнокислотному составу, проверяем дисперсность — по ГОСТ 31721. Заключение для маркировки, тендеров и споров с поставщиком.',link:['Экспертиза шоколада','usluga-ekspertiza-shokolada.html']},
    {kw:['микробиолог','кмафанм','плесен','дрожж','бгкп','патоген','сальмонелл','бактери','посев','плесневен'],a:'<b>Микробиологические испытания</b> кондитерских изделий по ГОСТ и ТР ТС 021: КМАФАнМ, дрожжи и плесени, БГКП, патогенные — для выпуска партии, обоснования срока годности и разбора рекламаций.',link:['Микробиология','usluga-mikrobiologiya.html']},
    {kw:['перекисн','кислотн','анизидин','totox','окислен','порч','свежест','прогоркл'],a:'<b>Контроль порчи жиров</b>: перекисное, кислотное и анизидиновое число, TOTOX — оценка свежести и окисления жировой фазы для срока годности и разбора прогорклости. По ГОСТ 26593.',link:['Контроль порчи жиров','usluga-porcha-zhirov.html']},
    {kw:['маркировк','этикетк','бжу','калорийн','пищев','ценност на','состав продукт'],a:'<b>Пищевая ценность и маркировка</b>: расчёт и подтверждение БЖУ и калорийности для этикетки, проверка маркировки на соответствие ТР ТС 022 — чтобы не получить штраф и претензии сетей.',link:['Маркировка и БЖУ','usluga-markirovka.html']},
    {kw:['печень','пряник','вафл','намокаем','мучн','галет','крекер','затяжн'],a:'<b>Испытания мучных кондитерских изделий</b> (печенье, пряники, вафли): влага, массовая доля жира, намокаемость, прочность, органолептика — по ГОСТ. Для контроля партии и рекламаций.',link:['Мучные изделия','usluga-mucnye.html']},
    {kw:['услуг','испытан','анализ','лаборатор','помож','что вы','что делает','перечень','каталог','показател'],a:'Институт проводит <b>испытания и экспертизу кондитерской продукции</b>: физико-химия, микробиология, органолептика, идентификация, сроки годности, КТ-контроль структуры, разработку ТУ/ТИ и обучение. По частым задачам есть отдельные страницы услуг.',link:['Каталог услуг','uslugi.html']},
    {kw:['заказ','заявк','как нач','оставить','обрат','оформ','начать'],a:'Чтобы заказать — оставьте заявку (имя, контакт, продукт и задача), специалист ответит в рабочий день. Или позвоните: <a href="tel:+74959636535">+7 (495) 963-65-35</a>.',link:['Оставить заявку','index.html#zayavka']},
    {kw:['цена','стоимост','скольк сто','прайс','бюджет','деньг','тариф','дорог'],a:'Стоимость зависит от продукта и программы испытаний — назовём после описания задачи. Ориентиры есть на страницах услуг (в прототипе помечены как иллюстративные). Точную цену рассчитаем по заявке.',link:['Рассчитать по заявке','index.html#zayavka']},
    {kw:['контакт','телефон','почт','адрес','email','позвон','связ','где наход','часы','режим','график'],a:'<b>Контакты:</b> <a href="tel:+74959636535">+7 (495) 963-65-35</a>, <a href="mailto:conditerprom@mail.ru">conditerprom@mail.ru</a>. Адрес: 107023, Москва, ул. Электрозаводская, 20 стр. 3. Режим: Пн–чт 10:00–18:30, пт до 17:30.'},
    {kw:['аккредит','аттестат','росаккред','область аккред'],a:'Институт выполняет испытания и выдаёт заключения. Об области аккредитации испытательного центра и форме итогового документа под вашу задачу лучше уточнить напрямую — подскажет специалист.',link:['Спросить специалиста','index.html#zayavka']}
  ];
  var GREET='Здравствуйте! Я ИИ-консультант ВНИИКП. Помогу разобраться в услугах, обучении и изданиях института. Спросите своими словами или выберите тему ниже.';
  var SUGG=['Экспертиза шоколада?','Как обосновать срок годности?','Микробиология партии?','Что такое КТ-морфометрия?','Сколько стоит обучение?','Как заказать услугу?'];
  function answer(text){
    var t=text.toLowerCase(), best=null, score=0;
    KB.forEach(function(e){var s=0;e.kw.forEach(function(k){if(t.indexOf(k)>-1)s++;});if(s>score){score=s;best=e;}});
    if(!best) return {a:'Я отвечаю по базе знаний сайта и не уверен в точном ответе. Лучше всего — оставить заявку, специалист института ответит точно. Или позвоните: <a href="tel:+74959636535">+7 (495) 963-65-35</a>.',link:['Оставить заявку','index.html#zayavka']};
    return best;
  }
  var fab=document.createElement('button');
  fab.className='assistant-fab'; fab.type='button'; fab.setAttribute('aria-label','Открыть ИИ-консультанта');
  fab.innerHTML='<svg class="ic" aria-hidden="true"><use href="#ico-chat"></use></svg><span>Консультант</span>';
  var panel=document.createElement('div'); panel.className='assistant-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','ИИ-консультант ВНИИКП');
  panel.innerHTML=
    '<div class="as-head"><svg class="ic" aria-hidden="true"><use href="#ico-chat"></use></svg><div class="as-tt"><div class="t">ИИ-консультант</div><div class="s">ВНИИ кондитерской промышленности</div></div><button class="x" type="button" aria-label="Закрыть">×</button></div>'+
    '<div class="as-note">Прототип — отвечает по базе знаний сайта. В боевой версии — ИИ с актуальными данными института.</div>'+
    '<div class="as-body" id="asBody"></div>'+
    '<div class="as-chips" id="asChips"></div>'+
    '<form class="as-foot" id="asForm"><input id="asInput" placeholder="Напишите вопрос…" autocomplete="off"><button type="submit" aria-label="Отправить"><svg class="ic" aria-hidden="true"><use href="#ico-send"></use></svg></button></form>';
  document.body.appendChild(fab); document.body.appendChild(panel);
  var body=panel.querySelector('#asBody'), chipsBox=panel.querySelector('#asChips');
  function add(html,who){var m=document.createElement('div');m.className='as-msg '+who;m.innerHTML=html;body.appendChild(m);body.scrollTop=body.scrollHeight;return m;}
  function botAnswer(e){var html=e.a;if(e.link)html+='<div class="as-ctawrap"><a class="as-cta" href="'+e.link[1]+'">'+e.link[0]+' →</a></div>';add(html,'bot');}
  function ask(text){add(text.replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];}),'user');var th=add('<span class="as-typing">●●●</span>','bot');setTimeout(function(){th.remove();botAnswer(answer(text));},450);}
  function chips(){chipsBox.innerHTML='';SUGG.forEach(function(q){var c=document.createElement('button');c.type='button';c.className='as-chip';c.textContent=q;c.onclick=function(){ask(q);};chipsBox.appendChild(c);});}
  var opened=false;
  function open(){panel.classList.add('open');fab.style.display='none';if(!opened){opened=true;add(GREET,'bot');chips();}setTimeout(function(){panel.querySelector('#asInput').focus();},60);}
  function close(){panel.classList.remove('open');fab.style.display='';}
  fab.onclick=open; panel.querySelector('.x').onclick=close;
  panel.querySelector('#asForm').addEventListener('submit',function(ev){ev.preventDefault();var i=panel.querySelector('#asInput');var v=i.value.trim();if(!v)return;i.value='';ask(v);});
})();

// ---- Праздничный баннер кондитерской отрасли (данные из holidays.json — управляются в админке) ----
(function(){
  function thirdSundayOct(y){var d=new Date(y,9,1);var first=1+((7-d.getDay())%7);return first+14;}
  function pick(LIST){
    var qs; try{qs=new URLSearchParams(location.search);}catch(e){qs=null;}
    var ov=qs?(qs.get('prazdnik')||qs.get('holiday')):null;
    if(ov){var h=LIST.filter(function(x){return x.key===ov;})[0];
           if(!h&&ov==='demo')h=LIST[0];
           if(h){h._preview=true;return h;}}
    var now=new Date(),m=now.getMonth()+1,d=now.getDate(),y=now.getFullYear();
    for(var i=0;i<LIST.length;i++){var H=LIST[i]; if(H.enabled===false) continue;
      if(H.special==='oct3sun'){if(m===10&&d===thirdSundayOct(y))return H;}
      else if(H.month===m&&H.day===d)return H;
    }
    return null;
  }
  function render(LIST){
    if(!LIST||!LIST.length) return;
    var H=pick(LIST); if(!H) return;
    var skey='wniikp-fx-'+H.key+'-'+(new Date().getFullYear());
    try{ if(!H._preview && localStorage.getItem(skey)) return; }catch(e){}
    var ic=H.icon||'ico-spark';
    var iconHTML=/^data:|^https?:\/\/|\.(png|jpe?g|svg|webp|gif)$/i.test(ic)?'<img class="fx-img" src="'+ic+'" alt="">':'<svg class="ic" aria-hidden="true"><use href="#'+ic+'"></use></svg>';
    var bar=document.createElement('div'); bar.className='festive'; bar.setAttribute('role','region'); bar.setAttribute('aria-label','Праздник кондитерской отрасли');
    bar.innerHTML=iconHTML+
      '<div class="fx-text"><b>'+H.name+'</b><span>'+(H.msg||'')+'</span></div>'+
      (H.cta&&H.cta.href?'<a class="fx-cta" href="'+H.cta.href+'">'+H.cta.text+' →</a>':'')+
      '<button class="fx-x" type="button" aria-label="Закрыть поздравление">×</button>';
    var ribbon=document.querySelector('.ribbon');
    if(ribbon){ribbon.parentNode.insertBefore(bar,ribbon);} else {document.body.insertBefore(bar,document.body.firstChild);}
    bar.querySelector('.fx-x').onclick=function(){bar.remove(); try{localStorage.setItem(skey,'1');}catch(e){}};
  }
  // Источник дат/текстов — holidays.json (его редактирует админка). При ошибке баннер просто не показывается.
  fetch('holidays.json',{cache:'no-store'}).then(function(r){return r.ok?r.json():null;}).then(render).catch(function(){});
})();

// ---- поиск по сайту (страница poisk.html) ----
(function(){
  var box=document.getElementById('searchResults'); if(!box) return;
  var input=document.getElementById('q'); if(!input) return;
  var IDX=[
    {t:'Главная',u:'index.html',d:'Испытания, экспертиза и обучение для кондитерских производств',kw:'главная институт услуги'},
    {t:'Об институте',u:'o-institute.html',d:'История, факты, руководство, структура',kw:'институт история факты 1932 ран горбатов'},
    {t:'Руководство института',u:'o-institute.html#rukovodstvo',d:'Директор и администрация',kw:'руководство директор белецкий аксёнова'},
    {t:'Структурные подразделения',u:'o-institute.html#podrazdeleniya',d:'Лаборатории и отделы института',kw:'подразделения лаборатория отдел структура'},
    {t:'История института',u:'o-institute.html#istoriya',d:'Более 90 лет: основан в 1932 году',kw:'история 1932 90 лет основание'},
    {t:'Наука и госзадание',u:'o-institute.html#goszadanie',d:'Научная деятельность и государственное задание',kw:'наука госзадание нир'},
    {t:'Учёный совет',u:'o-institute.html#uchsovet',d:'Коллегиальный орган управления наукой',kw:'учёный совет наука нир'},
    {t:'Госзадание',u:'o-institute.html#goszadanie',d:'Государственное задание института',kw:'госзадание государственное задание'},
    {t:'ТК 149 «Кондитерские изделия»',u:'o-institute.html#tk149',d:'Технический комитет по стандартизации',kw:'тк 149 стандартизация гост комитет'},
    {t:'Услуги — каталог исследований',u:'uslugi.html',d:'Физико-химия, микробиология, органолептика, идентификация, сроки годности',kw:'услуги испытания анализ каталог гост'},
    {t:'Установление срока годности',u:'usluga-srok-godnosti.html',d:'Обоснование и подтверждение срока годности',kw:'срок годности хранение мук гост'},
    {t:'Решения для бизнеса',u:'resheniya.html',d:'Пакеты под задачу: рекламация, новый продукт, замена сырья, контроль структуры',kw:'решения рекламация сырьё импортозамещение'},
    {t:'КТ-контроль структуры',u:'kt-morfometriya.html',d:'Неразрушающая КТ-морфометрия пористости',kw:'кт томограф пористость морфометрия структура бисквит'},
    {t:'Обучение и Ремесленная школа',u:'obuchenie.html',d:'Семинары для предприятий и курсы для ремесленников',kw:'обучение семинары курсы ремесленная школа повышение квалификации'},
    {t:'Электронная библиотека',u:'biblioteka.html',d:'Издания института: монографии, методички, журнал',kw:'библиотека издания книги публикации монография журнал'},
    {t:'Публикации',u:'publikacii.html',d:'Научные публикации и статьи института',kw:'публикации статьи научные работы'},
    {t:'Новости',u:'novosti.html',d:'Новости и события института',kw:'новости события'},
    {t:'Кейсы',u:'keysy.html',d:'Примеры решённых задач производств',kw:'кейсы примеры работы'},
    {t:'Вакансии',u:'vakansii.html',d:'Карьера и открытые позиции',kw:'вакансии работа карьера'},
    {t:'Документы',u:'dokumenty.html',d:'Учредительные документы, аккредитация, политики',kw:'документы аккредитация устав госзадание политика'},
    {t:'Контакты',u:'kontakty.html',d:'Адрес, телефон, e-mail, форма обращения',kw:'контакты адрес телефон почта связаться'},
    {t:'Политика обработки ПДн',u:'politika.html',d:'152-ФЗ',kw:'политика персональные данные 152'}
  ];
  function esc(s){return (s||'').replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}
  function run(){
    var qq=(input.value||'').trim().toLowerCase();
    if(qq.length<2){box.innerHTML='<p class="muted">Введите минимум 2 символа для поиска.</p>';return;}
    var res=IDX.filter(function(e){return (e.t+' '+e.d+' '+e.kw).toLowerCase().indexOf(qq)>-1;});
    if(!res.length){box.innerHTML='<p class="muted">Ничего не найдено по запросу «'+esc(input.value)+'». Попробуйте иначе или <a href="kontakty.html">напишите нам</a>.</p>';return;}
    box.innerHTML='<div class="muted" style="margin-bottom:12px">Найдено: '+res.length+'</div>'+res.map(function(e){return '<a class="search-res" href="'+e.u+'"><b>'+esc(e.t)+'</b><span>'+esc(e.d)+'</span></a>';}).join('');
  }
  input.addEventListener('input',run);
  var p=new URLSearchParams(location.search).get('q'); if(p)input.value=p;
  run();
})();

// ---- Вакансии: если их редактировали в админке (localStorage), показываем актуальный список ----
(function(){
  var box=document.getElementById('vacList'); if(!box) return;
  function esc(s){return String(s==null?'':s).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}
  var data; try{var a=JSON.parse(localStorage.getItem('wniikp_admin_v1')||'null'); if(a&&a.vacancies)data=a.vacancies;}catch(e){}
  if(!data||!data.length) return; // нет правок из админки — оставляем статические карточки страницы
  var pub=data.filter(function(v){return v.published!==false;});
  if(!pub.length){box.innerHTML='<p class="muted" style="grid-column:1/-1">Сейчас открытых вакансий нет. Резюме можно прислать на <a href="mailto:conditerprom@mail.ru">conditerprom@mail.ru</a> — рассмотрим при появлении позиций.</p>'; return;}
  box.innerHTML=pub.map(function(v){
    return '<div class="scn"><span class="tag">'+esc(v.tag)+'</span><h3><svg class="ic" aria-hidden="true"><use href="#'+(v.icon||'ico-doc')+'"></use></svg> '+esc(v.title)+'</h3><ul class="pkg">'+(v.reqs||[]).map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ul><div class="foot"><span class="badge green">'+esc(v.type||'')+'</span><a class="btn btn-primary" href="kontakty.html#zayavka">Откликнуться</a></div></div>';
  }).join('');
})();

// ---- Коллекции контента: если их редактировали в админке (localStorage), показываем актуальный список ----
(function(){
  function esc(s){return String(s==null?'':s).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}
  var cms; try{var a=JSON.parse(localStorage.getItem('wniikp_admin_v1')||'null'); if(a&&a.cms)cms=a.cms;}catch(e){}
  if(!cms) return;
  function pub(arr){return (arr||[]).filter(function(x){return x.published!==false;});}
  var nl=document.getElementById('newsList');
  if(nl&&cms.news){var it=pub(cms.news); if(it.length) nl.innerHTML=it.map(function(x){return '<article class="card link">'+(x.date?'<span class="badge amber">'+esc(x.date)+'</span>':'')+'<h3 style="margin-top:12px">'+esc(x.title)+'</h3><p>'+esc(x.text)+'</p>'+(x.linkHref?'<a class="more" href="'+esc(x.linkHref)+'">'+esc(x.linkText||'Подробнее →')+'</a>':'')+'</article>';}).join('');}
  var cl=document.getElementById('caseList');
  if(cl&&cms.cases){var ic=pub(cms.cases); if(ic.length) cl.innerHTML=ic.map(function(x){return '<div class="scn"><span class="tag">'+esc(x.tag)+'</span><h3><svg class="ic" aria-hidden="true"><use href="#'+(x.icon||'ico-doc')+'"></use></svg> '+esc(x.title)+'</h3><p class="pain"><b>Задача.</b> '+esc(x.problem)+'</p><div class="foot"><span class="badge '+(x.badge||'green')+'">Результат: '+esc(x.result)+'</span></div></div>';}).join('');}
  var pl=document.getElementById('popularList');
  if(pl&&cms.popular){var ip=pub(cms.popular); if(ip.length) pl.innerHTML=ip.map(function(x){return '<a class="popcard" href="'+esc(x.href)+'"><b>'+esc(x.title)+'</b><span>'+esc(x.sub)+'</span></a>';}).join('');}
})();
