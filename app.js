(function () {
  const D = window.DG;
  const $ = (id) => document.getElementById(id);
  const speler = Object.fromEntries(D.spelers.map((s) => [s.id, s]));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const vsPar = (n) => (n === 0 ? "E" : n > 0 ? "+" + n : "−" + Math.abs(n));
  const sum = (a) => a.reduce((x, y) => x + y, 0);

  // ---------- rondes berekenen ----------
  function parList(p) {
    return p.holeInfo ? p.holeInfo.map((h) => h[0]) : null;
  }
  function roundResults(p) {
    const r = D.rondes[p.id];
    if (!r) return null;
    const pars = parList(p);
    const parTot = pars ? sum(pars) : p.par;
    const rows = Object.entries(r).map(([id, holes]) => {
      const tot = sum(holes);
      return { id, holes, tot, diff: tot - parTot };
    });
    rows.sort((a, b) => a.tot - b.tot);
    return { rows, pars, parTot };
  }
  const results = Object.fromEntries(D.parcours.map((p) => [p.id, roundResults(p)]));
  const played = D.parcours.filter((p) => results[p.id]);

  function winners(p) {
    const res = results[p.id];
    if (!res) return [];
    const best = res.rows[0].tot;
    return res.rows.filter((r) => r.tot === best).map((r) => r.id);
  }

  // ---------- weekendstand ----------
  const standing = D.spelers.map((s) => {
    let tot = 0, diff = 0, n = 0;
    played.forEach((p) => {
      const row = results[p.id].rows.find((r) => r.id === s.id);
      if (row) { tot += row.tot; diff += row.diff; n++; }
    });
    return { id: s.id, tot, diff, n };
  });
  standing.sort((a, b) => b.n - a.n || a.tot - b.tot);
  const maxRounds = standing[0].n;

  // ---------- vandaag ----------
  const iso = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
  const todayCourse = D.parcours.find((p) => p.datum === iso);
  const last = D.parcours[D.parcours.length - 1];
  const todayEl = $("today");
  if (todayCourse) {
    todayEl.innerHTML = `<i style="background:${todayCourse.kleur}"></i>Vandaag ${esc(todayCourse.kort || todayCourse.plaats)}`;
  } else if (iso > last.datum) {
    todayEl.textContent = "Weekend gespeeld";
  } else {
    todayEl.textContent = "Binnenkort";
  }

  // ---------- leider + race ----------
  const lead = standing[0];
  if (lead.n === 0) {
    $("leader").innerHTML = `<p class="leader-line">Nog geen enkele ronde gespeeld.</p>`;
  } else {
    const tied = standing.filter((s) => s.n === lead.n && s.tot === lead.tot);
    const names = tied.map((t) => speler[t.id].naam).join(" en ");
    const done = played.length === D.parcours.length;
    $("leader").innerHTML = `
      <p class="leader-name">${esc(names)}</p>
      <p class="leader-line">${tied.length > 1 ? "delen" : done ? "wint" : "leidt"} het weekend met ${lead.tot} worpen, ${vsPar(lead.diff)} na ${lead.n === 1 ? "één ronde" : lead.n + " rondes"}.</p>`;
  }

  $("race").innerHTML = standing.map((s, i) => {
    const sp = speler[s.id];
    let meta;
    if (s.n === 0) meta = `<span class="gap muted">nog geen ronde</span>`;
    else if (s.n < maxRounds) meta = `<span class="gap muted">${s.n} van ${maxRounds} rondes</span>`;
    else meta = i === 0 ? `<span class="gap first">aan kop</span>` : `<span class="gap">${s.tot - lead.tot} achter</span>`;
    const pos = s.n === 0 ? "" : i + 1;
    return `<li class="${s.n === 0 ? "out" : ""}">
      <span class="pos">${pos}</span>
      <span class="who">${avatar(sp, "sm")}<b>${esc(sp.naam)}</b></span>
      <span class="score">${s.n ? `<b>${s.tot}</b><small>${vsPar(s.diff)}</small>` : ""}</span>
      ${meta}
    </li>`;
  }).join("");

  function avatar(sp, size) {
    if (sp.foto) return `<img class="av ${size}" src="${sp.foto}" alt="" loading="lazy">`;
    return `<span class="av ${size} nofoto" aria-hidden="true">?</span>`;
  }

  // ---------- trofeeën ----------
  const done = played.length === D.parcours.length;
  $("cupGold").innerHTML = `
    <p class="cup-label">Overall winnaar</p>
    <p class="cup-winner">${done ? esc(speler[standing[0].id].naam) : "Zondagavond bekend"}</p>
    <p class="cup-note">${done ? `${standing[0].tot} worpen over het hele weekend` : lead.n ? `Nu aan kop: ${esc(speler[lead.id].naam)}` : ""}</p>`;

  $("cups").innerHTML = D.parcours.map((p) => {
    const w = winners(p);
    const res = results[p.id];
    const txt = w.length
      ? `<b>${w.map((id) => esc(speler[id].naam)).join(" en ")}</b><small>${res.rows[0].tot} worpen, ${vsPar(res.rows[0].diff)}</small>`
      : `<b class="muted">Nog te spelen</b><small>${esc(p.dag)}</small>`;
    return `<li style="--c:${p.kleur}"><span class="cup-day">${esc(p.dag)}, ${esc(p.plaats)}</span>${txt}</li>`;
  }).join("");

  // ---------- programma ----------
  $("route").innerHTML = D.parcours.map((p) => {
    const w = winners(p);
    const state = w.length ? `Gespeeld, gewonnen door ${w.map((id) => speler[id].naam).join(" en ")}` : p === todayCourse ? "Vandaag" : "Nog te spelen";
    return `<li style="--c:${p.kleur}">
      <p class="r-day">${esc(p.dag)}</p>
      <h3>${esc(p.plaats)}<span>${esc(p.naam)}</span></h3>
      <p class="r-facts">${p.holes} holes, par ${p.par}, ${esc(p.rit)} rijden</p>
      <p>${esc(p.tekst)}</p>
      <p class="r-state">${esc(state)}</p>
      <a class="r-link" href="${p.udisc}" target="_blank" rel="noopener">Bekijk op UDisc</a>
    </li>`;
  }).join("");

  // ---------- scorekaarten ----------
  let activeTab = (played[played.length - 1] || D.parcours[0]).id;
  function renderTabs() {
    $("tabs").innerHTML = D.parcours.map((p) => `
      <button role="tab" aria-selected="${p.id === activeTab}" style="--c:${p.kleur}" data-id="${p.id}">${esc(p.dag)}</button>`).join("");
  }
  function cellClass(d) {
    if (d <= -2) return "eagle";
    if (d === -1) return "birdie";
    if (d === 0) return "par";
    if (d === 1) return "bogey";
    if (d === 2) return "dbl";
    return "worse";
  }
  function renderCard() {
    const p = D.parcours.find((x) => x.id === activeTab);
    const res = results[p.id];
    if (!res) {
      $("card").innerHTML = `<div class="card-empty" style="--c:${p.kleur}">
        <p><b>${esc(p.plaats)}</b> wordt ${p === todayCourse ? "vandaag" : esc(p.dag.toLowerCase())} gespeeld.</p>
        <p>Stuur de UDisc screenshot na de ronde, dan staat de kaart hier.</p></div>`;
      return;
    }
    const pars = res.pars;
    const n = res.rows[0].holes.length;
    const holes = Array.from({ length: n }, (_, i) => i);
    const head = `<tr><th class="name">Hole</th>${holes.map((i) => `<th>${i + 1}</th>`).join("")}<th class="tot">Tot</th></tr>`;
    const parRow = pars ? `<tr class="parrow"><th class="name">Par</th>${pars.map((x) => `<td>${x}</td>`).join("")}<td class="tot">${res.parTot}</td></tr>` : "";
    const body = res.rows.map((r) => `<tr>
      <th class="name">${esc(speler[r.id].naam)}</th>
      ${r.holes.map((s, i) => `<td><span class="c ${pars ? cellClass(s - pars[i]) : ""}">${s}</span></td>`).join("")}
      <td class="tot"><b>${r.tot}</b><small>${vsPar(r.diff)}</small></td></tr>`).join("");

    const podium = res.rows.map((r, i) => `<li><span class="pos">${i + 1}</span><b>${esc(speler[r.id].naam)}</b><span class="pts">${r.tot} <small>${vsPar(r.diff)}</small></span></li>`).join("");

    $("card").innerHTML = `
      <div class="card-head" style="--c:${p.kleur}">
        <h3>${esc(p.plaats)}</h3><p>${esc(p.naam)}</p>
      </div>
      <ol class="day-rank">${podium}</ol>
      <div class="table-wrap" tabindex="0" aria-label="Scorekaart, scroll opzij voor alle holes">
        <table class="score-table">${head}${parRow}${body}</table>
      </div>
      <p class="legend"><span class="c birdie">3</span> onder par <span class="c par">3</span> par <span class="c bogey">4</span> +1 <span class="c dbl">5</span> +2 <span class="c worse">6</span> slechter</p>`;
  }
  $("tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    activeTab = b.dataset.id;
    renderTabs(); renderCard();
  });
  renderTabs(); renderCard();

  // ---------- verloren discs ----------
  const lost = D.verlorenDiscs;
  const lostTot = sum(Object.values(lost));
  $("lostTotal").innerHTML = `<b>${lostTot}</b><span>${lostTot === 1 ? "disc ligt" : "discs liggen"} ergens in Frankrijk</span>`;
  const lostSorted = D.spelers.slice().sort((a, b) => (lost[b.id] || 0) - (lost[a.id] || 0));
  $("lostList").innerHTML = lostSorted.map((s) => {
    const k = lost[s.id] || 0;
    const marks = k ? Array.from({ length: k }, () => `<i></i>`).join("") : `<em>nog alles mee</em>`;
    return `<li><span>${esc(s.naam)}</span><span class="marks">${marks}</span></li>`;
  }).join("");

  // ---------- spelers ----------
  $("players").innerHTML = D.spelers.map((s) => {
    const st = standing.find((x) => x.id === s.id);
    const rounds = D.parcours.map((p) => {
      const row = results[p.id] && results[p.id].rows.find((r) => r.id === s.id);
      return row ? `<span style="--c:${p.kleur}">${esc(p.dag)} <b>${row.tot}</b></span>` : "";
    }).join("");
    const pic = s.foto
      ? `<img src="${s.foto}" alt="${esc(s.naam)}" loading="lazy">`
      : `<div class="nofoto-big" aria-label="Geen foto">?</div>`;
    const vid = s.video
      ? `<button class="play" data-video="${s.video}" data-poster="${s.video.replace(".mp4", ".jpg")}">Bekijk zijn worp</button>`
      : "";
    return `<article class="player" id="speler-${s.id}">
      <div class="p-pic">${pic}</div>
      <div class="p-text">
        <h3>${esc(s.naam)}</h3>
        <p class="nick">${esc(s.bijnaam)}</p>
        <p>${esc(s.bio)}</p>
        ${rounds ? `<p class="p-rounds">${rounds}</p>` : ""}
        ${vid}
      </div>
    </article>`;
  }).join("");

  // ---------- fotomuur ----------
  const wallItems = D.fotos.map((f) => ({ type: "foto", klein: `img/foto/${f}-klein.jpg`, groot: `img/foto/${f}.jpg` }))
    .concat(D.videos.map((v) => ({ type: "video", klein: v.poster, groot: v.src, titel: v.titel || (v.speler ? speler[v.speler].naam : "") })));
  // video's tussen de foto's mengen
  const mixed = [];
  const fotos = wallItems.filter((x) => x.type === "foto");
  const vids = wallItems.filter((x) => x.type === "video");
  fotos.forEach((f, i) => { mixed.push(f); if (i % 2 === 1 && vids.length) mixed.push(vids.shift()); });
  mixed.push(...vids);
  $("wall").innerHTML = mixed.map((x) => x.type === "foto"
    ? `<button class="tile" data-img="${x.groot}"><img src="${x.klein}" alt="Foto van de groep"></button>`
    : `<button class="tile vid" data-video="${x.groot}" data-poster="${x.klein}"><img src="${x.klein}" alt="Video: ${esc(x.titel)}"><span class="vid-label">${esc(x.titel)}</span></button>`
  ).join("");

  // ---------- lightbox ----------
  const lb = $("lightbox");
  const lbBody = lb.querySelector(".lb-body");
  function openLb(html) {
    lbBody.innerHTML = html;
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
    const v = lbBody.querySelector("video");
    if (v) v.play().catch(() => {});
  }
  function closeLb() {
    const v = lbBody.querySelector("video");
    if (v) v.pause();
    lbBody.innerHTML = "";
    lb.close ? lb.close() : lb.removeAttribute("open");
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-img],[data-video]");
    if (!t) return;
    if (t.dataset.img) openLb(`<img src="${t.dataset.img}" alt="">`);
    else openLb(`<video src="${t.dataset.video}" poster="${t.dataset.poster}" controls playsinline></video>`);
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  lb.addEventListener("close", () => { lbBody.innerHTML = ""; });
})();
