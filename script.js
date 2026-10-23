document.getElementById('yr').textContent=new Date().getFullYear();
document.querySelectorAll('.mark').forEach(function(i){i.addEventListener('error',function(){i.remove()})});
document.querySelectorAll('.ph img').forEach(function(i){i.addEventListener('error',function(){i.remove()})});

/* contact form */
(function(){var f=document.getElementById('cf'),m=document.getElementById('fmsg');
f.addEventListener('submit',function(ev){ev.preventDefault();var d=new FormData(f);
if(d.get('_honey'))return;
m.textContent='Sending...';
fetch(f.action,{method:'POST',body:d,headers:{Accept:'application/json'}}).then(function(r){return r.json()}).then(function(j){
if(j&&(j.success===true||j.success==='true')){f.reset();m.textContent='Thank you. Your enquiry has been sent. We will reply soon.'}
else{throw 0}
}).catch(function(){m.textContent='Could not send. Please email us at sasthaenggservices@yahoo.co.in or call +91 9840779640.'})})})();

/* scroll reveal */
(function(){try{
var els=document.querySelectorAll('.sec-head,.about .wrap>div,.vision .wrap>*,.prod,.tbl,.q-intro,.q-grid,.fac,.logos figure,.units,.cbox,.form,.stat');
function show(){els.forEach(function(e){e.classList.add('in')})}
if(!('IntersectionObserver' in window)){document.documentElement.className='';return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
els.forEach(function(el,i){el.classList.add('reveal');if(el.matches('.logos figure,.stat')){el.style.transitionDelay=((i%4)*120)+'ms'}io.observe(el)});
setTimeout(show,6000);
}catch(x){document.documentElement.className=''}})();

/* number counter: replays every time */
(function(){
var nums=document.querySelectorAll('.stat b[data-to]');
if(!('IntersectionObserver' in window)){return}
function label(el,v){
  var pre=el.dataset.pre||'',suf=el.dataset.suf||'';
  el.textContent=pre+(el.dataset.plain?v:v.toLocaleString('en-IN'))+suf;
}
function run(el){
  var to=+el.dataset.to,dur=4000,t0=null,id=++el._run;
  function f(t){
    if(id!==el._run)return;
    if(!t0)t0=t;
    var p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);
    label(el,Math.round(to*e));
    if(p<1)requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  var el=e.target;
  if(e.intersectionRatio>=.5&&!el._on){el._on=true;run(el)}
  else if(e.intersectionRatio===0){el._on=false;el._run++;label(el,0)}
})},{threshold:[0,.5]});
nums.forEach(function(n){n._run=0;label(n,0);io.observe(n)});
})();

/* button wobble on hover and touch */
document.querySelectorAll('.btn,nav ul a').forEach(function(b){
  var busy=false;
  function go(){
    if(busy)return;
    busy=true;
    b.classList.remove('wob');
    void b.offsetWidth;
    b.classList.add('wob');
    setTimeout(function(){b.classList.remove('wob');busy=false},800);
  }
  b.addEventListener('mouseenter',go);
  b.addEventListener('touchstart',go,{passive:true});
  b.addEventListener('focus',go);
});

/* vision points: bounce in, replays every time */
(function(){
var list=document.querySelector('.vision ol');
if(!list)return;
var items=list.querySelectorAll('li');
if(!('IntersectionObserver' in window)){items.forEach(function(li){li.style.opacity=1});return}
var on=false;
function play(){items.forEach(function(li,i){li.classList.remove('bounce');void li.offsetWidth;li.style.animationDelay=(i*350)+'ms';li.classList.add('bounce')})}
function reset(){items.forEach(function(li){li.classList.remove('bounce')})}
var io=new IntersectionObserver(function(es){
  var e=es[0];
  if(e.intersectionRatio>=.3&&!on){on=true;play()}
  else if(e.intersectionRatio===0){on=false;reset()}
},{threshold:[0,.3]});
io.observe(list);
})();

/* raindrop ripple on customer logos */
document.querySelectorAll('.logos .ph').forEach(function(t){
  var last=0;
  function drop(e,n){
    var r=t.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    for(var i=0;i<n;i++){
      var d=document.createElement('span');
      d.className='drop';
      d.style.left=x+'px';
      d.style.top=y+'px';
      d.style.animationDelay=(i*180)+'ms';
      d.addEventListener('animationend',function(){this.remove()});
      t.appendChild(d);
    }
  }
  t.addEventListener('mouseenter',function(e){drop(e,2)});
  t.addEventListener('mousemove',function(e){var n=Date.now();if(n-last>350){last=n;drop(e,1)}});
  t.addEventListener('pointerdown',function(e){drop(e,3)});
});

