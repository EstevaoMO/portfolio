document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Nav: sombra ao rolar + menu mobile
--------------------------------------------------------- */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Destaca o link ativo conforme a seção visível */
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => sectionObserver.observe(s));

/* ---------------------------------------------------------
   Reveal-on-scroll
--------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------------------------------------------------------
   Projetos: carregados dinamicamente de data/projetos.json
--------------------------------------------------------- */
const grid = document.getElementById("projectsGrid");

function projectCard(p) {
  const tags = (p.tags || []).map((t) => `<span>${t}</span>`).join("");
  return `
    <article class="project-card">
      <div class="project-thumb" style="${thumbBackground(p.cor)}">
        ${p.imagem ? `<img src="${p.imagem}" alt="${p.titulo}">` : getProjectIcon(p.icone, "#FFFFFF")}
      </div>
      <div class="project-body">
        <span class="status">${p.status || ""} · ${p.ano || ""}</span>
        <h3>${p.titulo}</h3>
        <p>${p.resumo}</p>
        <div class="project-tags">${tags}</div>
        <a class="project-more" href="projeto.html?id=${encodeURIComponent(p.id)}">
          Ver mais
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </article>`;
}

fetch("data/projetos.json")
  .then((res) => {
    if (!res.ok) throw new Error("Não foi possível carregar projetos.json");
    return res.json();
  })
  .then((projetos) => {
    if (!Array.isArray(projetos) || projetos.length === 0) {
      grid.innerHTML = `<p class="projects-empty">Nenhum projeto cadastrado ainda.</p>`;
      return;
    }
    grid.innerHTML = projetos.map(projectCard).join("");
  })
  .catch((err) => {
    console.error(err);
    grid.innerHTML = `<p class="projects-error">Não foi possível carregar os projetos agora. Tente novamente mais tarde.</p>`;
  });
