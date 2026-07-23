/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 90,
      delay: 0
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

/**
 * Lightweight typed text effect for the hero subtitle (custom, no dependency)
 */
(function() {
  "use strict";

  function startTyped() {
    const el = document.querySelector('[data-typed-items]');
    if (!el) return;

    const items = el.getAttribute('data-typed-items').split(',').map(s => s.trim()).filter(Boolean);
    if (!items.length) return;

    let itemIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = items[itemIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
      } else {
        charIndex--;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          itemIndex = (itemIndex + 1) % items.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 90);
    }
    tick();
  }

  window.addEventListener('load', startTyped);
})();


/**
 * Immersive experience module (custom)
 * - Scroll progress bar
 * - Cinematic hero parallax
 * - Parallax background sections
 * - Smooth staggered reveal on scroll
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll progress bar ---- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  /* ---- Collect parallax targets ---- */
  var heroImg = document.querySelector(".hero img");
  var heroContent = document.querySelector(".hero .container");
  var devOrbit = document.querySelector(".dev-orbit");
  var parallaxSections = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";

    if (!reduceMotion) {
      // Cinematic hero: image drifts slower, content lifts & fades
      if (heroImg && y < window.innerHeight) {
        heroImg.style.transform = "scale(1.08) translateY(" + y * 0.35 + "px)";
      }
      if (heroContent && y < window.innerHeight) {
        heroContent.style.transform = "translateY(" + y * 0.18 + "px)";
        heroContent.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.8));
      }
      if (devOrbit && y < window.innerHeight) {
        // Expand the orbit as the hero scrolls away, with a gentle drift + fade.
        // We drive CSS vars so the base centering transform (set in CSS) is preserved.
        var p = y / window.innerHeight;               // 0 → 1 across the hero
        devOrbit.style.setProperty("--orbit-scale", (1 + p * 0.9).toFixed(3));
        devOrbit.style.setProperty("--orbit-drift", (y * 0.12).toFixed(1) + "px");
        devOrbit.style.setProperty("--orbit-fade", Math.max(0, 1 - p * 1.05).toFixed(3));
      }
      // Background parallax sections
      parallaxSections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var offset = (rect.top - window.innerHeight) * 0.08;
          sec.style.backgroundPositionY = offset + "px";
        }
      });
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---- Cursor-reactive hero glow + avatar tilt (fine pointers only) ----
     The pointer becomes a light source (the bulb motif again) and the
     portrait tilts gently toward it. The tilt targets .hero-avatar-tilt,
     never .hero-avatar itself — that inner element's transform is already
     owned by the avatarFloat keyframe. */
  var heroSection = document.querySelector(".hero");
  var avatarTilt = document.querySelector(".hero-avatar-tilt");
  var pointerFine = window.matchMedia("(pointer: fine)").matches;

  if (heroSection && pointerFine && !reduceMotion) {
    var glow = document.createElement("div");
    glow.className = "hero-cursor-glow";
    heroSection.appendChild(glow);

    var glowRaf = false;
    var gx = 0, gy = 0;

    heroSection.addEventListener("pointermove", function (e) {
      var rect = heroSection.getBoundingClientRect();
      gx = e.clientX - rect.left;
      gy = e.clientY - rect.top;
      if (glowRaf) return;
      glowRaf = true;
      window.requestAnimationFrame(function () {
        glow.style.opacity = "1";
        glow.style.transform = "translate(" + gx + "px, " + gy + "px)";
        if (avatarTilt) {
          var dx = (gx - rect.width / 2) / (rect.width / 2);
          var dy = (gy - rect.height / 2) / (rect.height / 2);
          avatarTilt.style.transform =
            "rotateY(" + (dx * 7).toFixed(2) + "deg) rotateX(" + (-dy * 7).toFixed(2) + "deg)";
        }
        glowRaf = false;
      });
    });

    heroSection.addEventListener("pointerleave", function () {
      glow.style.opacity = "0";
      if (avatarTilt) avatarTilt.style.transform = "";
    });
  }

  /* ---- Staggered reveal on scroll (IntersectionObserver) ---- */
  // NOTE: .portfolio-item is intentionally excluded (Isotope controls its transform)
  var revealSelector = [
    ".services .service-item",
    ".feature-card",
    ".stats .stats-item",
    ".resume .resume-item",
    ".testimonials .testimonial-item",
    ".about .content",
    ".about .col-lg-4 img",
    ".skill-card"
  ].join(",");

  var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSelector));

  // Tag them so CSS can hide them before reveal (only when JS + observer supported)
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-init");
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // Stagger items within the same row/parent
          var siblings = Array.prototype.slice.call(el.parentNode.children);
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = Math.min(idx, 6) * 90 + "ms";
          el.classList.add("reveal-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  window.addEventListener("load", onScroll);
})();


/**
 * Skill detail popup (custom)
 * Clicking a .skill-card opens a styled modal describing the skill.
 */
