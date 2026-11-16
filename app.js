/* ===================== Les racines de Marine — interactions ===================== */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const couleur = (b) => (b === "coeur" ? "#c2414b" : b === "histoire" ? "#7d6e5f" : (BRANCHES[b] || {}).couleur || "#2a2119");
  const imgSrc = (k) => (CREDITS[k] ? "images/" + CREDITS[k].file : k);

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const liensNav = $$(".nav li a");
  const majNav = () => nav.classList.toggle("solide", scrollY > innerHeight * 0.6);
  addEventListener("scroll", majNav, { passive: true });
  majNav();
  const obsNav = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      liensNav.forEach((a) => a.classList.toggle("actif", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  liensNav.forEach((a) => { const s = $(a.getAttribute("href")); if (s) obsNav.observe(s); });

  /* ---------- Apparitions & compteurs ---------- */
  const compter = (el) => {
    const fin = +el.dataset.count, t0 = performance.now(), duree = 1800;
    const pas = (t) => {
      const p = Math.min(1, (t - t0) / duree);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("vu");
      $$("[data-count]", e.target).forEach(compter);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => obs.observe(el));

  /* ---------- Fiche personne ---------- */
  const fond = $("#fiche-fond"), fiche = $("#fiche");
  const LIBELLE_CERT = {
    atteste: "✔ Retrouvé dans l'état civil", probable: "● Très probable",
    hypothese: "○ Piste à vérifier", inconnu: "? À découvrir", vivant: "♥ Aujourd'hui",
  };
  let dernierFocus = null;
  function ouvrirFiche(id) {
    const p = PERSONNES[id];
    if (!p) return;
    dernierFocus = document.activeElement;
    fiche.style.setProperty("--c", couleur(p.branche));
    const img = p.photo || (p.img && imgSrc(p.img));
    fiche.classList.toggle("sans-img", !img);
    $("#fiche-img").style.backgroundImage = img ? `url("${img}")` : "";
    $("#fiche-role").textContent = p.role || "";
    $("#fiche-nom").textContent = p.nom;
    $("#fiche-dates").textContent = [p.ne && "Naissance : " + p.ne, p.mort && "Décès : " + p.mort].filter(Boolean).join("\n");
    $("#fiche-cert").textContent = LIBELLE_CERT[p.certitude] || "";
    $("#fiche-bio").innerHTML = p.bio || "";
    fond.hidden = false;
    document.body.style.overflow = "hidden";
    $("#fiche-fermer").focus();
  }
  function fermerFiche() {
    fond.hidden = true;
    document.body.style.overflow = "";
    if (dernierFocus) dernierFocus.focus();
  }
  $("#fiche-fermer").addEventListener("click", fermerFiche);
  fond.addEventListener("click", (e) => { if (e.target === fond) fermerFiche(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !fond.hidden) fermerFiche(); });

  /* ---------- Arbre papillon ---------- */
  function construireArbre() {
    const zone = $("#arbre-canvas");
    const W = 168, WR = 190, COL = 202, SLOT = 92, TOP = 40;
    const xM = (g) => (g === 0 ? 4 * COL - 22 : (4 - g) * COL);          // côté Marine (vers la gauche)
    const rootH = 4 * COL - 22 + WR + 90;                                   // racine Hayden
    const xH = (g) => (g === 0 ? rootH : rootH + WR + 34 + (g - 1) * COL);  // côté Hayden (vers la droite)
    const largeur = xH(4) + W + 10;
    const gen = (n) => Math.floor(Math.log2(n));

    // Disposition compacte : les ancêtres les plus lointains s'empilent,
    // chaque personne est centrée entre ses parents.
    const disposer = (map) => {
      let suivant = 0; const y = {};
      const visite = (n) => {
        const ys = [2 * n, 2 * n + 1].filter((p) => map[p]).map(visite);
        y[n] = ys.length ? ys.reduce((a, b) => a + b) / ys.length : suivant++;
        return y[n];
      };
      visite(1);
      return { y, total: suivant };
    };
    const dM = disposer(ARBRE.marine), dH = disposer(ARBRE.hayden);
    const decal = dM.y[1] - dH.y[1];                    // aligner les deux racines
    const minY = Math.min(0, decal), maxY = Math.max(dM.total, dH.total + decal);
    const Y = { marine: (n) => TOP + (dM.y[n] - minY + 0.5) * SLOT, hayden: (n) => TOP + (dH.y[n] + decal - minY + 0.5) * SLOT };
    const HAUT = (maxY - minY) * SLOT;
    zone.style.width = largeur + "px";
    zone.style.height = HAUT + TOP + 20 + "px";
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", largeur); svg.setAttribute("height", HAUT + TOP + 20);
    zone.appendChild(svg);
    let yDe = Y.marine;
    const annees = (p) => {
      const a = (s) => (s && (s.match(/\d{4}/) || [])[0]) || "";
      const n = a(p.ne), m = a(p.mort);
      return n || m ? `${n || "?"} – ${m || ""}`.replace(/ – $/, "") : "";
    };
    const titresGen = ["", "Parents", "Grands-parents", "Arrière-grands-parents", "Arrière-arrière-grands-parents"];

    [["marine", xM, -1], ["hayden", xH, 1]].forEach(([cote, xF, sens]) => {
      const map = ARBRE[cote];
      yDe = Y[cote];
      for (let g = 1; g <= 4; g++) {
        if (!Object.keys(map).some((n) => gen(+n) === g)) continue;
        const lab = document.createElement("div");
        lab.className = "gen-label"; lab.textContent = titresGen[g];
        lab.style.left = xF(g) + "px";
        zone.appendChild(lab);
      }
      Object.entries(map).forEach(([nStr, id]) => {
        const n = +nStr, g = gen(n), p = PERSONNES[id];
        if (!p) return;
        const el = document.createElement("button");
        el.type = "button";
        el.className = `personne ${p.certitude}` + (g === 0 ? " racine" : "");
        el.style.setProperty("--c", couleur(p.branche));
        const largeurCarte = g === 0 ? WR : W;
        el.style.left = xF(g) + "px";
        el.innerHTML = `<span class="p-cert"></span><span class="p-nom">${g === 0 || p.certitude === "inconnu" ? p.court : p.nom.replace(/ «.*?»/, "")}</span>` +
          (annees(p) ? `<span class="p-dates">${annees(p)}</span>` : "") +
          `<span class="p-role">${p.role}</span>`;
        el.addEventListener("click", () => ouvrirFiche(id));
        zone.appendChild(el);
        el.style.top = yDe(n) - el.offsetHeight / 2 + "px";
        el.dataset.n = n; el.dataset.cote = cote; el.dataset.w = largeurCarte;
      });
      // liens enfant → parents
      Object.keys(map).forEach((nStr) => {
        const n = +nStr; if (n === 1) return;
        const enfant = Math.floor(n / 2);
        if (!map[enfant]) return;
        const ge = gen(enfant), gp = gen(n);
        const wE = ge === 0 ? WR : W;
        const x1 = sens < 0 ? xF(ge) : xF(ge) + wE;
        const x2 = sens < 0 ? xF(gp) + W : xF(gp);
        const xm = (x1 + x2) / 2;
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M${x1},${yDe(enfant)} H${xm} V${yDe(n)} H${x2}`);
        if (PERSONNES[map[n]] && PERSONNES[map[n]].certitude === "inconnu") path.setAttribute("stroke-dasharray", "4 4");
        svg.appendChild(path);
      });
    });
    // cœur entre Marine et Hayden
    yDe = Y.marine;
    const coeur = document.createElement("div");
    coeur.className = "coeur-arbre"; coeur.textContent = "♥";
    coeur.style.left = (xM(0) + WR + rootH) / 2 + "px";
    coeur.style.top = yDe(1) + "px";
    zone.appendChild(coeur);
    const lien = document.createElementNS(svgNS, "path");
    lien.setAttribute("d", `M${xM(0) + WR},${yDe(1)} H${rootH}`);
    lien.setAttribute("stroke", "#c2414b"); lien.setAttribute("stroke-dasharray", "2 6");
    svg.appendChild(lien);

    // zoom (ajusté à l'écran par défaut), centrage et « glisser »
    const sc = $("#arbre-scroll");
    const hauteurTotale = HAUT + TOP + 20;
    let zoom = 1;
    const centreX = (xM(0) + WR + rootH) / 2;
    const appliquerZoom = (z) => {
      zoom = Math.max(0.45, Math.min(1.3, z));
      zone.style.zoom = zoom;
      sc.scrollLeft = centreX * zoom - sc.clientWidth / 2;
      sc.scrollTop = Y.marine(1) * zoom - sc.clientHeight / 2;
    };
    const ajuster = () => appliquerZoom(Math.max(0.6, Math.min(1, (sc.clientWidth - 20) / largeur)));
    const barre = document.createElement("div");
    barre.className = "arbre-zoom";
    [["−", () => appliquerZoom(zoom - 0.12), "Dézoomer"], ["Ajuster", ajuster, "Ajuster à l'écran"], ["+", () => appliquerZoom(zoom + 0.12), "Zoomer"]]
      .forEach(([t, f, a]) => { const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.title = a; b.setAttribute("aria-label", a); b.addEventListener("click", f); barre.appendChild(b); });
    sc.parentNode.insertBefore(barre, sc);
    ajuster();
    let largeurPrec = sc.clientWidth;
    addEventListener("resize", () => { if (Math.abs(sc.clientWidth - largeurPrec) > 40) { largeurPrec = sc.clientWidth; ajuster(); } });
    void hauteurTotale;
    let drag = null;
    sc.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.target.closest(".personne")) return;
      drag = { x: e.clientX, y: e.clientY, l: sc.scrollLeft, t: sc.scrollTop };
      sc.classList.add("glisse");
    });
    addEventListener("pointermove", (e) => {
      if (!drag) return;
      sc.scrollLeft = drag.l - (e.clientX - drag.x);
      sc.scrollTop = drag.t - (e.clientY - drag.y);
    });
    addEventListener("pointerup", () => { drag = null; sc.classList.remove("glisse"); });
  }

  /* ---------- Carte ---------- */
  function construireCarte() {
    if (typeof L === "undefined") {
      $("#map").innerHTML = '<p style="padding:2rem;text-align:center">La carte a besoin d\'une connexion internet pour s\'afficher.</p>';
      return;
    }
    const map = L.map("map", { scrollWheelZoom: false, zoomSnap: 0.25, minZoom: 2, maxZoom: 11 });
    map.attributionControl.setPrefix(false).addAttribution("Fond de carte : Natural Earth");
    // Fond de carte vectoriel embarqué (Natural Earth, domaine public), style atlas ancien
    if (typeof CARTE !== "undefined") {
      L.geoJSON(CARTE.terre, { style: { color: "#a8957a", weight: 0.7, fillColor: "#efe4cb", fillOpacity: 1 }, interactive: false }).addTo(map);
      L.geoJSON(CARTE.lacs, { style: { color: "#a8957a", weight: 0.5, fillColor: "#cfdad6", fillOpacity: 1 }, interactive: false }).addTo(map);
      L.geoJSON(CARTE.rivieres, { style: { color: "#8fb0bf", weight: 1.1, opacity: 0.9 }, interactive: false }).addTo(map);
      L.geoJSON(CARTE.etats, { style: { color: "#b9a688", weight: 0.6, dashArray: "2 3" }, interactive: false }).addTo(map);
      L.geoJSON(CARTE.frontieres, { style: { color: "#9c8466", weight: 1, dashArray: "5 3 1 3" }, interactive: false }).addTo(map);
    }
    [["Océan Atlantique", [37, -42]], ["Mer Méditerranée", [38.3, 5.2]], ["Espagne", [40.2, -3.6]], ["France", [46.8, 2.4]],
     ["Algérie", [33.2, 1.5]], ["Maroc", [32.2, -6.2]], ["Royaume-Uni", [54.6, -2.6]], ["États-Unis", [39.8, -98]], ["Canada", [52, -95]]]
      .forEach(([t, ll]) => L.marker(ll, { interactive: false, keyboard: false, icon: L.divIcon({ className: "etiquette-atlas", html: `<span>${t}</span>`, iconSize: null }) }).addTo(map));
    [["Montagne Noire", [43.43, 2.27]], ["Garonne", [43.47, 1.32]], ["Tarn", [43.70, 2.0]], ["Haute-Garonne", [43.66, 1.7]]]
      .forEach(([t, ll]) => L.marker(ll, { interactive: false, keyboard: false, icon: L.divIcon({ className: "etiquette-atlas proche", html: `<span>${t}</span>`, iconSize: null }) }).addTo(map));
    const majZoom = () => {
      const z = map.getZoom(), c = map.getContainer().classList;
      c.toggle("zoom-loin", z < 4.5);
      c.toggle("zoom-proche", z > 6.5);
    };
    map.on("zoomend", majZoom);

    const courbe = (a, b, arc = 0.12) => {
      const [y1, x1] = a, [y2, x2] = b;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
      const cx = mx - dy * arc, cy = my + dx * arc;
      const pts = [];
      for (let t = 0; t <= 1.0001; t += 0.04) {
        pts.push([(1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2, (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2]);
      }
      return pts;
    };

    const calques = {};
    const groupe = (b) => (calques[b] = calques[b] || { lignes: [], points: L.layerGroup(), etiquettes: [] });

    ROUTES.forEach((r) => {
      const a = LIEUX[r.de].ll, b = LIEUX[r.a].ll;
      const pts = courbe(a, b, r.arc ?? 0.12);
      const ligne = L.polyline(pts, {
        color: couleur(r.branche), weight: r.branche === "coeur" ? 3.5 : 3, opacity: 0.9,
        dashArray: r.pointille ? "6 8" : null, lineCap: "round",
      });
      const g = groupe(r.branche);
      g.lignes.push(ligne);
      if (r.label) {
        const mid = pts[Math.floor(pts.length / 2)];
        g.etiquettes.push(L.tooltip({ permanent: true, direction: "center", className: "etiquette-route" }).setLatLng(mid).setContent(r.label));
      }
    });

    Object.entries(LIEUX).forEach(([k, l]) => {
      const m = L.circleMarker(l.ll, { radius: 7, color: "#fbf7ef", weight: 2, fillColor: couleur(l.branche), fillOpacity: 1 });
      const img = l.img ? `<img src="${imgSrc(l.img)}" alt="">` : "";
      m.bindPopup(`<div class="lieu-pop">${img}<h4>${l.nom}</h4><p>${l.txt}</p></div>`, { maxWidth: 270 });
      m.bindTooltip(l.nom, { direction: "right", offset: [8, 0], permanent: true, className: "etiquette-lieu" });
      groupe(l.branche).points.addLayer(m);
    });
    // Toulouse appartient aussi aux autres branches : on garde ses points visibles partout
    const animer = (ligne) => {
      const el = ligne.getElement && ligne.getElement();
      if (!el || ligne.options.dashArray) return;
      const len = el.getTotalLength ? el.getTotalLength() : 2000;
      el.style.transition = "none";
      el.style.strokeDasharray = len; el.style.strokeDashoffset = len;
      el.getBoundingClientRect();
      el.style.transition = "stroke-dashoffset 2.4s ease";
      el.style.strokeDashoffset = 0;
      // une fois tracée, la ligne redevient pleine (sinon le zoom crée des pointillés)
      setTimeout(() => { el.style.transition = ""; el.style.strokeDasharray = ""; el.style.strokeDashoffset = ""; }, 2600);
    };

    const filtres = $("#carte-filtres");
    const choix = [["tout", "Tous les chemins", "#2a2119"], ...Object.entries(BRANCHES).map(([k, v]) => [k, v.nom, v.couleur]), ["coeur", "Marine ❤ Hayden", "#c2414b"]];
    const actifs = new Set();
    function afficher(cle) {
      Object.values(calques).forEach((g) => {
        g.lignes.forEach((l) => map.removeLayer(l));
        g.etiquettes.forEach((t) => map.removeLayer(t));
        map.removeLayer(g.points);
      });
      const branches = cle === "tout" ? Object.keys(calques) : cle === "coeur" ? ["coeur", "toulouse", "amerique"] : [cle, "toulouse"];
      const limites = L.latLngBounds([]);
      branches.forEach((b) => {
        const g = calques[b]; if (!g) return;
        g.points.addTo(map);
        g.lignes.forEach((l) => { l.addTo(map); limites.extend(l.getBounds()); });
        if (cle !== "tout" || b === "coeur") g.etiquettes.forEach((t) => t.addTo(map));
        g.points.eachLayer((m) => limites.extend(m.getLatLng()));
      });
      const VUES = {
        espagne: [[35.0, -3.8], [44.0, 2.6]],
        poitou: [[35.2, -2.0], [48.4, 3.0]],
        tarn: [[43.38, 1.25], [43.72, 2.45]],
        toulouse: [[35.2, -2.0], [44.2, 3.0]],
        amerique: [[30.5, -100], [55, 2]],
      };
      if (VUES[cle]) {
        map.flyToBounds(VUES[cle], { duration: 1.4, padding: [20, 20] });
      } else {
        map.flyToBounds(limites.pad(0.08), { duration: 1.4 });
      }
      let lance = false;
      const tracer = () => { if (lance) return; lance = true; branches.forEach((b) => calques[b] && calques[b].lignes.forEach(animer)); };
      map.once("moveend", tracer);
      setTimeout(tracer, 1800);
      $$(".filtre", filtres).forEach((f) => f.classList.toggle("actif", f.dataset.cle === cle));
    }
    choix.forEach(([cle, nom, c]) => {
      const bt = document.createElement("button");
      bt.className = "filtre"; bt.dataset.cle = cle; bt.textContent = nom;
      bt.style.setProperty("--c", c);
      bt.addEventListener("click", () => afficher(cle));
      filtres.appendChild(bt);
    });
    map.fitBounds(L.latLngBounds([[30, -100], [55, 8]]));
    majZoom();
    // première animation quand la carte arrive à l'écran
    let fait = false;
    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting && !fait) { fait = true; map.invalidateSize(); afficher("tout"); o.disconnect(); }
    }, { threshold: 0.35 }).observe($("#map"));
    map.on("click", () => map.scrollWheelZoom.enable());
  }

  /* ---------- Noms ---------- */
  function construireNoms() {
    const grille = $("#noms-grille");
    NOMS.forEach((n) => {
      const c = document.createElement("button");
      c.type = "button"; c.className = "nom-carte reveal";
      const fondImg = n.img ? ` avec-img" style="background-image:url('${imgSrc(n.img)}')` : "";
      c.innerHTML = `<div class="nom-inner">
          <div class="nom-face${fondImg}"><span class="nom-mot">${n.mot}</span><span class="nom-type">${n.type}</span><span class="nom-indice">Toucher pour retourner ↻</span></div>
          <div class="nom-dos"><span class="nom-sens">${n.sens}</span><p>${n.txt}</p>${n.credit ? `<span class="nom-credit">${n.credit}</span>` : ""}</div>
        </div>`;
      c.setAttribute("aria-label", `${n.mot} : ${n.sens}`);
      c.addEventListener("click", () => c.classList.toggle("retourne"));
      grille.appendChild(c);
      obs.observe(c);
    });
  }

  /* ---------- Frise ---------- */
  function construireFrise() {
    const liste = $("#frise-liste"), filtres = $("#frise-filtres");
    FRISE.sort((a, b) => a.an - b.an).forEach((e) => {
      const li = document.createElement("li");
      li.className = `evt reveal ${e.b}`; li.dataset.b = e.b;
      li.style.setProperty("--c", couleur(e.b));
      li.innerHTML = `<span class="an">${e.an}</span><h4>${e.t}</h4><p>${e.d}</p>`;
      liste.appendChild(li);
      obs.observe(li);
    });
    const choix = [["tout", "Tout", "#2a2119"], ...Object.entries(BRANCHES).map(([k, v]) => [k, v.nom, v.couleur]), ["histoire", "Grande Histoire", "#7d6e5f"]];
    choix.forEach(([cle, nom, c]) => {
      const bt = document.createElement("button");
      bt.className = "filtre" + (cle === "tout" ? " actif" : ""); bt.textContent = nom; bt.dataset.cle = cle;
      bt.style.setProperty("--c", c);
      bt.addEventListener("click", () => {
        $$(".evt", liste).forEach((li) => {
          const garde = cle === "tout" || li.dataset.b === cle || li.dataset.b === "coeur";
          li.classList.toggle("cache", !garde);
          if (garde) li.classList.add("vu");
        });
        $$(".filtre", filtres).forEach((f) => f.classList.toggle("actif", f === bt));
      });
      filtres.appendChild(bt);
    });
  }

  /* ---------- Crédits ---------- */
  function construireCredits() {
    const ul = $("#credits-liste");
    Object.values(CREDITS).forEach((c) => {
      const li = document.createElement("li");
      const auteur = c.artist ? ` — ${c.artist.replace(/\s+/g, " ")}` : "";
      li.innerHTML = `<a href="${c.source}" target="_blank" rel="noopener">${c.title.replace(/\.(jpe?g|png)$/i, "")}</a>${auteur} (${c.license || "voir source"})`;
      ul.appendChild(li);
    });
  }

  construireArbre();
  construireCarte();
  construireNoms();
  construireFrise();
  construireCredits();
})();
