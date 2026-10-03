(function () {
  const D = window.DG;
  const $ = (id) => document.getElementById(id);
  const player = Object.fromEntries(D.players.map((s) => [s.id, s]));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const vsPar = (n) => (n === 0 ? "E" : n > 0 ? "+" + n : "−" + Math.abs(n));
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const and = (arr) => arr.join(" and ");

  // ---------- rounds ----------
  function roundResults(c) {
    const r = D.rounds[c.id];
    if (!r) return null;
    const pars = c.holeInfo ? c.holeInfo.map((h) => h[0]) : null;
    const parTot = pars ? sum(pars) : c.par;
    const rows = Object.entries(r).map(([id, holes]) => {
      const tot = sum(holes);
      return { id, holes, tot, diff: tot - parTot };
    });
    rows.sort((a, b) => a.tot - b.tot);
    return { rows, pars, parTot };
  }
  const results = Object.fromEntries(D.courses.map((c) => [c.id, roundResults(c)]));
  const played = D.courses.filter((c) => results[c.id]);
  const allDone = played.length === D.courses.length;

  function winners(c) {
    const res = results[c.id];
    if (!res) return [];
    const best = res.rows[0].tot;
    return res.rows.filter((r) => r.tot === best).map((r) => r.id);
  }

  // ---------- weekend standing ----------
  const competitors = D.players.filter((s) => s.plays !== false);
  const standing = competitors.map((s) => {
    let tot = 0, diff = 0, n = 0;
    played.forEach((c) => {
      const row = results[c.id].rows.find((r) => r.id === s.id);
      if (row) { tot += row.tot; diff += row.diff; n++; }
    });
    return { id: s.id, tot, diff, n };
  });
  standing.sort((a, b) => b.n - a.n || a.tot - b.tot);
  const lead = standing[0];
  const maxRounds = lead.n;

  // ---------- today ----------
  const iso = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
  const todayCourse = D.courses.find((c) => c.date === iso);
  const last = D.courses[D.courses.length - 1];
  if (todayCourse) {
    $("today").innerHTML = `<i style="background:${todayCourse.color}"></i>Today ${esc(todayCourse.short)}`;
  } else if (iso > last.date) {
    $("today").textContent = "Weekend played";
  } else {
    $("today").textContent = "Coming up";
  }

  function avatar(sp) {
    if (sp.photo) return `<img class="av sm" src="${sp.photo}" alt="" loading="lazy">`;
    return `<span class="av sm nofoto" aria-hidden="true">?</span>`;
  }

  // ---------- programme ----------
  $("route").innerHTML = D.courses.map((c) => {
    const w = winners(c);
    const state = w.length ? `Played, won by ${and(w.map((id) => player[id].name))}` : c === todayCourse ? "Today" : "Still to play";
    return `<li style="--c:${c.color}">
      <p class="r-day">${esc(c.day)}</p>
      <h3>${esc(c.town)}<span>${esc(c.name)}</span></h3>
      <p class="r-facts">${c.holes} holes, par ${c.par}, ${esc(c.drive)} drive</p>
      <div class="r-map"><iframe src="https://maps.google.com/maps?q=${c.geo}&t=k&z=16&output=embed" loading="lazy" title="Satellite view of ${esc(c.name)}" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <p class="r-state">${esc(state)}</p>
      <p>${esc(c.text)}</p>
      <p class="r-links"><a href="https://www.google.com/maps/dir/?api=1&destination=${c.geo}" target="_blank" rel="noopener">Directions</a><a href="${c.udisc}" target="_blank" rel="noopener">View on UDisc</a></p>
    </li>`;
  }).join("");

  // ---------- players ----------
  $("playerList").innerHTML = D.players.map((s) => {
    const rounds = D.courses.map((c) => {
      const row = results[c.id] && results[c.id].rows.find((r) => r.id === s.id);
      return row ? `<span style="--c:${c.color}">${esc(c.day)} <b>${row.tot}</b></span>` : "";
    }).join("");
    const pic = s.photo
      ? `<img src="${s.photo}" alt="${esc(s.name)}" loading="lazy">`
      : `<div class="nofoto-big" aria-label="No photo">?</div>`;
    const vid = s.video
      ? `<video class="p-video" src="${s.video}" poster="${s.video.replace(".mp4", ".jpg")}" controls playsinline preload="none"></video>`
      : "";
    return `<article class="player" id="player-${s.id}">
      <div class="p-head">
        <div class="p-pic">${pic}</div>
        <div><h3>${esc(s.name)}</h3><p class="nick">${esc(s.nick)}</p>
        ${rounds ? `<p class="p-rounds">${rounds}</p>` : ""}</div>
      </div>
      <p class="p-bio">${esc(s.bio)}</p>
      ${vid}
    </article>`;
  }).join("");

  // ---------- leaderboard ----------
  if (lead.n === 0) {
    $("leader").textContent = "No rounds played yet.";
  } else {
    const tied = standing.filter((s) => s.n === lead.n && s.tot === lead.tot);
    const names = and(tied.map((t) => player[t.id].name));
    const verb = tied.length > 1 ? "share the lead" : allDone ? "wins the weekend" : "leads";
    $("leader").innerHTML = `<b>${esc(names)}</b> ${verb} with ${lead.tot} throws, ${vsPar(lead.diff)} after ${lead.n === 1 ? "one round" : lead.n + " rounds"}.`;
  }

  $("race").innerHTML = standing.map((s, i) => {
    const sp = player[s.id];
    let meta;
    if (s.n === 0) meta = `<span class="gap muted">no round yet</span>`;
    else if (s.n < maxRounds) meta = `<span class="gap muted">${s.n} of ${maxRounds} rounds</span>`;
    else meta = i === 0 ? `<span class="gap first">in the lead</span>` : `<span class="gap">${s.tot - lead.tot} behind</span>`;
    return `<li class="${s.n === 0 ? "out" : ""}">
      <span class="pos">${s.n ? i + 1 : ""}</span>
      <span class="who">${avatar(sp)}<b>${esc(sp.name)}</b></span>
      <span class="score">${s.n ? `<b>${s.tot}</b><small>${vsPar(s.diff)}</small>` : ""}</span>
      ${meta}
    </li>`;
  }).join("");

  // ---------- trophies ----------
  $("cupGold").innerHTML = `
    <p class="cup-label">Overall winner</p>
    <p class="cup-winner">${allDone ? esc(player[lead.id].name) : "Decided Sunday night"}</p>
    <p class="cup-note">${allDone ? `${lead.tot} throws over the whole weekend` : lead.n ? `Currently leading: ${esc(player[lead.id].name)}` : ""}</p>`;

  $("cups").innerHTML = D.courses.map((c) => {
    const w = winners(c);
    const res = results[c.id];
    const txt = w.length
      ? `<b>${esc(and(w.map((id) => player[id].name)))}</b><small>${res.rows[0].tot} throws, ${vsPar(res.rows[0].diff)}</small>`
      : `<b class="muted">Still to play</b><small>${esc(c.day)}</small>`;
    return `<li style="--c:${c.color}"><span class="cup-day">${esc(c.day)}, ${esc(c.town)}</span>${txt}</li>`;
  }).join("");

  // ---------- scorecards ----------
  let activeTab = (played[played.length - 1] || D.courses[0]).id;
  function renderTabs() {
    $("tabs").innerHTML = D.courses.map((c) => `
      <button role="tab" aria-selected="${c.id === activeTab}" style="--c:${c.color}" data-id="${c.id}">${esc(c.day)}</button>`).join("");
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
    const c = D.courses.find((x) => x.id === activeTab);
    const res = results[c.id];
    if (!res) {
      $("card").innerHTML = `<div class="card-empty" style="--c:${c.color}">
        <p><b>${esc(c.town)}</b> is played ${c === todayCourse ? "today" : "on " + esc(c.day)}.</p>
        <p>The scorecard appears here after the round.</p></div>`;
      return;
    }
    const pars = res.pars;
    const n = res.rows[0].holes.length;
    const holes = Array.from({ length: n }, (_, i) => i);
    const head = `<tr><th class="name">Hole</th>${holes.map((i) => `<th>${i + 1}</th>`).join("")}<th class="tot">Tot</th></tr>`;
    const parRow = pars ? `<tr class="parrow"><th class="name">Par</th>${pars.map((x) => `<td>${x}</td>`).join("")}<td class="tot">${res.parTot}</td></tr>` : "";
    const body = res.rows.map((r) => `<tr>
      <th class="name">${esc(player[r.id].name)}</th>
      ${r.holes.map((s, i) => `<td><span class="c ${pars ? cellClass(s - pars[i]) : ""}">${s}</span></td>`).join("")}
      <td class="tot"><b>${r.tot}</b><small>${vsPar(r.diff)}</small></td></tr>`).join("");
    const rank = res.rows.map((r, i) => `<li><span class="pos">${i + 1}</span><b>${esc(player[r.id].name)}</b><span class="pts">${r.tot} <small>${vsPar(r.diff)}</small></span></li>`).join("");

    $("card").innerHTML = `
      <div class="card-head" style="--c:${c.color}">
        <h3>${esc(c.town)}</h3><p>${esc(c.name)}</p>
      </div>
      <ol class="day-rank">${rank}</ol>
      <div class="table-wrap" tabindex="0" aria-label="Scorecard, scroll sideways for all holes">
        <table class="score-table">${head}${parRow}${body}</table>
      </div>
      <p class="legend"><span class="c birdie">3</span> under par <span class="c par">3</span> par <span class="c bogey">4</span> +1 <span class="c dbl">5</span> +2 <span class="c worse">6</span> worse</p>`;
  }
  $("tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    activeTab = b.dataset.id;
    renderTabs(); renderCard();
  });
  renderTabs(); renderCard();

  // ---------- lost discs ----------
  const lost = D.lostDiscs;
  const lostTot = sum(Object.values(lost));
  $("lostTotal").innerHTML = `<b>${lostTot}</b><span>${lostTot === 1 ? "disc is" : "discs are"} lying somewhere in France</span>`;
  const lostSorted = competitors.slice().sort((a, b) => (lost[b.id] || 0) - (lost[a.id] || 0));
  $("lostList").innerHTML = lostSorted.map((s) => {
    const k = lost[s.id] || 0;
    const marks = k ? Array.from({ length: k }, () => `<i></i>`).join("") : `<em>all discs still here</em>`;
    return `<li><span>${esc(s.name)}</span><span class="marks">${marks}</span></li>`;
  }).join("");

  // ---------- photo wall ----------
  const tiles = D.photos.map((f) => `<button class="tile" data-img="img/foto/${f}.jpg"><img src="img/foto/${f}-klein.jpg" alt="Group photo"></button>`);
  D.wallVideos.forEach((v, i) => {
    const t = `<button class="tile vid" data-video="${v.src}" data-poster="${v.poster}"><img src="${v.poster}" alt="Video: ${esc(v.title)}"><span class="vid-label">${esc(v.title)}</span></button>`;
    tiles.splice(Math.min(tiles.length, 3 + i * 6), 0, t);
  });
  $("wall").innerHTML = tiles.join("");

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
    const t = e.target.closest("button[data-img],button[data-video]");
    if (!t) return;
    if (t.dataset.img) openLb(`<img src="${t.dataset.img}" alt="">`);
    else openLb(`<video src="${t.dataset.video}" poster="${t.dataset.poster}" controls playsinline></video>`);
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  lb.addEventListener("close", () => { lbBody.innerHTML = ""; });

  // only one player video plays at a time
  document.addEventListener("play", (e) => {
    document.querySelectorAll("video.p-video").forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);
})();