(function () {
  "use strict";

  var grid = document.querySelector(".skills-grid");
  var modal = document.getElementById("skill-modal");
  if (!grid || !modal) return;

  // Skill name -> { tag, desc }
  var DETAILS = {
    "HTML5": { tag: "Développement", desc: "Le langage de structure du web. Je construis des pages sémantiques, accessibles et bien organisées, base de tout site performant." },
    "CSS3": { tag: "Développement", desc: "Mise en forme moderne : Flexbox, Grid, animations et design responsive pour des interfaces élégantes sur tous les écrans." },
    "Bootstrap": { tag: "Développement", desc: "Framework CSS qui me permet de créer rapidement des interfaces responsives, cohérentes et professionnelles." },
    "JavaScript": { tag: "Développement", desc: "Le moteur de l'interactivité : manipulation du DOM, animations, validation de formulaires et logique côté client." },
    "PHP": { tag: "Back-end", desc: "Développement côté serveur : traitement de formulaires, connexion aux bases de données et logique métier dynamique." },
    "WordPress": { tag: "CMS", desc: "Création et personnalisation de sites avec le CMS le plus utilisé au monde : thèmes, extensions et administration." },
    "WinDev": { tag: "Applications", desc: "Conception d'applications de gestion desktop et mobile, avec bases de données et interfaces métier." },
    "Photoshop": { tag: "Design", desc: "Retouche photo, montage, mockups et création de visuels publicitaires percutants." },
    "Illustrator": { tag: "Design", desc: "Création de logos, illustrations vectorielles et chartes graphiques nettes à toutes les tailles." },
    "Première Pro": { tag: "Vidéo", desc: "Montage et édition vidéo professionnelle : transitions, étalonnage et habillage." },
    "Claude AI": { tag: "Intelligence Artificielle", desc: "Assistant IA d'Anthropic que j'utilise au quotidien pour coder, rédiger et automatiser des tâches complexes." },
    "Gemini": { tag: "Intelligence Artificielle", desc: "IA multimodale de Google pour la génération de contenu, l'analyse et la recherche créative." },
    "Grok": { tag: "Intelligence Artificielle", desc: "IA de xAI que j'exploite pour la recherche d'informations, l'analyse et la génération de contenu." },
    "Vibe Coding": { tag: "Méthode", desc: "Développement assisté par l'IA. C'est ainsi que j'ai conçu WhatAffiche, mon extension Photoshop (200+ modèles, QR codes, factures…)." },
    "Contenu IA": { tag: "Création", desc: "Production de contenus visuels, textuels et vidéo propulsés par l'intelligence artificielle pour booster la communication." }
  };

  var logoBox = modal.querySelector(".skill-modal-logo");
  var tagBox = modal.querySelector(".skill-modal-tag");
  var titleBox = modal.querySelector(".skill-modal-title");
  var descBox = modal.querySelector(".skill-modal-desc");
  var lastFocused = null;

  function openModal(card) {
    var name = (card.querySelector("span") || {}).textContent || "";
    name = name.trim();
    var info = DETAILS[name] || { tag: "Compétence", desc: "" };
    var logo = card.querySelector(".skill-logo");

    logoBox.innerHTML = logo ? logo.innerHTML : "";
    logoBox.className = "skill-modal-logo" + (logo && logo.classList.contains("skill-logo-icon") ? " is-icon" : "");
    tagBox.textContent = info.tag;
    titleBox.textContent = name;
    descBox.textContent = info.desc;

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".skill-modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // Make cards interactive
  Array.prototype.forEach.call(document.querySelectorAll(".skill-card"), function (card) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("click", function () { openModal(card); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close interactions
  Array.prototype.forEach.call(modal.querySelectorAll("[data-close]"), function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();


/**
 * Inject a "En savoir plus" affordance on the Services page cards (custom)
 */
(function () {
  "use strict";
  if (!document.querySelector("body.services-page")) return;

  document.querySelectorAll(".services .service-item").forEach(function (item) {
    if (item.querySelector(".learn-more")) return;
    var link = document.createElement("a");
    link.href = "contact.html";
    link.className = "learn-more";
    link.innerHTML = 'En savoir plus <i class="bi bi-arrow-right"></i>';
    item.appendChild(link);
  });
})();


/**
 * WhatsApp mini-chat widget (contact page) — sticky launcher that opens a
 * small chat panel; sending forwards the typed message straight to WhatsApp.
 */
(function () {
  "use strict";
  var widget = document.querySelector(".wa-widget");
  if (!widget) return;

  var fab = widget.querySelector(".wa-fab");
  var closeBtn = widget.querySelector(".wa-close");
  var panel = widget.querySelector(".wa-panel");
  var form = widget.querySelector(".wa-form");
  var input = widget.querySelector(".wa-text");
  var number = widget.getAttribute("data-wa-number") || "";

  function open() {
    widget.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    setTimeout(function () { input.focus(); }, 300);
  }
  function close() {
    widget.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  }

  fab.addEventListener("click", function () {
    widget.classList.contains("is-open") ? close() : open();
  });
  if (closeBtn) closeBtn.addEventListener("click", close);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = (input.value || "").trim();
    if (!msg) {
      msg = "Bonjour Moussa, je vous contacte depuis votre site Ouattware.";
    }
    var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank", "noopener");
    input.value = "";
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && widget.classList.contains("is-open")) close();
  });
})();


/**
 * Drifting tech/AI badges behind the mobile nav (site-wide, built once here
 * so every page shares the same decorative field instead of repeating markup
 * across 7 HTML files).
 */
(function () {
  "use strict";
  var nav = document.getElementById("navmenu");
  if (!nav) return;

  var LOGOS = ["html5", "css3", "javascript", "php", "wordpress", "bootstrap", "claude", "gemini", "grok"];
  var field = document.createElement("div");
  field.className = "nav-tech-field";
  field.setAttribute("aria-hidden", "true");

  LOGOS.forEach(function (name, i) {
    var span = document.createElement("span");
    span.className = "nav-tech-ball ntb" + (i + 1) + (name === "grok" ? " ntb-dark" : "");
    var img = document.createElement("img");
    img.src = "assets/img/logos/" + name + ".svg";
    img.alt = "";
    img.loading = "lazy";
    span.appendChild(img);
    field.appendChild(span);
  });

  nav.insertBefore(field, nav.firstChild);
})();