/* hero photo slideshow */
(function(){
var bg=document.querySelector('.hero-bg');
if(!bg)return;
var files=['images/hero-2.jpg'];
var slides=[bg.querySelector('.slide')],cur=0;
files.forEach(function(src){
  var im=new Image();
  im.onload=function(){
    var s=document.createElement('div');
    s.className='slide';
    s.style.backgroundImage='url('+src+')';
    bg.appendChild(s);
    slides.push(s);
  };
  im.src=src;
});
setInterval(function(){
  if(slides.length<2)return;
  slides[cur].classList.remove('on');
  cur=(cur+1)%slides.length;
  slides[cur].classList.add('on');
},9000);
})();
/* top bar links: keep a different colour after click */
document.querySelectorAll('.topbar a').forEach(function(a){
  a.addEventListener('click',function(){a.classList.add('clicked')});
});

/* logo scrolls to the very top */
(function(){
var lg=document.querySelector('.logo');
if(!lg)return;
lg.addEventListener('click',function(e){
  e.preventDefault();
  window.scrollTo({top:0,behavior:'smooth'});
});
})();
/* tabs */
(function(){
var tabs=document.querySelectorAll('[data-tab]');
var links=document.querySelectorAll('[data-go]');
document.body.classList.add('tabs');
function go(name,scroll){
  tabs.forEach(function(t){t.classList.toggle('on',t.getAttribute('data-tab')===name)});
  links.forEach(function(l){
    if(l.closest('nav'))l.classList.toggle('current',l.getAttribute('data-go')===name);
  });
  if(scroll)window.scrollTo({top:0,behavior:'smooth'});
}
links.forEach(function(l){
  l.addEventListener('click',function(e){e.preventDefault();go(l.getAttribute('data-go'),true)});
});
var lg=document.querySelector('.logo');
if(lg)lg.addEventListener('click',function(e){e.preventDefault();go('home',true)});
go('home',false);
})();

/* contact: bounce in one by one, replays every time */
(function(){
var sec=document.getElementById('contact');
if(!sec||!('IntersectionObserver' in window))return;
var items=[].slice.call(sec.querySelectorAll('.wrap>.eyebrow,.wrap>h2,.unit,.cbox>div'));
var trigger=sec.querySelector('h2');
items.forEach(function(el){el.classList.add('bi')});
var on=false;
function play(){items.forEach(function(el,i){el.classList.remove('bounce');void el.offsetWidth;el.style.animationDelay=(i*300)+'ms';el.classList.add('bounce')})}
function reset(){items.forEach(function(el){el.classList.remove('bounce')})}
new IntersectionObserver(function(es){
  if(es[0].intersectionRatio>=.5&&!on){on=true;play()}
},{threshold:[0,.5]}).observe(trigger);
new IntersectionObserver(function(es){
  if(es[0].intersectionRatio===0){on=false;reset()}
},{threshold:[0]}).observe(sec);
})();

/* phone: hide nav when scrolling down, show it when scrolling up */
(function(){
var nav=document.querySelector('nav');
if(!nav||!window.matchMedia)return;
var mq=window.matchMedia('(max-width:860px)');
var last=window.pageYOffset||0,ticking=false;
function update(){
  ticking=false;
  var y=Math.max(window.pageYOffset||0,0);
  if(!mq.matches||y<=nav.offsetHeight){nav.classList.remove('nav-hidden');last=y;return}
  if(Math.abs(y-last)<6)return;
  nav.classList.toggle('nav-hidden',y>last);
  last=y;
}
window.addEventListener('scroll',function(){
  if(!ticking){ticking=true;requestAnimationFrame(update)}
},{passive:true});
function reset(){nav.classList.remove('nav-hidden')}
if(mq.addEventListener)mq.addEventListener('change',reset);
window.addEventListener('resize',function(){if(!mq.matches)reset()});
})();

