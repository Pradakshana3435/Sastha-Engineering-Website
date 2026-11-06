/* Sastha Engineering: single script.
   Content (products, machines, inspection, customers) lives in the DATA block below.
   Edit the data and the pages, menus and sidebar update together. */
(function () {
  'use strict';

  /* ================= SETTINGS ================= */
  var CONFIG = {
    /* false = pickers hidden: Machines is chosen from the menu, Quality shows the first item of each group.
       true  = show a machine dropdown, and chips for Products and Quality items. */
    showSelectors: false,
    heroSlides: ['images/hero-2.jpg'],      /* added after images/hero.jpg in the HTML */
    stripDelay: 5500                        /* customers strip, ms per logo */
  };

  /* ================= DATA ================= */
  var PRODUCTS = [
    { id: 'tractor', title: 'Tractor / Farm Equipment', items: [
      ['Bonnet Lock', 'bonnet-assembly'], ['Drive Roller', 'product-drive-roller'],
      ['Pipe and Pin', 'product-pipe-and-pin'], ['Banjos and Fittings', 'product-banjos-and-fittings']] },
    { id: 'automotive', title: 'Automotive', items: [
      ['Pulley Tensioner', 'pulley-assembly'], ['Drain Plug', 'product-drain-plug']] }
  ];

  /* [image slug, menu label, page title, description, capacity, quantity] */
  var MACHINES = [
    ['cnc-lathe', 'CNC lathe and sliding head stock', 'CNC lathe and sliding head stock', 'Computer-controlled turning of precision round components, with the sliding head stock suited to long, slender parts.', '200 and 165 mm (holding)', '35 Nos.'],
    ['vertical-machining-centre', 'Vertical machining centre', 'Vertical machining centre (AMS MCV 400)', 'Computer-controlled milling, drilling and boring of complex part features in a single setup.', '600 x 450 x 500 mm', '2 Nos.'],
    ['centreless-grinding', 'Centreless grinding', 'Centreless grinding (Bhagwan and Sons)', 'Grinds cylindrical parts to an exact diameter and a fine surface finish without holding them between centres.', '100 mm', '5 Nos.'],
    ['capstan-lathe', 'Capstan lathe', 'Capstan lathe', 'Turret-based lathe for repeat production of turned parts through a fixed sequence of tooling operations.', '25 and 32 (holding)', '5 Nos.'],
    ['auto-lathe', 'Auto lathe Traub', 'Auto lathe (PMT) Traub', 'Automatic lathe for fast, consistent production of small turned components in large batches.', 'A32', '8 Nos.'],
    ['thread-rolling', 'Thread rolling', 'Thread rolling (BSA)', 'Forms strong, accurate external threads by cold rolling rather than cutting.', '2 inch', '5 Nos.'],
    ['milling-machine', 'Milling machine', 'Milling machine (Pioneer)', 'Cuts flats, slots and profiles on components using rotating cutters.', 'No. 2', '2 Nos.'],
    ['drilling-and-tapping', 'Drilling and tapping', 'Drilling and tapping', 'Drills holes and cuts internal threads in components.', '1 inch', '6 Nos.'],
    ['band-saw-cutting', 'Band saw cutting machine', 'Band saw cutting machine', 'Cuts bar stock and raw material to length before machining.', null, '1 No.']
  ];

  /* [name, image (extra photos are <name>-2.jpg and <name>-3.jpg), description] */
  var QUALITY = {
    machines: [
      ['Profile Projector', 'inspection-profile-projector', "Magnifies a part's outline onto a screen to check profiles, angles and small features against the drawing."],
      ['Video Measurement System', 'inspection-2', 'Camera-based, non-contact measurement of part dimensions and profiles.'],
      ['Thermo 2D Height Gauge', 'inspection-3', 'Measures heights, step distances and diameters of parts with high accuracy.'],
      ['Roughness Tester', 'inspection-roughness-tester', 'Measures the surface finish of machined components.'],
      ['Height Gauge', 'inspection-height-gauge', 'Measures and marks vertical dimensions of parts from a reference surface.'],
      ['CMM (Coordinate Measuring Machine)', 'inspection-1', 'Measures complex part geometry by probing points on the part and compares it with the drawing.']
    ],
    equipment: [
      ['Air Gauge', 'inspection-air-gauge', 'Checks small bore and shaft sizes using air pressure.'],
      ['Slip Gauges', 'inspection-slip-gauges', 'Precision blocks of known length used as a reference to set and check measuring instruments.'],
      ['Bore Dial Gauges', 'inspection-bore-dial-gauges', 'Measures the diameter and roundness of holes.'],
      ['Pitch Micrometer', 'inspection-pitch-micrometer', 'Measures the pitch diameter of threads to check thread accuracy.'],
      ['Refractometer', 'inspection-refractometer', 'Measures the concentration of liquids such as machine coolant.'],
      ['Digital Micrometer', 'inspection-digital-micrometer', 'Measures outside dimensions of parts with high accuracy and a digital readout.'],
      ['Digital Vernier Caliper', 'inspection-digital-vernier', 'Measures outside, inside and depth dimensions quickly with a digital readout.']
    ]
  };

  var CUSTOMERS = [
    { name: 'Sundram Fasteners Limited, Autolec Division', short: 'Sundram Fasteners', logo: 'logo-sundram', parts: 'Fuel, oil and water pump parts; Pondy division: differential case pinion shaft and pin' },
    { name: 'Same Deutz Fahr India Ltd.', short: 'Same Deutz Fahr', logo: 'logo-sdf', parts: 'Tractor and engine parts' },
    { name: 'Mitsuba India (P) Ltd., Chennai and Pune plants', short: 'Mitsuba India', logo: 'logo-mitsuba', parts: 'Wiper parts' },
    { name: 'Auto Ignition Limited, Satara plant', short: 'Auto Ignition', logo: 'logo-auto-ignition', parts: 'Wiper parts' },
    { name: 'Prabha Engineering, Pune plant', short: 'Prabha Engineering', logo: 'logo-prabha', parts: 'Wiper parts' },
    { name: 'Motion Industries (USA)', short: 'Motion Industries', logo: 'logo-motion', parts: 'Export' },
    { name: 'APA Engineering Pvt Ltd.', short: 'APA Engineering', logo: 'logo-apa', parts: 'Export' },
    { name: 'Simpson', short: 'Simpson', logo: 'logo-simpson', parts: null, optional: true }   /* logo only, no table row */
  ];

  /* ================= HELPERS ================= */
  var IO = 'IntersectionObserver' in window;
  var mobile = window.matchMedia('(max-width:860px)');
  var hoverNav = window.matchMedia('(hover:hover) and (min-width:861px)');
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function photo(src, alt) { var i = new Image(); i.src = src; i.alt = alt || ''; i.decoding = 'async'; return i; }

  /* run enter() when el becomes visible, leave() when area (default el) is fully out of view */
  function onView(target, enter, leave, ratio, area) {
    if (!IO) return;
    var on = false;
    new IntersectionObserver(function (e) {
      if (e[0].intersectionRatio >= ratio && !on) { on = true; enter(); }
    }, { threshold: [0, ratio] }).observe(target);
    new IntersectionObserver(function (e) {
      if (e[0].intersectionRatio === 0 && on) { on = false; if (leave) leave(); }
    }, { threshold: [0] }).observe(area || target);
  }

  /* missing images: logos and brand mark disappear, optional items vanish, others fall back to the placeholder box */
  document.addEventListener('error', function (e) {
    var im = e.target;
    if (!im || im.tagName !== 'IMG') return;
    (im.closest('.cx-slide') || im.closest('[data-optional]') || im).remove();
  }, true);

  /* ================= PAGE SET-UP ================= */
  $('#yr').textContent = new Date().getFullYear();

  /* ----- tabs ----- */
  var tabs = $$('[data-tab]'), navLinks = $$('nav [data-go]');
  document.body.classList.add('tabs');
  function go(name, o) {
    o = o || {};
    document.body.classList.toggle('about-only', !!o.about);
    tabs.forEach(function (t) { t.classList.toggle('on', t.dataset.tab === name); });
    navLinks.forEach(function (l) { l.classList.toggle('current', l.dataset.go === name); });
    if (o.scroll !== false) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function jump(tab, sel) {
    go(tab, { scroll: false });
    setTimeout(function () { var t = $(sel); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-about]')) {
      e.preventDefault(); go('home', { about: true });
      return;
    }
    var a = e.target.closest('[data-go]');
    if (!a) return;
    e.preventDefault();
    if (a.dataset.go === 'products') showCat('all');
    go(a.dataset.go);
  });
  go('home', { scroll: false });

  /* ================= IMAGE / VIDEO VIEWER ================= */
  var gv = el('div', 'gv');
  gv.setAttribute('role', 'dialog'); gv.setAttribute('aria-modal', 'true');
  gv.innerHTML = '<button type="button" class="gv-x" aria-label="Close">&times;</button>' +
    '<button type="button" class="gv-p" aria-label="Previous image">&#8249;</button><img alt="">' +
    '<video controls playsinline muted></video>' +
    '<button type="button" class="gv-n" aria-label="Next image">&#8250;</button><span class="gv-c"></span>';
  document.body.appendChild(gv);
  var vimg = $('img', gv), vvid = $('video', gv), vcount = $('.gv-c', gv), V = { list: [], i: 0 };

  function vshow() {
    var it = V.list[V.i];
    vimg.src = it.src; vimg.alt = it.alt;
    vcount.textContent = (V.i + 1) + ' / ' + V.list.length;
    gv.classList.toggle('single', V.list.length < 2);
  }
  function vstep(d) { if (V.list.length > 1) { V.i = (V.i + d + V.list.length) % V.list.length; vshow(); } }
  function vopen() { gv.classList.add('open'); document.body.classList.add('noscroll'); }
  function vclose() {
    gv.classList.remove('open', 'vid'); document.body.classList.remove('noscroll');
    vvid.pause(); vvid.removeAttribute('src');
    if (vclose.after) { vclose.after(); vclose.after = null; }
  }
  $('.gv-p', gv).onclick = function () { vstep(-1); };
  $('.gv-n', gv).onclick = function () { vstep(1); };
  gv.addEventListener('click', function (e) { if (e.target === gv || e.target.classList.contains('gv-x')) vclose(); });
  document.addEventListener('keydown', function (e) {
    if (!gv.classList.contains('open')) return;
    if (e.key === 'Escape') vclose();
    else if (e.key === 'ArrowLeft') vstep(-1);
    else if (e.key === 'ArrowRight') vstep(1);
  });
  var sx = null;
  gv.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
  gv.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var d = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(d) > 50) vstep(d < 0 ? 1 : -1);
  }, { passive: true });

  /* any image inside a [data-zoom] container opens in the viewer, with its visible siblings as the set */
  document.addEventListener('click', function (e) {
    var box = e.target.closest('[data-zoom]'), cell = e.target.closest('.ph,.gs-slide');
    if (!box || !cell) return;
    var im = $('img', cell);
    if (!im) return;
    var list = $$('.ph img,.gs-slide img', box).filter(function (i) { return i.offsetParent !== null; });
    V.list = list.map(function (i) { return { src: i.currentSrc || i.src, alt: i.alt }; });
    V.i = Math.max(0, list.indexOf(im));
    gv.classList.remove('vid'); vshow(); vopen();
  });

  /* ================= PRODUCTS ================= */
  var catBoxes = [], catChips = [];
  (function () {
    var list = $('#product-list');
    if (CONFIG.showSelectors) {
      var chips = el('div', 'pchips');
      [{ id: 'all', title: 'All' }].concat(PRODUCTS).forEach(function (c) {
        var b = el('button', 'pchip', c.title); b.type = 'button'; b.dataset.cat = c.id;
        b.onclick = function () { showCat(c.id); };
        catChips.push(b); chips.appendChild(b);
      });
      list.appendChild(chips);
    }
    PRODUCTS.forEach(function (c) {
      var sec = el('div', 'pcat'), grid = el('div', 'pgrid');
      sec.dataset.cat = c.id; grid.setAttribute('data-zoom', '');
      sec.appendChild(el('h3', 'pcat-title', c.title));
      c.items.forEach(function (it) {
        var fig = el('figure', 'pcard'), ph = el('div', 'ph r43');
        ph.dataset.file = 'images/' + it[1] + '.jpg';
        ph.appendChild(photo('images/' + it[1] + '.jpg', it[0]));
        fig.appendChild(ph); fig.appendChild(el('figcaption', null, it[0]));
        grid.appendChild(fig);
      });
      sec.appendChild(grid); list.appendChild(sec); catBoxes.push(sec);
    });
  })();
  function showCat(name) {
    catBoxes.forEach(function (c) { c.classList.toggle('hide', name !== 'all' && c.dataset.cat !== name); });
    catChips.forEach(function (b) { b.classList.toggle('on', b.dataset.cat === name); });
  }
  showCat('all');

  /* ================= GALLERY (machines + quality) ================= */
  function slider(srcs, name, required) {
    var w = el('div', 'gs'), tr = el('div', 'gs-track'), p = el('button', 'gs-a gs-p', '\u2039'), n = el('button', 'gs-a gs-n', '\u203A');
    p.type = n.type = 'button'; tr.setAttribute('data-zoom', '');
    p.setAttribute('aria-label', 'Previous images'); n.setAttribute('aria-label', 'Next images');
    function upd() {
      var max = tr.scrollWidth - tr.clientWidth - 2;
      p.disabled = tr.scrollLeft <= 2; n.disabled = tr.scrollLeft >= max;
      w.classList.toggle('noarr', max <= 0);
    }
    function move(d) {
      var f = tr.firstElementChild, s = f ? f.getBoundingClientRect().width + 14 : tr.clientWidth;
      tr.scrollBy({ left: d * s * Math.max(1, Math.floor(tr.clientWidth / s)), behavior: 'smooth' });
    }
    p.onclick = function () { move(-1); }; n.onclick = function () { move(1); };
    tr.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    srcs.forEach(function (src, k) {
      var b = el('button', 'gs-slide'), im = photo(src, name + ' photo ' + (k + 1));
      b.type = 'button'; b.setAttribute('aria-label', 'View larger: ' + name + ' photo ' + (k + 1));
      im.loading = 'lazy';
      im.addEventListener('error', function () {
        if (k >= required) b.remove(); else { b.classList.add('empty'); b.dataset.file = src; }
        upd();
      });
      im.onload = upd;
      b.appendChild(im); tr.appendChild(b);
    });
    w.appendChild(p); w.appendChild(tr); w.appendChild(n);
    setTimeout(upd, 60);
    return w;
  }

  /* shows one item at a time; items = [{name, intro, spec[], srcs[], required}] */
  function chooser(items, label, asSelect) {
    var box = el('div'), panel = el('div'), btns = [], sel = null;
    function show(k) {
      var it = items[k];
      btns.forEach(function (b, j) { b.classList.toggle('on', j === k); });
      if (sel) sel.value = k;
      panel.innerHTML = '';
      panel.appendChild(el('h3', 'gx-name', it.name));
      if (it.intro) panel.appendChild(el('p', 'mdesc', it.intro));
      if (it.spec && it.spec.length) {
        var sp = el('p', 'mspec');
        it.spec.forEach(function (s) { sp.appendChild(el('span', null, s)); });
        panel.appendChild(sp);
      }
      panel.appendChild(slider(it.srcs, it.name, it.required));
    }
    if (CONFIG.showSelectors) {
      if (asSelect) {
        sel = el('select', 'gx-sel'); sel.setAttribute('aria-label', 'Select ' + label);
        items.forEach(function (it, k) { var o = el('option', null, it.name); o.value = k; sel.appendChild(o); });
        sel.onchange = function () { show(+sel.value); };
        box.appendChild(sel);
      } else {
        var chips = el('div', 'gx-chips');
        items.forEach(function (it, k) {
          var b = el('button', 'pchip', it.name); b.type = 'button'; b.onclick = function () { show(k); };
          btns.push(b); chips.appendChild(b);
        });
        box.appendChild(chips);
      }
    }
    box.appendChild(panel);
    box.select = show; show(0);
    return box;
  }

  /* machines page */
  var machineBox = chooser(MACHINES.map(function (m) {
    var n = 'images/machine-' + m[0] + '-';
    return {
      name: m[2], intro: m[3],
      spec: [m[4] ? 'Capacity: ' + m[4] : null, 'Quantity: ' + m[5]].filter(Boolean),
      srcs: [n + '1.jpg', n + '2.jpg', n + '3.jpg'], required: 2
    };
  }), 'machine', true);
  $('#machine-view').appendChild(machineBox);

  /* quality page */
  ['machines', 'equipment'].forEach(function (g) {
    $('#q-' + g + ' .qmount').appendChild(chooser(QUALITY[g].map(function (q) {
      return { name: q[0], intro: q[2], srcs: [q[1] + '.jpg', q[1] + '-2.jpg', q[1] + '-3.jpg'].map(function (f) { return 'images/' + f; }), required: 1 };
    }), g, false));
  });

  /* ================= MENUS (desktop dropdowns + phone sidebar) ================= */
  var MENU = {
    products: PRODUCTS.map(function (c) {
      return { label: c.title, run: function () { showCat(c.id); go('products'); } };
    }),
    machines: MACHINES.map(function (m, i) {
      return { label: m[1], run: function () { machineBox.select(i); jump('machines', '#machine-view'); } };
    }),
    quality: [['Quality Floor', '#qf'], ['Machines', '#q-machines'], ['Equipment', '#q-equipment']].map(function (q) {
      return { label: q[0], run: function () { jump('quality', q[1]); } };
    })
  };

  var nav = $('nav'), dd = {}, ddTimer = null;
  function closeMenus() {
    clearTimeout(ddTimer);
    Object.keys(dd).forEach(function (k) { dd[k].panel.classList.remove('open'); dd[k].a.setAttribute('aria-expanded', 'false'); });
  }
  function openMenu(name) {
    clearTimeout(ddTimer); closeMenus();
    var d = dd[name], nr = nav.getBoundingClientRect(), lr = d.a.getBoundingClientRect();
    d.panel.classList.add('open'); d.a.setAttribute('aria-expanded', 'true');
    d.panel.style.minWidth = Math.max(240, lr.width) + 'px';
    d.panel.style.left = (lr.left - nr.left) + 'px';
    var r = d.panel.getBoundingClientRect();
    if (r.right > window.innerWidth - 8) d.panel.style.left = Math.max(0, lr.left - nr.left - (r.right - window.innerWidth + 8)) + 'px';
  }
  function closeLater() { clearTimeout(ddTimer); ddTimer = setTimeout(closeMenus, 250); }

  $$('nav [data-dd]').forEach(function (a) {
    var name = a.dataset.dd, panel = $('#dd-' + name);
    dd[name] = { a: a, panel: panel };
    MENU[name].forEach(function (m) {
      var l = el('a', null, m.label); l.href = '#'; l.setAttribute('role', 'menuitem');
      l.onclick = function (e) { e.preventDefault(); closeMenus(); m.run(); };
      panel.appendChild(l);
    });
    var li = a.parentNode;
    li.addEventListener('mouseenter', function () { if (hoverNav.matches) openMenu(name); });
    li.addEventListener('mouseleave', function () { if (hoverNav.matches) closeLater(); });
    panel.addEventListener('mouseenter', function () { clearTimeout(ddTimer); });
    panel.addEventListener('mouseleave', function () { if (hoverNav.matches) closeLater(); });
    a.addEventListener('click', function () {
      if (hoverNav.matches) closeMenus();
      else if (panel.classList.contains('open')) closeMenus(); else openMenu(name);
    });
    a.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); openMenu(name); var f = $('a', panel); if (f) f.focus(); }
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-dd') && !e.target.closest('.ddm')) closeMenus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });
  window.addEventListener('resize', closeMenus);

  /* phone sidebar */
  (function () {
    var burger = $('.burger'), scrim = el('div', 'side-scrim'), side = el('aside', 'side');
    side.setAttribute('aria-label', 'Site menu');
    var head = el('div', 'side-head'), x = el('button', 'side-x', '\u00D7');
    x.type = 'button'; x.setAttribute('aria-label', 'Close menu');
    head.appendChild(el('span', 'side-title', 'Menu')); head.appendChild(x); side.appendChild(head);

    function open() { side.classList.add('open'); scrim.classList.add('open'); document.body.classList.add('noscroll'); burger.setAttribute('aria-expanded', 'true'); }
    function close() { side.classList.remove('open'); scrim.classList.remove('open'); document.body.classList.remove('noscroll'); burger.setAttribute('aria-expanded', 'false'); }
    function link(t, fn) { var b = el('button', 'side-l', t); b.type = 'button'; b.onclick = function () { close(); fn(); }; return b; }
    function group(t, items) {
      var g = el('div', 'side-g'), b = el('button', 'side-l side-t', t), sub = el('div', 'side-sub');
      b.type = 'button'; b.setAttribute('aria-expanded', 'false');
      b.onclick = function () { b.setAttribute('aria-expanded', g.classList.toggle('open')); };
      items.forEach(function (m) { sub.appendChild(link(m.label, m.run)); });
      g.appendChild(b); g.appendChild(sub); return g;
    }
    side.appendChild(link('Home', function () { go('home'); }));
    side.appendChild(group('Products', MENU.products));
    side.appendChild(group('Machines / Infrastructure', MENU.machines));
    side.appendChild(group('Quality / Inspection', MENU.quality));
    side.appendChild(link('Organisation', function () { go('organisation'); }));
    side.appendChild(link('Customers', function () { go('customers'); }));
    side.appendChild(link('Contact', function () { $('#contact').scrollIntoView({ behavior: 'smooth' }); }));
    document.body.appendChild(scrim); document.body.appendChild(side);
    burger.onclick = open; x.onclick = close; scrim.onclick = close;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (!mobile.matches) close(); });
  })();

  /* phone: nav hides on scroll down, returns on scroll up */
  (function () {
    var last = window.pageYOffset || 0, ticking = false;
    function update() {
      ticking = false;
      var y = Math.max(window.pageYOffset || 0, 0);
      if (!mobile.matches || y <= nav.offsetHeight) { nav.classList.remove('nav-hidden'); last = y; return; }
      if (Math.abs(y - last) < 6) return;
      nav.classList.toggle('nav-hidden', y > last); last = y;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  })();

  /* ================= CUSTOMERS ================= */
  (function () {
    var logos = $('.logos'), body = $('#customers tbody'), track = $('.cx-track');
    CUSTOMERS.forEach(function (c) {
      var src = 'images/' + c.logo + '.png';
      var fig = el('figure', 'ph'); fig.dataset.file = c.short;
      if (c.optional) fig.setAttribute('data-optional', '');
      fig.appendChild(photo(src, c.short + ' logo'));
      logos.appendChild(fig);
      var s = el('div', 'cx-slide'); s.appendChild(photo(src, c.short)); track.appendChild(s);
      if (c.parts) {
        var tr = el('tr'); tr.appendChild(el('td', null, c.name)); tr.appendChild(el('td', null, c.parts)); body.appendChild(tr);
      }
    });
  })();

  /* sliding strip: one logo at a time, loops without a jump */
  (function () {
    var strip = $('.cx'), view = $('.cx-view'), track = $('.cx-track');
    var idx = 0, count = 0, paused = false, timer = null;
    function perView() { return parseInt(getComputedStyle(strip).getPropertyValue('--n'), 10) || 2; }
    function stepPx() {
      var s = $('.cx-slide', track);
      return s ? s.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : 0;
    }
    function place(anim) { track.classList.toggle('run', !!anim); track.style.transform = 'translateX(' + (-idx * stepPx()) + 'px)'; }
    function build() {
      $$('.cx-clone', track).forEach(function (c) { c.remove(); });
      var real = $$('.cx-slide', track); count = real.length; idx = 0;
      if (count > perView()) real.slice(0, perView()).forEach(function (s) {
        var c = s.cloneNode(true); c.classList.add('cx-clone'); c.setAttribute('aria-hidden', 'true'); track.appendChild(c);
      });
      place(false);
    }
    function next() {
      if (paused || count <= perView()) return;
      idx++; place(true);
      if (idx >= count) setTimeout(function () { idx = 0; place(false); }, 950);
    }
    function init() {
      build(); timer = setInterval(next, CONFIG.stripDelay);
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 200); });
      view.addEventListener('mouseenter', function () { paused = true; });
      view.addEventListener('mouseleave', function () { paused = false; });
      view.addEventListener('touchstart', function () { paused = true; }, { passive: true });
      view.addEventListener('touchend', function () { setTimeout(function () { paused = false; }, 3000); }, { passive: true });
    }
    if (document.readyState === 'complete') init(); else window.addEventListener('load', init);
  })();

  /* ================= HOME EXTRAS ================= */
  /* hero slideshow */
  (function () {
    var bg = $('.hero-bg'), slides = [$('.slide', bg)], cur = 0;
    CONFIG.heroSlides.forEach(function (src) {
      var im = new Image();
      im.onload = function () {
        var s = el('div', 'slide'); s.style.backgroundImage = 'url(' + src + ')';
        bg.appendChild(s); slides.push(s);
      };
      im.src = src;
    });
    setInterval(function () {
      if (slides.length < 2) return;
      slides[cur].classList.remove('on'); cur = (cur + 1) % slides.length; slides[cur].classList.add('on');
    }, 9000);
  })();

  /* stat counters: replay every time they scroll into view */
  $$('.stat b[data-to]').forEach(function (b) {
    var to = +b.dataset.to, pre = b.dataset.pre || '', suf = b.dataset.suf || '', run = 0;
    function label(v) { b.textContent = pre + (b.dataset.plain ? v : v.toLocaleString('en-IN')) + suf; }
    if (!IO) return;
    label(0);
    onView(b, function () {
      var id = ++run, t0 = null;
      (function f(t) {
        if (id !== run) return;
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 4000, 1);
        label(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(f);
      })(performance.now());
    }, function () { run++; label(0); }, .5);
  });

  /* bounce-in sequences (vision points, contact blocks) */
  function bounceIn(items, trigger, ratio, step, area) {
    if (!IO) return;
    items.forEach(function (i) { i.classList.add('bi'); });
    onView(trigger, function () {
      items.forEach(function (i, k) {
        i.classList.remove('bounce'); void i.offsetWidth;
        i.style.animationDelay = (k * step) + 'ms'; i.classList.add('bounce');
      });
    }, function () { items.forEach(function (i) { i.classList.remove('bounce'); }); }, ratio, area);
  }
  bounceIn($$('.vision li'), $('.vision ol'), .3, 350);
  var contact = $('#contact');
  bounceIn($$('.wrap>.eyebrow,.wrap>h2,.unit,.cbox>div', contact), $('h2', contact), .5, 300, contact);

  /* scroll reveal */
  if (IO) (function () {
    var els = $$('.sec-head,.q-intro,.fac,.logos,.tbl,.units,.cbox,.form,.stat');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .1 });
    els.forEach(function (e) { e.classList.add('reveal'); io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 6000);
  })();

  /* button wobble on hover / touch */
  $$('.btn,nav ul a').forEach(function (b) {
    var busy = false;
    function wob() {
      if (busy) return; busy = true;
      b.classList.remove('wob'); void b.offsetWidth; b.classList.add('wob');
      setTimeout(function () { b.classList.remove('wob'); busy = false; }, 800);
    }
    b.addEventListener('mouseenter', wob); b.addEventListener('touchstart', wob, { passive: true }); b.addEventListener('focus', wob);
  });

  /* top bar links keep a different colour after a click */
  $$('.topbar a').forEach(function (a) { a.addEventListener('click', function () { a.classList.add('clicked'); }); });

  /* about: read more / show less (phone) */
  (function () {
    var abt = $('#abt'), b = $('.rm', abt);
    b.addEventListener('click', function () {
      var open = abt.classList.toggle('open');
      b.innerHTML = open ? 'Show less' : 'Read more&hellip;';
      b.setAttribute('aria-expanded', open);
    });
  })();

  /* about video: muted loop in the page, click opens it in the viewer */
  (function () {
    var v = $('.ax-video video');
    function play(x) { var p = x.play(); if (p && p.catch) p.catch(function () {}); }
    v.muted = true; v.loop = true; v.controls = false; play(v);
    v.addEventListener('click', function () {
      var s = $('source', v);
      vvid.src = (s && s.src) || v.currentSrc; vvid.muted = true;
      v.pause(); gv.classList.add('vid'); vopen(); play(vvid);
      vclose.after = function () { play(v); };
    });
  })();

  /* contact form */
  (function () {
    var f = $('#cf'), m = $('#fmsg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      if (d.get('_honey')) return;
      m.textContent = 'Sending...';
      fetch(f.action, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && (j.success === true || j.success === 'true')) { f.reset(); m.textContent = 'Thank you. Your enquiry has been sent. We will reply soon.'; }
          else throw 0;
        })
        .catch(function () { m.textContent = 'Could not send. Please email us at sasthaenggservices@yahoo.co.in or call +91 9840779640.'; });
    });
  })();
})();