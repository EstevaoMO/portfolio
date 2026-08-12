document.getElementById("year").textContent = new Date().getFullYear();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const root = document.getElementById("detail-root");
const notFound = document.getElementById("detail-notfound");
const content = document.getElementById("detail-content");

function renderProject(p) {
  document.title = `${p.titulo} — Estevão`;

  const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join("");
  const paragrafos = Array.isArray(p.descricao)
    ? p.descricao.map((par) => `<p>${par}</p>`).join("")
    : `<p>${p.descricao || ""}</p>`;

  const links = [];
  if (p.link_repo) links.push(`<a class="btn btn-ghost" href="${p.link_repo}" target="_blank" rel="noopener">Código-fonte</a>`);
  if (p.link_demo) links.push(`<a class="btn btn-primary" href="${p.link_demo}" target="_blank" rel="noopener">Ver demo</a>`);

  content.innerHTML = `
    <p class="eyebrow">${p.status || "Projeto"} · ${p.ano || ""}</p>
    <h1 class="hero-name" style="font-size:clamp(2rem,4.5vw,2.8rem); margin-top:14px;">${p.titulo}</h1>
    <p class="hero-pitch" style="max-width:60ch;">${p.resumo}</p>
    ${links.length ? `<div class="hero-actions">${links.join("")}</div>` : ""}

    <div class="detail-banner" style="${thumbBackground(p.cor)}">
      ${p.imagem ? `<img src="${p.imagem}" alt="${p.titulo}">` : getProjectIcon(p.icone, "#FFFFFF")}
    </div>

    <div class="detail-body">
      <div class="detail-grid">
        <div class="detail-text">${paragrafos}</div>
        <aside class="detail-side">
          <div>
            <dt>Status</dt>
            <dd>${p.status || "—"}</dd>
          </div>
          <div>
            <dt>Período</dt>
            <dd>${p.ano || "—"}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <div class="project-tags">${tags}</div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

fetch("data/projetos.json")
  .then((res) => res.json())
  .then((projetos) => {
    const projeto = projetos.find((p) => p.id === id);
    if (!projeto) {
      root.style.display = "none";
      notFound.style.display = "block";
      return;
    }
    renderProject(projeto);
  })
  .catch((err) => {
    console.error(err);
    root.style.display = "none";
    notFound.style.display = "block";
  });