/* phone: tap an image to view it full screen, with next/previous */
(function(){
if(!window.matchMedia)return;
var mq=window.matchMedia('(max-width:860px)');
var SEL='.fac .ph img,.q-grid figure.ph img,.q-gal .ph img,.prod .ph img,.gal .ph img';
var box=document.createElement('div');
box.className='lb';
box.setAttribute('role','dialog');
box.setAttribute('aria-modal','true');
box.innerHTML='<button type="button" class="lb-x" aria-label="Close">&times;</button><button type="button" class="lb-prev" aria-label="Previous image">&#8249;</button><img alt=""><button type="button" class="lb-next" aria-label="Next image">&#8250;</button><span class="lb-count"></span>';
document.body.appendChild(box);
var big=box.querySelector('img'),count=box.querySelector('.lb-count');
var list=[],idx=0;
function show(){
  var im=list[idx];
  big.src=im.currentSrc||im.src;
  big.alt=im.alt;
  count.textContent=(idx+1)+' / '+list.length;
  box.classList.toggle('single',list.length<2);
}
function step(d){if(list.length<2)return;idx=(idx+d+list.length)%list.length;show()}
function close(){box.classList.remove('open');document.body.classList.remove('lb-open')}
document.querySelectorAll(SEL).forEach(function(im){
  im.addEventListener('click',function(){
    var sec=im.closest('section')||document;
    list=[].slice.call(sec.querySelectorAll(SEL)).filter(function(x){return x.offsetParent!==null});
    idx=list.indexOf(im);
    if(idx<0){list=[im];idx=0}
    show();
    box.classList.add('open');
    document.body.classList.add('lb-open');
  });
});
box.querySelector('.lb-prev').addEventListener('click',function(){step(-1)});
box.querySelector('.lb-next').addEventListener('click',function(){step(1)});
box.addEventListener('click',function(e){if(e.target===box||e.target.classList.contains('lb-x'))close()});
var sx=null;
box.addEventListener('touchstart',function(e){sx=e.changedTouches[0].clientX},{passive:true});
box.addEventListener('touchend',function(e){
  if(sx===null)return;
  var dx=e.changedTouches[0].clientX-sx;sx=null;
  if(Math.abs(dx)>50)step(dx<0?1:-1);
},{passive:true});
document.addEventListener('keydown',function(e){
  if(!box.classList.contains('open'))return;
  if(e.key==='Escape')close();
  else if(e.key==='ArrowLeft')step(-1);
  else if(e.key==='ArrowRight')step(1);
});
mq.addEventListener&&mq.addEventListener('change',function(){if(!mq.matches)close()});
})();

/* about: read more / show less */
(function(){
var a=document.getElementById('abt'),b=a&&a.querySelector('.rm');
if(!b)return;
b.addEventListener('click',function(){
  var o=a.classList.toggle('open');
  b.innerHTML=o?'Show less':'Read more&hellip;';
  b.setAttribute('aria-expanded',o);
});
})();

/* about video: muted autoplay loop; on phone, tap it to expand into a full-screen player */
(function(){
var v=document.querySelector('.ax-video video');
if(!v||!window.matchMedia)return;
var mq=window.matchMedia('(min-width:861px)');
function play(el){var p=el.play();if(p&&p.catch)p.catch(function(){})}
v.muted=true;v.loop=true;v.controls=false;play(v);
var box=document.createElement('div');
box.className='lb';
box.setAttribute('role','dialog');
box.setAttribute('aria-modal','true');
box.innerHTML='<button type="button" aria-label="Close">&times;</button><video controls playsinline muted></video>';
document.body.appendChild(box);
var big=box.querySelector('video');
function close(){
  big.pause();
  box.classList.remove('open');
  document.body.classList.remove('lb-open');
  play(v);
}
v.addEventListener('click',function(){
  var s=v.querySelector('source');
  big.src=(s&&s.src)||v.currentSrc;
  big.muted=true;
  v.pause();
  box.classList.add('open');
  document.body.classList.add('lb-open');
  play(big);
});
box.addEventListener('click',function(e){if(e.target!==big)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&box.classList.contains('open'))close()});
if(mq.addEventListener)mq.addEventListener('change',function(){if(mq.matches&&box.classList.contains('open'))close()});
})();

/* phone hamburger menu */
(function(){
var nav=document.querySelector('nav'),b=document.querySelector('.burger');
if(!nav||!b)return;
function set(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(e){e.stopPropagation();set(!nav.classList.contains('open'))});
nav.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
window.addEventListener('resize',function(){if(window.innerWidth>860)set(false)});
})();

