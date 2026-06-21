import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, '../public/images/items');
mkdirSync(OUT, { recursive: true });

const rarityGradients = {
  'Common':       ['#6b7280', '#374151'],
  'Rare':         ['#60a5fa', '#1d4ed8'],
  'Epic':         ['#a78bfa', '#6d28d9'],
  'Legendary':    ['#fcd34d', '#b45309'],
  'Mythic':       ['#fb923c', '#9a3412'],
  'Secret':       ['#f87171', '#7f1d1d'],
  'Brainrot God': ['#f0abfc', '#7c3aed'],
};

function makeSVG(id, rarity, artInner) {
  const [c1, c2] = rarityGradients[rarity] ?? ['#6b7280', '#374151'];
  const gid = 'g' + id.replace(/-/g, '');
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">',
    '  <defs>',
    '    <linearGradient id="' + gid + '" x1="0%" y1="0%" x2="100%" y2="100%">',
    '      <stop offset="0%" stop-color="' + c1 + '"/>',
    '      <stop offset="100%" stop-color="' + c2 + '"/>',
    '    </linearGradient>',
    '  </defs>',
    '  <rect width="200" height="200" rx="18" fill="url(#' + gid + ')"/>',
    artInner,
    '</svg>',
  ].join('\n');
}

const items = [
  { id: 'tralalero-tralala', rarity: 'Brainrot God', art: `
    <ellipse cx="100" cy="115" rx="65" ry="42" fill="#1e3a5f" opacity="0.9"/>
    <polygon points="170,100 195,80 195,130" fill="#1e3a5f" opacity="0.9"/>
    <polygon points="100,73 118,58 130,73" fill="#1e3a5f" opacity="0.9"/>
    <circle cx="75" cy="108" r="8" fill="white"/>
    <circle cx="78" cy="108" r="5" fill="black"/>
    <circle cx="80" cy="106" r="2" fill="white"/>
    <path d="M40,120 Q55,140 70,120" fill="none" stroke="white" stroke-width="2.5"/>
    <rect x="30" y="140" width="32" height="14" rx="7" fill="#ff4757"/>
    <rect x="30" y="140" width="32" height="7" rx="3" fill="white" opacity="0.6"/>
    <rect x="75" y="140" width="32" height="14" rx="7" fill="#ff4757"/>
    <rect x="75" y="140" width="32" height="7" rx="3" fill="white" opacity="0.6"/>
    <circle cx="155" cy="65" r="3" fill="#ffd700"/>
    <circle cx="168" cy="75" r="2" fill="#ffd700"/>
    <circle cx="145" cy="75" r="2" fill="#ffd700"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Tralalero Tralala</text>` },

  { id: 'bombardiro-crocodillo', rarity: 'Mythic', art: `
    <ellipse cx="100" cy="105" rx="55" ry="22" fill="#2d5016" opacity="0.95"/>
    <ellipse cx="48" cy="105" rx="30" ry="18" fill="#3a6b1e" opacity="0.95"/>
    <ellipse cx="22" cy="112" rx="20" ry="11" fill="#4a7f24"/>
    <polygon points="12,104 17,104 14.5,112" fill="white"/>
    <polygon points="22,104 27,104 24.5,112" fill="white"/>
    <polygon points="32,104 37,104 34.5,112" fill="white"/>
    <circle cx="42" cy="96" r="7" fill="#90ee90"/>
    <circle cx="44" cy="96" r="4" fill="#1a1a1a"/>
    <circle cx="45" cy="95" r="1.5" fill="white"/>
    <polygon points="80,80 100,58 160,83" fill="#5a8f2e" opacity="0.9"/>
    <polygon points="80,130 100,152 160,127" fill="#5a8f2e" opacity="0.9"/>
    <circle cx="155" cy="105" r="16" fill="#333"/>
    <rect x="151" y="88" width="8" height="8" rx="2" fill="#555"/>
    <path d="M155,89 Q165,78 170,70" fill="none" stroke="#f39c12" stroke-width="3" stroke-linecap="round"/>
    <circle cx="171" cy="69" r="4" fill="#f39c12"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Bombardiro</text>` },

  { id: 'bombombini-gusini', rarity: 'Mythic', art: `
    <ellipse cx="110" cy="120" rx="50" ry="38" fill="white" opacity="0.95"/>
    <path d="M90,88 Q85,65 95,45" fill="none" stroke="white" stroke-width="22" stroke-linecap="round"/>
    <circle cx="95" cy="40" r="20" fill="white"/>
    <polygon points="76,40 95,35 95,45" fill="#ff9f00"/>
    <circle cx="88" cy="36" r="5" fill="#1a1a1a"/>
    <circle cx="89" cy="35" r="2" fill="white"/>
    <path d="M110,105 Q145,90 165,110 Q145,120 110,130" fill="#e8e8e8"/>
    <line x1="80" y1="150" x2="80" y2="168" stroke="#555" stroke-width="2"/>
    <circle cx="80" cy="175" r="10" fill="#333"/>
    <line x1="110" y1="155" x2="110" y2="173" stroke="#555" stroke-width="2"/>
    <circle cx="110" cy="180" r="10" fill="#333"/>
    <line x1="140" y1="150" x2="140" y2="168" stroke="#555" stroke-width="2"/>
    <circle cx="140" cy="175" r="10" fill="#333"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Bombombini</text>` },

  { id: 'tung-tung-tung-sahur', rarity: 'Legendary', art: `
    <ellipse cx="100" cy="130" rx="52" ry="28" fill="#8B4513"/>
    <ellipse cx="100" cy="105" rx="52" ry="18" fill="#CD853F"/>
    <rect x="48" y="105" width="104" height="25" fill="#A0522D"/>
    <rect x="48" y="108" width="104" height="4" fill="#8B4513" opacity="0.5"/>
    <rect x="48" y="116" width="104" height="4" fill="#8B4513" opacity="0.5"/>
    <ellipse cx="100" cy="105" rx="52" ry="18" fill="#F4D03F" opacity="0.8"/>
    <rect x="58" y="45" width="8" height="70" rx="4" fill="#DEB887" transform="rotate(-20, 62, 80)"/>
    <circle cx="49" cy="48" r="10" fill="#D4A017"/>
    <rect x="128" y="45" width="8" height="70" rx="4" fill="#DEB887" transform="rotate(20, 132, 80)"/>
    <circle cx="145" cy="48" r="10" fill="#D4A017"/>
    <line x1="35" y1="95" x2="20" y2="85" stroke="#fcd34d" stroke-width="3" opacity="0.7"/>
    <line x1="165" y1="95" x2="180" y2="85" stroke="#fcd34d" stroke-width="3" opacity="0.7"/>
    <line x1="100" y1="80" x2="100" y2="65" stroke="#fcd34d" stroke-width="3" opacity="0.7"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Tung Tung Sahur</text>` },

  { id: 'cappuccino-assassino', rarity: 'Legendary', art: `
    <path d="M55,90 L65,158 H135 L145,90 Z" fill="#3e1f08"/>
    <path d="M145,105 Q175,105 175,130 Q175,155 145,155" fill="none" stroke="#3e1f08" stroke-width="12"/>
    <ellipse cx="100" cy="90" rx="45" ry="15" fill="#6f3a1e"/>
    <ellipse cx="100" cy="88" rx="42" ry="13" fill="#f5deb3"/>
    <path d="M90,84 Q90,77 95,79 Q100,74 105,79 Q110,77 110,84 Q110,91 100,96 Q90,91 90,84" fill="#8B4513" opacity="0.6"/>
    <line x1="60" y1="50" x2="75" y2="90" stroke="#aaa" stroke-width="4"/>
    <polygon points="60,50 55,38 65,38" fill="#aaa"/>
    <line x1="73" y1="50" x2="73" y2="55" stroke="#FFD700" stroke-width="5"/>
    <line x1="140" y1="50" x2="125" y2="90" stroke="#aaa" stroke-width="4"/>
    <polygon points="140,50 135,38 145,38" fill="#aaa"/>
    <line x1="127" y1="50" x2="127" y2="55" stroke="#FFD700" stroke-width="5"/>
    <path d="M80,75 Q75,60 80,45" fill="none" stroke="white" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    <path d="M100,72 Q95,57 100,42" fill="none" stroke="white" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    <path d="M120,75 Q115,60 120,45" fill="none" stroke="white" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Cappuccino Assassino</text>` },

  { id: 'lirili-larila', rarity: 'Epic', art: `
    <ellipse cx="105" cy="125" rx="58" ry="48" fill="#808080"/>
    <circle cx="75" cy="88" r="38" fill="#909090"/>
    <ellipse cx="45" cy="88" rx="22" ry="30" fill="#b0b0b0"/>
    <ellipse cx="47" cy="88" rx="15" ry="22" fill="#ff9999" opacity="0.4"/>
    <path d="M58,108 Q30,130 28,155 Q26,165 35,168" fill="none" stroke="#808080" stroke-width="16" stroke-linecap="round"/>
    <circle cx="68" cy="80" r="8" fill="white"/>
    <circle cx="70" cy="80" r="5" fill="#1a1a1a"/>
    <circle cx="71" cy="79" r="2" fill="white"/>
    <path d="M55,105 Q40,118 42,128" fill="none" stroke="#fffde7" stroke-width="6" stroke-linecap="round"/>
    <line x1="145" y1="125" x2="140" y2="65" stroke="#795548" stroke-width="7"/>
    <ellipse cx="130" cy="62" rx="22" ry="12" fill="#388e3c" transform="rotate(-30,130,62)"/>
    <ellipse cx="148" cy="58" rx="22" ry="12" fill="#388e3c" transform="rotate(10,148,58)"/>
    <ellipse cx="158" cy="70" rx="22" ry="12" fill="#388e3c" transform="rotate(40,158,70)"/>
    <rect x="65" y="165" width="22" height="25" rx="11" fill="#707070"/>
    <rect x="100" y="165" width="22" height="25" rx="11" fill="#707070"/>
    <rect x="130" y="165" width="22" height="25" rx="11" fill="#707070"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Lirili Larila</text>` },

  { id: 'glorbo-frogini', rarity: 'Epic', art: `
    <ellipse cx="100" cy="125" rx="58" ry="48" fill="#4ade80"/>
    <ellipse cx="100" cy="132" rx="38" ry="32" fill="#bbf7d0"/>
    <circle cx="100" cy="85" r="45" fill="#4ade80"/>
    <circle cx="72" cy="65" r="18" fill="#bbf7d0"/>
    <circle cx="128" cy="65" r="18" fill="#bbf7d0"/>
    <circle cx="75" cy="65" r="12" fill="#1a1a1a"/>
    <circle cx="131" cy="65" r="12" fill="#1a1a1a"/>
    <circle cx="78" cy="62" r="4" fill="white"/>
    <circle cx="134" cy="62" r="4" fill="white"/>
    <path d="M62,100 Q100,122 138,100" fill="none" stroke="#166534" stroke-width="4"/>
    <path d="M82,100 Q100,112 118,100" fill="#f87171" opacity="0.7"/>
    <circle cx="55" cy="118" r="8" fill="#22c55e"/>
    <circle cx="148" cy="115" r="8" fill="#22c55e"/>
    <path d="M55,155 Q30,175 20,165" fill="none" stroke="#4ade80" stroke-width="18" stroke-linecap="round"/>
    <path d="M145,155 Q170,175 180,165" fill="none" stroke="#4ade80" stroke-width="18" stroke-linecap="round"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Glorbo Frogini</text>` },

  { id: 'frigo-camelo', rarity: 'Rare', art: `
    <rect x="55" y="80" width="90" height="105" rx="10" fill="#e8e8e8"/>
    <rect x="55" y="80" width="90" height="55" rx="10" fill="#f0f0f0"/>
    <rect x="55" y="132" width="90" height="5" fill="#ccc"/>
    <rect x="130" y="95" width="8" height="35" rx="4" fill="#aaa"/>
    <rect x="130" y="148" width="8" height="25" rx="4" fill="#aaa"/>
    <rect x="63" y="88" width="74" height="40" rx="5" fill="#bfdbfe" opacity="0.5"/>
    <ellipse cx="80" cy="72" rx="22" ry="25" fill="#d4a373"/>
    <ellipse cx="120" cy="65" rx="22" ry="28" fill="#d4a373"/>
    <ellipse cx="148" cy="92" rx="15" ry="20" fill="#d4a373"/>
    <ellipse cx="158" cy="80" rx="12" ry="16" fill="#d4a373"/>
    <ellipse cx="162" cy="74" rx="10" ry="7" fill="#c49a63"/>
    <circle cx="158" cy="73" r="2" fill="#8B6914"/>
    <circle cx="165" cy="73" r="2" fill="#8B6914"/>
    <circle cx="155" cy="68" r="5" fill="white"/>
    <circle cx="156" cy="68" r="3" fill="#1a1a1a"/>
    <rect x="65" y="182" width="14" height="15" rx="7" fill="#c49a63"/>
    <rect x="85" y="182" width="14" height="15" rx="7" fill="#c49a63"/>
    <rect x="100" y="182" width="14" height="15" rx="7" fill="#c49a63"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Frigo Camelo</text>` },

  { id: 'chimpanzini-bananini', rarity: 'Rare', art: `
    <ellipse cx="100" cy="130" rx="48" ry="50" fill="#8B4513"/>
    <ellipse cx="100" cy="135" rx="32" ry="38" fill="#CD853F"/>
    <circle cx="100" cy="82" r="40" fill="#8B4513"/>
    <ellipse cx="100" cy="90" rx="25" ry="22" fill="#CD853F"/>
    <circle cx="62" cy="82" r="14" fill="#8B4513"/>
    <circle cx="62" cy="82" r="9" fill="#CD853F"/>
    <circle cx="138" cy="82" r="14" fill="#8B4513"/>
    <circle cx="138" cy="82" r="9" fill="#CD853F"/>
    <circle cx="88" cy="76" r="8" fill="white"/>
    <circle cx="112" cy="76" r="8" fill="white"/>
    <circle cx="90" cy="76" r="5" fill="#1a1a1a"/>
    <circle cx="114" cy="76" r="5" fill="#1a1a1a"/>
    <circle cx="91" cy="75" r="2" fill="white"/>
    <circle cx="115" cy="75" r="2" fill="white"/>
    <circle cx="95" cy="90" r="3" fill="#6B3A2A"/>
    <circle cx="105" cy="90" r="3" fill="#6B3A2A"/>
    <path d="M80,98 Q100,112 120,98" fill="none" stroke="#6B3A2A" stroke-width="3"/>
    <path d="M130,90 Q165,75 170,100 Q165,115 150,110" fill="#FFE135" stroke="#DAA520" stroke-width="2"/>
    <path d="M148,115 Q155,130 148,148" fill="none" stroke="#8B4513" stroke-width="18" stroke-linecap="round"/>
    <text x="100" y="197" font-size="9" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Chimpanzini</text>` },

  { id: 'brr-brr-patapim', rarity: 'Rare', art: `
    <ellipse cx="100" cy="120" rx="48" ry="55" fill="#4fc3f7"/>
    <circle cx="100" cy="72" r="35" fill="#29b6f6"/>
    <polygon points="100,68 78,76 78,84" fill="#ff9800"/>
    <circle cx="108" cy="65" r="9" fill="white"/>
    <circle cx="110" cy="65" r="6" fill="#1a1a1a"/>
    <circle cx="111" cy="64" r="2" fill="white"/>
    <path d="M52,108 Q25,90 20,115 Q25,135 52,132" fill="#29b6f6"/>
    <path d="M148,108 Q175,90 180,115 Q175,135 148,132" fill="#29b6f6"/>
    <path d="M100,37 Q95,22 90,12" fill="none" stroke="#0288d1" stroke-width="5" stroke-linecap="round"/>
    <path d="M100,37 Q100,20 100,10" fill="none" stroke="#0288d1" stroke-width="5" stroke-linecap="round"/>
    <path d="M100,37 Q105,22 110,12" fill="none" stroke="#0288d1" stroke-width="5" stroke-linecap="round"/>
    <line x1="22" y1="100" x2="12" y2="95" stroke="white" stroke-width="2.5" opacity="0.8"/>
    <line x1="178" y1="100" x2="188" y2="95" stroke="white" stroke-width="2.5" opacity="0.8"/>
    <line x1="22" y1="115" x2="10" y2="115" stroke="white" stroke-width="2.5" opacity="0.8"/>
    <line x1="178" y1="115" x2="190" y2="115" stroke="white" stroke-width="2.5" opacity="0.8"/>
    <path d="M80,170 Q68,180 58,175" fill="none" stroke="#ff9800" stroke-width="6" stroke-linecap="round"/>
    <path d="M80,170 Q72,185 62,185" fill="none" stroke="#ff9800" stroke-width="6" stroke-linecap="round"/>
    <path d="M120,170 Q132,180 142,175" fill="none" stroke="#ff9800" stroke-width="6" stroke-linecap="round"/>
    <path d="M120,170 Q128,185 138,185" fill="none" stroke="#ff9800" stroke-width="6" stroke-linecap="round"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Brr Brr Patapim</text>` },

  { id: 'giraffa-celeste', rarity: 'Rare', art: `
    <circle cx="40" cy="40" r="25" fill="#87ceeb" opacity="0.3"/>
    <circle cx="160" cy="50" r="20" fill="#87ceeb" opacity="0.25"/>
    <rect x="70" y="145" width="14" height="50" rx="7" fill="#F4A460"/>
    <rect x="92" y="145" width="14" height="50" rx="7" fill="#F4A460"/>
    <rect x="112" y="145" width="14" height="50" rx="7" fill="#F4A460"/>
    <ellipse cx="100" cy="140" rx="45" ry="38" fill="#F4A460"/>
    <ellipse cx="85" cy="128" rx="10" ry="8" fill="#8B4513" opacity="0.5"/>
    <ellipse cx="112" cy="135" rx="9" ry="10" fill="#8B4513" opacity="0.5"/>
    <ellipse cx="95" cy="150" rx="8" ry="7" fill="#8B4513" opacity="0.5"/>
    <path d="M82,108 L90,45" fill="none" stroke="#F4A460" stroke-width="26" stroke-linecap="round"/>
    <circle cx="78" cy="88" r="8" fill="#8B4513" opacity="0.4"/>
    <circle cx="90" cy="68" r="7" fill="#8B4513" opacity="0.4"/>
    <ellipse cx="95" cy="40" rx="20" ry="16" fill="#F4A460"/>
    <rect x="88" y="23" width="5" height="12" rx="2" fill="#8B4513"/>
    <rect x="100" y="23" width="5" height="12" rx="2" fill="#8B4513"/>
    <circle cx="90" cy="23" r="3" fill="#8B4513"/>
    <circle cx="102" cy="23" r="3" fill="#8B4513"/>
    <circle cx="103" cy="38" r="6" fill="white"/>
    <circle cx="104" cy="38" r="4" fill="#1a1a1a"/>
    <circle cx="105" cy="37" r="1.5" fill="white"/>
    <polygon points="168,30 170,25 172,30 177,30 173,33 175,38 170,35 165,38 167,33 163,30" fill="#87ceeb"/>
    <polygon points="25,75 27,70 29,75 34,75 30,78 32,83 27,80 22,83 24,78 20,75" fill="#87ceeb"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Giraffa Celeste</text>` },

  { id: 'crocodillo-porpora', rarity: 'Common', art: `
    <ellipse cx="105" cy="120" rx="68" ry="45" fill="#9b59b6"/>
    <path d="M165,110 Q195,108 192,130 Q190,145 170,140" fill="#8e44ad"/>
    <ellipse cx="88" cy="100" rx="10" ry="7" fill="#8e44ad" opacity="0.6"/>
    <ellipse cx="112" cy="98" rx="10" ry="7" fill="#8e44ad" opacity="0.6"/>
    <ellipse cx="136" cy="103" rx="10" ry="7" fill="#8e44ad" opacity="0.6"/>
    <ellipse cx="65" cy="155" rx="16" ry="12" fill="#8e44ad"/>
    <ellipse cx="100" cy="158" rx="16" ry="12" fill="#8e44ad"/>
    <ellipse cx="135" cy="155" rx="16" ry="12" fill="#8e44ad"/>
    <ellipse cx="45" cy="110" rx="38" ry="24" fill="#9b59b6"/>
    <ellipse cx="18" cy="118" rx="22" ry="14" fill="#8e44ad"/>
    <circle cx="10" cy="113" r="3" fill="#6c3483"/>
    <circle cx="22" cy="112" r="3" fill="#6c3483"/>
    <polygon points="5,113 10,113 7.5,122" fill="white"/>
    <polygon points="18,112 23,112 20.5,121" fill="white"/>
    <polygon points="31,113 36,113 33.5,122" fill="white"/>
    <ellipse cx="40" cy="98" rx="10" ry="8" fill="#c39bd3"/>
    <circle cx="42" cy="98" r="5" fill="#4a235a"/>
    <circle cx="43" cy="97" r="2" fill="white"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Crocodillo Porpora</text>` },

  { id: 'patapim-verde', rarity: 'Common', art: `
    <ellipse cx="100" cy="120" rx="45" ry="50" fill="#2ecc71"/>
    <circle cx="100" cy="75" r="32" fill="#27ae60"/>
    <polygon points="100,72 80,80 80,86" fill="#f39c12"/>
    <circle cx="108" cy="68" r="8" fill="white"/>
    <circle cx="110" cy="68" r="5" fill="#1a1a1a"/>
    <circle cx="111" cy="67" r="2" fill="white"/>
    <path d="M100,43 Q92,28 85,18" fill="none" stroke="#1a8a48" stroke-width="6" stroke-linecap="round"/>
    <path d="M100,43 Q100,26 98,15" fill="none" stroke="#1a8a48" stroke-width="6" stroke-linecap="round"/>
    <path d="M100,43 Q108,28 115,18" fill="none" stroke="#1a8a48" stroke-width="6" stroke-linecap="round"/>
    <circle cx="85" cy="17" r="5" fill="#27ae60"/>
    <circle cx="98" cy="14" r="5" fill="#27ae60"/>
    <circle cx="115" cy="17" r="5" fill="#27ae60"/>
    <path d="M55,112 Q28,95 22,118 Q28,138 55,135" fill="#27ae60"/>
    <path d="M145,112 Q172,95 178,118 Q172,138 145,135" fill="#27ae60"/>
    <ellipse cx="100" cy="125" rx="28" ry="36" fill="#a9dfbf"/>
    <path d="M82,165 Q72,178 62,173" fill="none" stroke="#f39c12" stroke-width="5" stroke-linecap="round"/>
    <path d="M82,165 Q75,182 65,182" fill="none" stroke="#f39c12" stroke-width="5" stroke-linecap="round"/>
    <path d="M118,165 Q128,178 138,173" fill="none" stroke="#f39c12" stroke-width="5" stroke-linecap="round"/>
    <path d="M118,165 Q125,182 135,182" fill="none" stroke="#f39c12" stroke-width="5" stroke-linecap="round"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Patapim Verde</text>` },

  { id: 'bananini-classico', rarity: 'Common', art: `
    <path d="M65,160 Q45,120 55,70 Q70,30 100,25 Q130,22 150,50 Q165,75 155,120 Q145,160 120,170 Q95,178 65,160Z" fill="#FFE135"/>
    <path d="M80,155 Q62,118 70,72 Q82,38 105,32" fill="none" stroke="#DAA520" stroke-width="4" opacity="0.6"/>
    <path d="M65,160 Q58,168 55,172" fill="none" stroke="#8B6914" stroke-width="6" stroke-linecap="round"/>
    <path d="M120,170 Q125,175 128,178" fill="none" stroke="#8B6914" stroke-width="6" stroke-linecap="round"/>
    <path d="M100,25 Q98,15 102,8" fill="none" stroke="#8B6914" stroke-width="6" stroke-linecap="round"/>
    <path d="M140,155 Q125,130 130,100 Q138,75 155,72 Q165,72 170,88 Q175,105 165,130 Q155,155 140,155Z" fill="#FFE135" opacity="0.8"/>
    <circle cx="95" cy="95" r="6" fill="#1a1a1a" opacity="0.4"/>
    <circle cx="115" cy="95" r="6" fill="#1a1a1a" opacity="0.4"/>
    <path d="M88,112 Q105,122 122,112" fill="none" stroke="#1a1a1a" stroke-width="3" opacity="0.4"/>
    <circle cx="40" cy="60" r="5" fill="#FFD700" opacity="0.7"/>
    <circle cx="165" cy="45" r="4" fill="#FFD700" opacity="0.7"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Bananini Classico</text>` },

  { id: 'frogini-basic', rarity: 'Common', art: `
    <ellipse cx="100" cy="125" rx="52" ry="45" fill="#5cb85c"/>
    <ellipse cx="100" cy="132" rx="35" ry="30" fill="#a8d5a2"/>
    <circle cx="100" cy="85" r="40" fill="#5cb85c"/>
    <circle cx="76" cy="70" r="16" fill="#6dca6d"/>
    <circle cx="124" cy="70" r="16" fill="#6dca6d"/>
    <circle cx="76" cy="70" r="10" fill="#222"/>
    <circle cx="124" cy="70" r="10" fill="#222"/>
    <circle cx="79" cy="68" r="3.5" fill="white"/>
    <circle cx="127" cy="68" r="3.5" fill="white"/>
    <path d="M68,100 Q100,115 132,100" fill="none" stroke="#3d7a3d" stroke-width="3.5"/>
    <path d="M55,155 Q35,170 25,160" fill="none" stroke="#5cb85c" stroke-width="16" stroke-linecap="round"/>
    <path d="M145,155 Q165,170 175,160" fill="none" stroke="#5cb85c" stroke-width="16" stroke-linecap="round"/>
    <path d="M25,160 Q15,168 10,165" fill="none" stroke="#5cb85c" stroke-width="8" stroke-linecap="round"/>
    <path d="M25,160 Q20,172 15,172" fill="none" stroke="#5cb85c" stroke-width="8" stroke-linecap="round"/>
    <path d="M175,160 Q185,168 190,165" fill="none" stroke="#5cb85c" stroke-width="8" stroke-linecap="round"/>
    <path d="M175,160 Q180,172 185,172" fill="none" stroke="#5cb85c" stroke-width="8" stroke-linecap="round"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Frogini Basic</text>` },

  { id: 'assassino-elite', rarity: 'Secret', art: `
    <circle cx="100" cy="105" r="80" fill="#1a0000" opacity="0.5"/>
    <path d="M30,80 Q40,30 100,25 Q160,30 170,80 L175,190 H25 Z" fill="#1a1a2e"/>
    <path d="M40,80 Q50,45 100,40 Q150,45 160,80 L165,170 H35 Z" fill="#16213e"/>
    <ellipse cx="100" cy="90" rx="30" ry="35" fill="#0f0f1a"/>
    <circle cx="88" cy="85" r="6" fill="#ff0000"/>
    <circle cx="112" cy="85" r="6" fill="#ff0000"/>
    <circle cx="88" cy="85" r="3" fill="#ff6666"/>
    <circle cx="112" cy="85" r="3" fill="#ff6666"/>
    <line x1="55" y1="125" x2="95" y2="160" stroke="#aaa" stroke-width="5"/>
    <polygon points="55,125 48,115 62,118" fill="#ddd"/>
    <rect x="92" y="157" width="6" height="10" rx="2" fill="#DAA520"/>
    <line x1="145" y1="125" x2="105" y2="160" stroke="#aaa" stroke-width="5"/>
    <polygon points="145,125 152,115 138,118" fill="#ddd"/>
    <rect x="102" y="157" width="6" height="10" rx="2" fill="#DAA520"/>
    <path d="M85,170 Q84,178 85,183" fill="none" stroke="#cc0000" stroke-width="3" stroke-linecap="round"/>
    <path d="M100,172 Q99,182 100,188" fill="none" stroke="#cc0000" stroke-width="3" stroke-linecap="round"/>
    <path d="M115,170 Q114,178 115,183" fill="none" stroke="#cc0000" stroke-width="3" stroke-linecap="round"/>
    <circle cx="35" cy="65" r="4" fill="#6a0dad" opacity="0.7"/>
    <circle cx="165" cy="65" r="4" fill="#6a0dad" opacity="0.7"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Assassino Elite</text>` },

  { id: 'sahur-supremo', rarity: 'Legendary', art: `
    <ellipse cx="100" cy="145" rx="58" ry="22" fill="#B8860B"/>
    <rect x="42" y="110" width="116" height="35" fill="#CD853F"/>
    <ellipse cx="100" cy="110" rx="58" ry="20" fill="#FFD700"/>
    <ellipse cx="100" cy="110" rx="48" ry="14" fill="#FFFACD" opacity="0.5"/>
    <path d="M65,90 L65,60 L80,75 L100,50 L120,75 L135,60 L135,90 Z" fill="#FFD700"/>
    <circle cx="80" cy="73" r="6" fill="#e74c3c"/>
    <circle cx="100" cy="60" r="8" fill="#3498db"/>
    <circle cx="120" cy="73" r="6" fill="#27ae60"/>
    <rect x="65" y="85" width="70" height="8" rx="4" fill="#DAA520"/>
    <rect x="55" y="42" width="10" height="75" rx="5" fill="#DAA520" transform="rotate(-25,60,79)"/>
    <circle cx="46" cy="45" r="13" fill="#FFD700"/>
    <circle cx="46" cy="45" r="8" fill="#FFFACD"/>
    <rect x="128" y="42" width="10" height="75" rx="5" fill="#DAA520" transform="rotate(25,133,79)"/>
    <circle cx="148" cy="45" r="13" fill="#FFD700"/>
    <circle cx="148" cy="45" r="8" fill="#FFFACD"/>
    <polygon points="100,15 103,22 110,22 105,27 107,34 100,30 93,34 95,27 90,22 97,22" fill="#FFD700"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Sahur Supremo</text>` },

  { id: 'celeste-raro', rarity: 'Epic', art: `
    <circle cx="52" cy="45" r="4" fill="white" opacity="0.4"/>
    <circle cx="148" cy="35" r="3" fill="white" opacity="0.4"/>
    <circle cx="30" cy="130" r="2" fill="white" opacity="0.3"/>
    <circle cx="170" cy="120" r="3" fill="white" opacity="0.3"/>
    <polygon points="100,25 112,58 148,58 120,78 130,112 100,92 70,112 80,78 52,58 88,58" fill="#c8b8fa"/>
    <polygon points="100,40 109,62 133,62 115,76 122,100 100,85 78,100 85,76 67,62 91,62" fill="#7c3aed"/>
    <polygon points="100,52 107,68 124,68 111,78 116,95 100,85 84,95 89,78 76,68 93,68" fill="#a78bfa"/>
    <circle cx="100" cy="73" r="18" fill="#ddd6fe"/>
    <circle cx="100" cy="73" r="13" fill="#7c3aed"/>
    <circle cx="100" cy="73" r="8" fill="#c4b5fd"/>
    <circle cx="96" cy="70" r="3" fill="white" opacity="0.8"/>
    <circle cx="148" cy="73" r="5" fill="#e9d5ff"/>
    <circle cx="52" cy="73" r="5" fill="#e9d5ff"/>
    <circle cx="100" cy="130" r="5" fill="#e9d5ff"/>
    <circle cx="100" cy="73" r="32" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.3"/>
    <circle cx="100" cy="73" r="44" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.2"/>
    <text x="100" y="155" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Celeste Raro</text>` },

  { id: 'porpora-antico', rarity: 'Rare', art: `
    <circle cx="30" cy="50" r="15" fill="#4a235a" opacity="0.3"/>
    <circle cx="170" cy="150" r="15" fill="#4a235a" opacity="0.3"/>
    <ellipse cx="105" cy="122" rx="65" ry="45" fill="#7b4fa0" opacity="0.9"/>
    <path d="M65,112 L75,122 L65,132" fill="none" stroke="#f5e6d3" stroke-width="2" opacity="0.5"/>
    <path d="M95,108 L105,118 L95,128" fill="none" stroke="#f5e6d3" stroke-width="2" opacity="0.5"/>
    <path d="M125,112 L135,122 L125,132" fill="none" stroke="#f5e6d3" stroke-width="2" opacity="0.5"/>
    <path d="M162,112 Q195,105 190,132 Q188,148 165,142" fill="#6a3d8f"/>
    <ellipse cx="68" cy="158" rx="16" ry="12" fill="#6a3d8f"/>
    <ellipse cx="103" cy="160" rx="16" ry="12" fill="#6a3d8f"/>
    <ellipse cx="138" cy="158" rx="16" ry="12" fill="#6a3d8f"/>
    <ellipse cx="46" cy="112" rx="38" ry="24" fill="#8b5cb3"/>
    <path d="M25,92 L32,75 L40,90 L48,72 L56,90 L63,76 L68,92" fill="#c9a227"/>
    <ellipse cx="18" cy="118" rx="22" ry="12" fill="#7b4fa0"/>
    <ellipse cx="42" cy="100" rx="12" ry="9" fill="#d4b8e0"/>
    <circle cx="44" cy="100" r="6" fill="#2c0f3d"/>
    <circle cx="45" cy="99" r="2" fill="#d4b8e0"/>
    <polygon points="5,112 10,112 7.5,120" fill="#f5e6d3"/>
    <polygon points="17,111 22,111 19.5,119" fill="#f5e6d3"/>
    <polygon points="29,112 34,112 31.5,120" fill="#f5e6d3"/>
    <text x="100" y="195" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Porpora Antico</text>` },

  { id: 'verde-comune', rarity: 'Common', art: `
    <path d="M100,25 Q145,22 162,55 Q178,85 172,120 Q168,155 145,170 Q118,185 88,178 Q55,170 38,145 Q22,118 28,85 Q35,52 62,35 Q78,25 100,25Z" fill="#52b788"/>
    <path d="M72,38 Q95,30 118,38 Q105,32 90,33 Q80,34 72,38Z" fill="white" opacity="0.25"/>
    <circle cx="82" cy="95" r="10" fill="white"/>
    <circle cx="118" cy="95" r="10" fill="white"/>
    <circle cx="85" cy="97" r="7" fill="#2d6a4f"/>
    <circle cx="121" cy="97" r="7" fill="#2d6a4f"/>
    <circle cx="87" cy="95" r="3" fill="white"/>
    <circle cx="123" cy="95" r="3" fill="white"/>
    <path d="M75,118 Q100,135 125,118" fill="none" stroke="#2d6a4f" stroke-width="4" stroke-linecap="round"/>
    <circle cx="145" cy="55" r="5" fill="#74c69d" opacity="0.8"/>
    <circle cx="55" cy="145" r="4" fill="#74c69d" opacity="0.6"/>
    <path d="M148,158 Q162,148 170,155 Q162,168 148,158Z" fill="#40916c"/>
    <line x1="148" y1="158" x2="160" y2="153" stroke="#2d6a4f" stroke-width="1.5"/>
    <text x="100" y="197" font-size="10" text-anchor="middle" fill="white" opacity="0.8" font-family="sans-serif">Verde Comune</text>` },
];

for (const item of items) {
  const svg = makeSVG(item.id, item.rarity, item.art);
  const path = join(OUT, item.id + '.svg');
  writeFileSync(path, svg, 'utf8');
  console.log('✓ ' + item.id + '.svg');
}

console.log('\nDone! Generated', items.length, 'SVG images.');
