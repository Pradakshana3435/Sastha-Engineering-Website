/* Gallery, category selection, viewer, mobile sidebar and Quality Floor page.
   Loads after script.js. Reads the existing .mach and .qcat markup as its data source. */
(function(){
var QUALITY_FLOOR_PHOTO='images/quality-floor.jpg'; /* change to your file name */
document.documentElement.classList.add('gx');
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}

/* ---------- image viewer ---------- */
var gv=el('div','gv');
gv.setAttribute('role','dialog');gv.setAttribute('aria-modal','true');
gv.innerHTML='<button type="button" class="gv-x" aria-label="Close">&times;</button><button type="button" class="gv-p" aria-label="Previous image">&#8249;</button><img alt=""><button type="button" class="gv-n" aria-label="Next image">&#8250;</button><span class="gv-c"></span>';
document.body.appendChild(gv);
var vimg=$('img',gv),vc=$('.gv-c',gv),V={list:[],i:0};
function vshow(){var it=V.list[V.i];vimg.src=it.src;vimg.alt=it.alt;vc.textContent=(V.i+1)+' / '+V.list.length;gv.classList.toggle('single',V.list.length<2)}
function vstep(d){if(V.list.length<2)return;V.i=(V.i+d+V.list.length)%V.list.length;vshow()}
function vclose(){gv.classList.remove('open');document.body.classList.remove('gv-open')}
function vopen(list,i){V.list=list;V.i=i;vshow();gv.classList.add('open');document.body.classList.add('gv-open');$('.gv-x',gv).focus()}
$('.gv-p',gv).onclick=function(){vstep(-1)};
$('.gv-n',gv).onclick=function(){vstep(1)};
gv.addEventListener('click',function(e){if(e.target===gv||e.target.classList.contains('gv-x'))vclose()});
document.addEventListener('keydown',function(e){
  if(!gv.classList.contains('open'))return;
  if(e.key==='Escape')vclose();else if(e.key==='ArrowLeft')vstep(-1);else if(e.key==='ArrowRight')vstep(1);
});
var sx=null;
gv.addEventListener('touchstart',function(e){sx=e.changedTouches[0].clientX},{passive:true});
gv.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(d)>50)vstep(d<0?1:-1)},{passive:true});

/* ---------- horizontal slider ---------- */
function gallery(srcs,name,nreq){
  var req=nreq==null?srcs.length:nreq;
  var w=el('div','gs'),tr=el('div','gs-track'),p=el('button','gs-a gs-p','\u2039'),n=el('button','gs-a gs-n','\u203A');
  p.type=n.type='button';
  p.setAttribute('aria-label','Previous images');n.setAttribute('aria-label','Next images');
  function upd(){
    var max=tr.scrollWidth-tr.clientWidth-2;
    p.disabled=tr.scrollLeft<=2;n.disabled=tr.scrollLeft>=max;
    w.classList.toggle('noarr',max<=0);
  }
  function move(d){
    var f=tr.firstElementChild,s=f?f.getBoundingClientRect().width+14:tr.clientWidth;
    tr.scrollBy({left:d*s*Math.max(1,Math.floor(tr.clientWidth/s)),behavior:'smooth'});
  }
  p.onclick=function(){move(-1)};n.onclick=function(){move(1)};
  tr.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);
  srcs.forEach(function(src,k){
    var b=el('button','gs-slide'),im=new Image();
    b.type='button';b.setAttribute('aria-label','View larger: '+name+' photo '+(k+1));
    im.alt=name+' photo '+(k+1);im.loading='lazy';im.decoding='async';
    im.onerror=function(){if(k>=req){b.remove()}else{b.classList.add('empty');b.setAttribute('data-file',src);im.remove()}upd()};
    im.onload=upd;
    im.src=src;
    b.appendChild(im);
    b.onclick=function(){
      if(b.classList.contains('empty'))return;
      var ims=$$('.gs-slide img',tr);
      vopen(ims.map(function(i){return{src:i.src,alt:i.alt}}),ims.indexOf(im));
    };
    tr.appendChild(b);
  });
  w.appendChild(p);w.appendChild(tr);w.appendChild(n);
  setTimeout(upd,60);
  return w;
}

/* ---------- category chooser: only the selected item's gallery is shown ---------- */
function chooser(items,label,dd){
  var box=el('div','gx-box'),chips=el('div','pchips gx-chips'),panel=el('div','gx-panel'),bt=[],dsel=null;
  chips.setAttribute('role','group');chips.setAttribute('aria-label',label);
  function sel(k){
    bt.forEach(function(b,j){b.classList.toggle('on',j===k);b.setAttribute('aria-pressed',j===k?'true':'false')});
    if(dsel)dsel.value=k;
    var it=items[k];panel.innerHTML='';
    panel.appendChild(el('h3','gx-name',it.name));
    if(it.intro)panel.appendChild(el('p','mdesc',it.intro));
    if(it.spec)panel.appendChild(it.spec);
    panel.appendChild(gallery(it.srcs,it.name,it.req));
  }
  items.forEach(function(it,k){
    var b=el('button','pchip',it.name);b.type='button';b.setAttribute('aria-pressed','false');
    b.onclick=function(){sel(k)};bt.push(b);chips.appendChild(b);
  });
  if(dd){dsel=el('select','gx-sel');dsel.setAttribute('aria-label','Select machine');items.forEach(function(it,k){var o=el('option',null,it.name);o.value=k;dsel.appendChild(o)});dsel.onchange=function(){sel(+dsel.value)};box.appendChild(dsel)}else box.appendChild(chips);
  box.appendChild(panel);box.sel=sel;box.items=items;sel(0);
  return box;
}

