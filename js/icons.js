/**
 * Ícones usados nas miniaturas dos projetos.
 * Cada função recebe uma cor (stroke) e devolve um SVG simples em traço.
 * Adicionar um novo ícone: crie a função e registre em ICONS.
 */
const ICONS = {
  mobile: (c) => `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="${c}" stroke-width="2"/>
      <line x1="14" y1="36" x2="34" y2="36" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="40" r="1.6" fill="${c}"/>
      <path d="M19 15 L24 20 L29 13" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  chart: (c) => `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 40 L42 40" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <rect x="10" y="26" width="6" height="14" rx="1.5" stroke="${c}" stroke-width="2"/>
      <rect x="21" y="16" width="6" height="24" rx="1.5" stroke="${c}" stroke-width="2"/>
      <rect x="32" y="21" width="6" height="19" rx="1.5" stroke="${c}" stroke-width="2"/>
    </svg>`,
  api: (c) => `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="16" height="16" rx="3" stroke="${c}" stroke-width="2"/>
      <rect x="27" y="22" width="16" height="16" rx="3" stroke="${c}" stroke-width="2"/>
      <path d="M21 18 H30 V22" stroke="${c}" stroke-width="2" fill="none"/>
      <circle cx="13" cy="18" r="2" fill="${c}"/>
      <circle cx="35" cy="30" r="2" fill="${c}"/>
    </svg>`,
  automation: (c) => `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="5" stroke="${c}" stroke-width="2"/>
      <circle cx="34" cy="14" r="5" stroke="${c}" stroke-width="2"/>
      <circle cx="24" cy="36" r="5" stroke="${c}" stroke-width="2"/>
      <path d="M18 17 L22 32" stroke="${c}" stroke-width="2"/>
      <path d="M30 17 L26 32" stroke="${c}" stroke-width="2"/>
      <path d="M19 14 H29" stroke="${c}" stroke-width="2"/>
    </svg>`,
  default: (c) => `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="6" stroke="${c}" stroke-width="2"/>
      <path d="M16 24 H32 M24 16 V32" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
    </svg>`
};

function getProjectIcon(nome, cor) {
  const build = ICONS[nome] || ICONS.default;
  return build(cor || "#FFFFFF");
}

/** Gera o gradiente de fundo da miniatura a partir da cor do projeto. */
function thumbBackground(cor) {
  return `background: linear-gradient(135deg, ${cor} 0%, #0A2647 130%);`;
}