/* machine selector, sliders and image viewer */
(function(){
var v=document.createElement('div');
v.className='sv';
v.setAttribute('role','dialog');
v.setAttribute('aria-modal','true');
v.innerHTML='<button type="button" class="sv-x" aria-label="Close">&times;</button><button type="button" class="sv-prev" aria-label="Previous image">&#8249;</button><img alt=""><button type="button" class="sv-next" aria-label="Next image">&#8250;</button><span class="sv-count"></span>';
document.body.appendChild(v);
var vi=v.querySelector('img'),vc=v.querySelector('.sv-count'),list=[],idx=0;
function paint(){vi.src=list[idx].currentSrc||list[idx].src;vi.alt=list[idx].alt;vc.textContent=(idx+1)+' / '+list.length;v.classList.toggle('single',list.length<2)}
function step(d){if(list.length<2)return;idx=(idx+d+list.length)%list.length;paint()}
function openV(imgs,i){list=imgs;idx=i<0?0:i;paint();v.classList.add('open');document.body.classList.add('sv-open')}
function closeV(){v.classList.remove('open');document.body.classList.remove('sv-open')}
v.querySelector('.sv-prev').addEventListener('click',function(e){e.stopPropagation();step(-1)});
v.querySelector('.sv-next').addEventListener('click',function(e){e.stopPropagation();step(1)});
v.addEventListener('click',function(e){if(e.target!==vi&&!e.target.classList.contains('sv-prev')&&!e.target.classList.contains('sv-next'))closeV()});
var sx=null;
v.addEventListener('touchstart',function(e){sx=e.changedTouches[0].clientX},{passive:true});
v.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>50)step(dx<0?1:-1)},{passive:true});
document.addEventListener('keydown',function(e){
  if(!v.classList.contains('open'))return;
  if(e.key==='Escape')closeV();else if(e.key==='ArrowLeft')step(-1);else if(e.key==='ArrowRight')step(1);
});

var sliders=[].slice.call(document.querySelectorAll('.slider[data-imgs]'));
function refresh(sl){
  var t=sl._t;if(!t)return;
  var more=t.scrollWidth>t.clientWidth+4;
  sl._p.classList.toggle('sl-off',!more);
  sl._n.classList.toggle('sl-off',!more);
}
function check(sl){
  if(sl._t.querySelector('.sl-slide'))return;
  var f=document.createElement('figure');
  f.className='sl-slide sl-empty';
  f.setAttribute('data-file',sl.getAttribute('data-imgs').split(',')[0]);
  sl._t.appendChild(f);
  refresh(sl);
}
function mk(cls,html,label){var b=document.createElement('button');b.type='button';b.className='sl-btn '+cls;b.innerHTML=html;b.setAttribute('aria-label',label);return b}
sliders.forEach(function(sl){
  var files=sl.getAttribute('data-imgs').split(','),alt=sl.getAttribute('data-alt')||'';
  var t=document.createElement('div');t.className='sl-track';
  var p=mk('sl-prev','&#8249;','Previous photos'),n=mk('sl-next','&#8250;','Next photos');
  sl._t=t;sl._p=p;sl._n=n;
  sl.appendChild(t);sl.appendChild(p);sl.appendChild(n);
  files.forEach(function(src,i){
    var s=document.createElement('figure');s.className='sl-slide';
    var im=new Image();
    im.alt=alt+' photo '+(i+1);
    im.loading='lazy';
    im.onerror=function(){s.remove();check(sl)};
    im.onload=function(){refresh(sl)};
    im.src=src;
    s.appendChild(im);t.appendChild(s);
    s.addEventListener('click',function(){
      var imgs=[].slice.call(t.querySelectorAll('.sl-slide:not(.sl-empty) img'));
      openV(imgs,imgs.indexOf(im));
    });
  });
  p.addEventListener('click',function(){
    if(t.scrollLeft<=4)t.scrollTo({left:t.scrollWidth,behavior:'smooth'});
    else t.scrollBy({left:-(t.clientWidth*0.8),behavior:'smooth'});
  });
  n.addEventListener('click',function(){
    if(t.scrollLeft+t.clientWidth>=t.scrollWidth-4)t.scrollTo({left:0,behavior:'smooth'});
    else t.scrollBy({left:t.clientWidth*0.8,behavior:'smooth'});
  });
  t.addEventListener('scroll',function(){refresh(sl)},{passive:true});
});
function refreshAll(){sliders.forEach(refresh)}
window.addEventListener('resize',refreshAll);
document.addEventListener('click',function(){setTimeout(refreshAll,80)});

/* machine selector */
var mt=document.querySelectorAll('.mt'),mp=document.querySelectorAll('.mpanel');
mt.forEach(function(b){
  b.addEventListener('click',function(){
    var k=b.getAttribute('data-m');
    mt.forEach(function(x){x.classList.toggle('on',x===b)});
    mp.forEach(function(p){p.classList.toggle('on',p.id==='m-'+k)});
    setTimeout(refreshAll,50);
  });
});

/* quality floor photo opens in the viewer */
var qf=document.querySelector('.qf-photo img');
if(qf)qf.addEventListener('click',function(){openV([qf],0)});
})();