/* ---------- Machines page ---------- */
var mbox=null;
(function(){
  var arts=$$('#capability .mach'),anchor=$('#capability .shop-title');
  if(!arts.length||!anchor)return;
  var items=arts.map(function(a){
    var sp=$('.mspec',a);
    return{id:a.id,name:$('h3',a).textContent,intro:($('.mdesc',a)||{}).textContent,
      spec:sp?sp.cloneNode(true):null,
      srcs:$$('.mgal .ph',a).map(function(f){return f.getAttribute('data-file')})};
  });
  mbox=chooser(items,'Machines',true);
  anchor.parentNode.insertBefore(mbox,anchor);
})();
window.gxMachine=function(id){
  if(!mbox)return;
  mbox.items.some(function(it,k){if(it.id===id){mbox.sel(k);return true}});
  setTimeout(function(){mbox.scrollIntoView({behavior:'smooth',block:'start'})},60);
};
$$('#dd-machines [data-mach]').forEach(function(a){
  a.addEventListener('click',function(){window.gxMachine(a.getAttribute('data-mach'))});
});

/* ---------- Quality / Inspection page ---------- */
(function(){
  var sec=$('#quality .wrap'),intro=$('.q-intro',sec);
  if(!sec||!intro)return;
  intro.id='qf';
  $('h2',intro).textContent='Quality Floor';
  var line=$('p:not(.eyebrow)',intro);
  line.textContent='Every batch is inspected and measured against the drawing here before it ships.';
  line.removeAttribute('style');
  var fig=el('figure','qf'),im=new Image();
  im.src=QUALITY_FLOOR_PHOTO;im.alt='Quality floor';im.decoding='async';
  im.onerror=function(){fig.classList.add('empty');im.remove()};
  fig.appendChild(im);
  intro.after(fig);
  var last=fig;
  [['machines','Machines','Inspection and measurement machines used to check parts against the drawing.'],
   ['equipment','Equipment','Precision instruments used for everyday inspection of turned parts.']
  ].forEach(function(g){
    var cards=$$('#q-'+g[0]+' .pcard');
    if(!cards.length)return;
    var items=cards.map(function(c){
      var f=$('.ph',c).getAttribute('data-file');
      return{name:$('figcaption',c).textContent,
        req:1,srcs:[f,f.replace(/\.jpg$/,'-2.jpg'),f.replace(/\.jpg$/,'-3.jpg')]};
    });
    var blk=el('div','gx-qblock');blk.id='gx-q-'+g[0];
    blk.appendChild(el('h2','gx-qh',g[1]));
    blk.appendChild(el('p','gx-qi',g[2]));
    blk.appendChild(chooser(items,g[1]));
    last.after(blk);last=blk;
  });
})();

/* ---------- mobile hamburger + sidebar ---------- */
(function(){
  var nav=$('nav'),wrap=nav&&$('.wrap',nav);
  if(!wrap)return;
  var burger=el('button','burger','\u2630');
  burger.type='button';burger.setAttribute('aria-label','Open menu');burger.setAttribute('aria-expanded','false');
  wrap.appendChild(burger);
  var scrim=el('div','side-scrim'),side=el('aside','side');
  side.setAttribute('aria-label','Site menu');
  var head=el('div','side-head'),x=el('button','side-x','\u00D7');
  x.type='button';x.setAttribute('aria-label','Close menu');
  head.appendChild(el('span','side-title','Menu'));head.appendChild(x);side.appendChild(head);
  function open(){side.classList.add('open');scrim.classList.add('open');document.body.classList.add('gv-open');burger.setAttribute('aria-expanded','true')}
  function close(){side.classList.remove('open');scrim.classList.remove('open');document.body.classList.remove('gv-open');burger.setAttribute('aria-expanded','false')}
  function jump(tab,sel){
    close();window.siteGo(tab,!sel);
    if(sel)setTimeout(function(){var t=$(sel);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})},80);
  }
  function link(t,fn){var a=el('button','side-l',t);a.type='button';a.onclick=fn;return a}
  function group(t,subs){
    var g=el('div','side-g'),b=el('button','side-l side-t',t),list=el('div','side-sub');
    b.type='button';b.setAttribute('aria-expanded','false');
    b.onclick=function(){var o=g.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')};
    subs.forEach(function(s){list.appendChild(link(s[0],s[1]))});
    g.appendChild(b);g.appendChild(list);return g;
  }
  side.appendChild(link('Home',function(){jump('home')}));
  side.appendChild(group('Products',[
    ['Tractor / Farm Equipment',function(){close();var a=$('#dd-products [data-cat="tractor"]');a&&a.click()}],
    ['Automotive',function(){close();var a=$('#dd-products [data-cat="automotive"]');a&&a.click()}]
  ]));
  side.appendChild(group('Machines / Infrastructure',$$('#dd-machines [data-mach]').map(function(a){
    return[a.textContent,function(){close();a.click()}];
  })));
  side.appendChild(group('Quality / Inspection',[
    ['Quality Floor',function(){jump('quality','#qf')}],
    ['Machines',function(){jump('quality','#gx-q-machines')}],
    ['Equipment',function(){jump('quality','#gx-q-equipment')}]
  ]));
  side.appendChild(link('Customers',function(){jump('customers')}));
  side.appendChild(link('Contact',function(){close();var c=$('#contact');c&&c.scrollIntoView({behavior:'smooth'})}));
  document.body.appendChild(scrim);document.body.appendChild(side);
  burger.onclick=open;x.onclick=close;scrim.onclick=close;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  window.addEventListener('resize',function(){if(window.innerWidth>860)close()});
})();
})();