const state = { top5: [], ranking: [], sort: { key: 'score', dir: 'desc' } };
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

async function loadData(){
  const res = await fetch('assets/data.json');
  const data = await res.json();
  state.top5 = data.top5;
  state.ranking = data.ranking.map((r, i) => ({ idx: i+1, ...r }));
  renderTop5();
  renderRanking();
  $('#year').textContent = new Date().getFullYear();
  setupLightbox();
}

function renderTop5(){
  const wrap = $('#cards');
  wrap.innerHTML = '';
  state.top5.forEach((v) => {
    const typed = ['exterior','room','hall','chapel','dining'].map(t => `assets/images/${v.slug}/${t}.jpg`);
    const photos = typed;
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-media">
        <div class="slides" style="transform: translateX(0%)">
          ${photos.map(p => `<img alt="${'${v.name}'}" src="${'${p}'}" loading="lazy">`).join('')}
        </div>
        <div class="dots">${photos.map((_,i)=>`<button class="dot ${'${i===0?"active":""}'}" data-i="${'${i}'}"></button>`).join('')}</div>
      </div>
      <div class="card-body">
        <h3><a href="${'${v.link}'}" target="_blank" rel="noopener">${'${v.name}'}</a></h3>
        <div class="meta">
          <span class="badge">${'${v.location}'}</span>
          <span class="badge">Pojemność ~${'${v.capacity}'}</span>
          <span class="badge">Od Żukowa ~${'${v.distance_km}'} km</span>
          <span class="badge">Ocena ${'${v.score}'}/100</span>
          <span class="badge">Koszt ${'${v.cost_low}'}–${'${v.cost_high}'} zł</span>
        </div>
        <ul class="features">
          <li>Pokój • Sala konferencyjna • Kaplica • Jadalnia • Budynek</li>
          <li>Kaplica/sala Mszy na 150 + miejsce dla zespołu</li>
          <li>Stołówka 150 (diety) + kawiarenka</li>
          <li>Pokoje rodzinne + 2‑os. w jednolitym standardzie</li>
          <li>Pom. techniczne przy sali, parking, plac zabaw</li>
        </ul>
      </div>
    `;
    const slides = card.querySelector('.slides');
    const dots = $$('.dot', card);
    dots.forEach(d => d.addEventListener('click', () => {
      const i = Number(d.dataset.i);
      slides.style.transform = `translateX(-${'${i*100}'}%)`;
      dots.forEach(x => x.classList.toggle('active', x===d));
    }));
    wrap.appendChild(card);
  });
}

function renderRanking(){
  const tbody = $('#rankingTable tbody');
  const q = ($('#search').value||'').toLowerCase();
  const filtered = state.ranking.filter(r => (r.name + ' ' + r.where).toLowerCase().includes(q));
  const rows = filtered.sort((a,b) => {
    const {key, dir} = state.sort;
    const va = a[key], vb = b[key];
    const cmp = (typeof va === 'number' && typeof vb === 'number') ? va - vb :
      String(va).localeCompare(String(vb), 'pl', {numeric:true});
    return dir === 'asc' ? cmp : -cmp;
  });
  tbody.innerHTML = rows.map((r, i) => {
    const linkOpen = r.link ? `<a href="${'${r.link}'}" target="_blank" rel="noopener">${'${r.name}'}</a>` : r.name;
    return `<tr>
      <td>${'${i+1}'}</td>
      <td>${'${linkOpen}'}</td>
      <td>${'${r.where}'}</td>
      <td>${'${r.distance}'}</td>
      <td>${'${r.cost}'}</td>
      <td>${'${r.score}'}</td>
    </tr>`;
  }).join('');
}

function setupSort(){ $$('.sortable').forEach(th => th.addEventListener('click', () => { const key = th.dataset.key;
  if(state.sort.key === key){ state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc'; }
  else{ state.sort.key = key; state.sort.dir = key === 'name' || key === 'where' ? 'asc' : 'desc'; }
  renderRanking(); })); }
function setupSearch(){ $('#search').addEventListener('input', () => renderRanking()); }
function setupLightbox(){
  const modal = $('#lightbox'); const img = $('#lightbox-img'); const close = $('.lightbox-close');
  $$('.gallery .lightbox').forEach(a => a.addEventListener('click', e => { e.preventDefault(); img.src = a.getAttribute('href'); modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); }));
  function hide(){ modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); }
  close.addEventListener('click', hide); modal.addEventListener('click', e => { if(e.target === modal) hide(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') hide(); });
}
document.addEventListener('DOMContentLoaded', () => { setupSort(); setupSearch(); loadData(); });
