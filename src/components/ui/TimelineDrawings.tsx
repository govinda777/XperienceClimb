import React from 'react';

export interface TimelineDrawingProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * 1. Escalada na Rocha (Climbing Rock Drawing)
 * Ilustração vetorial com paredão de granito, escalador equipado em ação,
 * corda dinâmica, costura expressa (quickdraw) e linhas topográficas de montanha.
 */
export function ClimbingRockDrawing({ className = '', ...props }: TimelineDrawingProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E383F" />
          <stop offset="50%" stopColor="#242C32" />
          <stop offset="100%" stopColor="#181E22" />
        </linearGradient>
        <linearGradient id="skyAmbient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F7F4EC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EDE6D6" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#FB8500" />
        </linearGradient>
      </defs>

      {/* Fundo Atmosférico de Papel Outdoor */}
      <rect width="320" height="220" rx="16" fill="url(#skyAmbient)" />

      {/* Linhas Topográficas de Altitude (Contorno Geográfico) */}
      <path
        d="M -10 40 C 60 25, 140 50, 220 30 C 270 18, 305 32, 330 20"
        stroke="#D8CFBE"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <path
        d="M -10 75 C 80 60, 160 85, 250 65 C 290 55, 315 68, 330 58"
        stroke="#D8CFBE"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <path
        d="M -10 115 C 90 100, 180 120, 270 105 C 300 100, 320 106, 330 102"
        stroke="#D8CFBE"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Paredão Granítico de Pedra Bela (Lado Esquerdo & Fundo) */}
      <path
        d="M 0 0 L 145 0 L 125 45 L 140 85 L 115 130 L 135 180 L 105 220 L 0 220 Z"
        fill="url(#rockGrad)"
      />
      {/* Facetas de Fratura da Rocha (Luz e Sombra Geológica) */}
      <path d="M 145 0 L 125 45 L 85 30 L 110 0 Z" fill="#3A4750" opacity="0.6" />
      <path d="M 125 45 L 140 85 L 100 70 L 85 30 Z" fill="#1F262B" opacity="0.8" />
      <path d="M 140 85 L 115 130 L 75 110 L 100 70 Z" fill="#3A4750" opacity="0.5" />
      <path d="M 115 130 L 135 180 L 90 165 L 75 110 Z" fill="#1A2024" opacity="0.9" />
      <path d="M 135 180 L 105 220 L 60 220 L 90 165 Z" fill="#3A4750" opacity="0.6" />

      {/* Ranhuras e Fissuras Técnicas na Rocha */}
      <path
        d="M 65 20 L 75 55 L 70 95 L 80 145 L 68 190"
        stroke="#121619"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 110 50 L 118 72 L 108 98"
        stroke="#52616B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 85 135 L 92 155 L 86 175"
        stroke="#52616B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Chapeleta de Proteção em Aço Inox (Bolt Hanger) */}
      <circle cx="120" cy="98" r="4" fill="#A4B0BE" stroke="#57606F" strokeWidth="1.2" />
      <circle cx="120" cy="98" r="1.8" fill="#2F3542" />

      {/* Costura Expressa (Quickdraw) Conectada à Chapeleta */}
      {/* Fita Expressa */}
      <rect x="118" y="102" width="4" height="18" rx="2" fill="#2E473B" />
      {/* Mosquetão Superior */}
      <path
        d="M 117 96 C 114 96 112 100 114 104 C 116 107 121 106 123 104 C 125 101 123 96 117 96 Z"
        stroke="#FFB703"
        strokeWidth="1.6"
        fill="none"
      />
      {/* Mosquetão Inferior */}
      <path
        d="M 118 118 C 115 118 113 123 116 127 C 119 130 124 129 126 126 C 128 122 125 118 118 118 Z"
        stroke="#FFB703"
        strokeWidth="1.8"
        fill="none"
      />

      {/* Corda Dinâmica UIAA (Passando pelo Mosquetão até o Escalador) */}
      <path
        d="M 75 220 C 85 190, 110 155, 120 125 C 125 110, 150 115, 175 108 C 190 104, 198 100, 204 96"
        stroke="url(#ropeGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ======================================================== */}
      {/* O ESCALADOR EM AÇÃO (Equipado, dinâmico e focado)         */}
      {/* ======================================================== */}
      <g transform="translate(142, 38)">
        {/* Braço Esquerdo (Estendido para cima, segurando agarre no topo) */}
        <path
          d="M 38 48 L 18 24 L -18 16"
          stroke="#D48B6A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Mão Esquerda no Agarrão */}
        <circle cx="-18" cy="16" r="4.5" fill="#B25D42" />

        {/* Perna Esquerda (Apoiada em fenda na rocha) */}
        <path
          d="M 46 88 L 22 96 L -8 92"
          stroke="#1E2832"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sapatilha de Escalada Esquerda */}
        <path
          d="M -8 92 L -18 90 L -16 97 L -6 96 Z"
          fill="#FFB703"
          stroke="#B25D42"
          strokeWidth="1"
        />

        {/* Perna Direita (Esticada para equilíbrio - técnica de Smearing) */}
        <path
          d="M 58 88 L 74 114 L 62 136"
          stroke="#1E2832"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sapatilha de Escalada Direita */}
        <path
          d="M 62 136 L 54 145 L 63 148 L 70 140 Z"
          fill="#FFB703"
          stroke="#B25D42"
          strokeWidth="1"
        />

        {/* Tronco / Camiseta Técnica Outdoor */}
        <path d="M 34 50 L 58 46 L 66 84 L 40 88 Z" fill="#2E473B" rx="4" />

        {/* Baudrier / Arnês de Escalada (Cintura e Pernas) */}
        <rect x="38" y="80" width="28" height="9" rx="3" fill="#B25D42" />
        {/* Nó Oito Guiado Conectado ao Arnês */}
        <circle cx="48" cy="84" r="3.5" fill="#FFB703" stroke="#B25D42" strokeWidth="1" />

        {/* Braço Direito (Flexionado, aplicando força de tração) */}
        <path
          d="M 56 48 L 76 34 L 56 18"
          stroke="#D48B6A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Mão Direita no Agarre */}
        <circle cx="56" cy="18" r="4.5" fill="#B25D42" />

        {/* Cabeça / Pescoço */}
        <circle cx="48" cy="36" r="8" fill="#D48B6A" />

        {/* Capacete de Escalada Homologado CE/UIAA */}
        <path d="M 40 33 C 40 22, 58 20, 59 33 Z" fill="#B25D42" />
        <path d="M 38 33 L 61 33" stroke="#8A3E26" strokeWidth="2" strokeLinecap="round" />
        {/* Fita Jugular do Capacete */}
        <path d="M 43 33 L 47 41 L 52 33" stroke="#2A2A2A" strokeWidth="1.2" fill="none" />

        {/* Saco de Magnésio (Chalk Bag) na Cintura */}
        <rect
          x="31"
          y="81"
          width="8"
          height="11"
          rx="3"
          fill="#D48B6A"
          stroke="#8A3E26"
          strokeWidth="1"
        />
      </g>

      {/* Pequenas Nuvens e Vegetação Rupestre */}
      <path
        d="M 240 45 C 248 38, 262 38, 270 45 C 278 40, 292 42, 296 50 C 278 54, 255 54, 240 45 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />
      {/* Bromélia / Arbusto de Altitude na fenda da rocha */}
      <path
        d="M 125 180 C 135 174, 145 177, 148 182 C 140 186, 132 185, 125 180 Z"
        fill="#4A6B53"
      />
      <path
        d="M 126 181 C 132 170, 140 171, 142 176 C 137 179, 131 180, 126 181 Z"
        fill="#2E473B"
      />

      {/* Tag Técnica de Altitude Vetorial */}
      <g transform="translate(230, 185)">
        <rect width="78" height="22" rx="6" fill="#181E22" opacity="0.85" />
        <text
          x="39"
          y="15"
          fill="#FFB703"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
        >
          VIA · 5° SUP
        </text>
      </g>
    </svg>
  );
}

/**
 * 2. Saboroso Almoço (Delicious Lunch Drawing)
 * Ilustração vetorial acolhedora da gastronomia rústica caipira/artesanal pós-escalada:
 * mesa de madeira ao ar livre, prato caipira farto, fumaça aromática,
 * caneca clássica de montanhista e frutas/pães da serra.
 */
export function DeliciousLunchDrawing({ className = '', ...props }: TimelineDrawingProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="lunchBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF5EE" />
          <stop offset="100%" stopColor="#EFE5D3" />
        </linearGradient>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#794B2E" />
          <stop offset="100%" stopColor="#53311B" />
        </linearGradient>
        <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0EBE1" />
        </linearGradient>
      </defs>

      {/* Fundo Ambiente Aconchegante */}
      <rect width="320" height="220" rx="16" fill="url(#lunchBg)" />

      {/* Folhagens Botânicas Decorativas no Topo (Sombra de Árvores) */}
      <g opacity="0.75" transform="translate(10, 8)">
        <path d="M 0 0 C 25 15, 60 10, 85 0 C 65 18, 30 25, 0 0 Z" fill="#2E473B" />
        <path d="M 40 8 C 65 25, 105 18, 130 5 C 105 28, 70 30, 40 8 Z" fill="#416B58" />
        <path d="M 230 0 C 255 18, 290 12, 310 0 C 290 20, 260 22, 230 0 Z" fill="#2E473B" />
      </g>

      {/* Mesa Rústica de Madeira / Refúgio de Montanha */}
      <path d="M 15 130 L 305 130 L 320 220 L 0 220 Z" fill="url(#woodGrad)" />
      {/* Borda / Tampo Superior da Mesa */}
      <rect x="15" y="125" width="290" height="8" rx="2" fill="#8C5837" />

      {/* Ranhuras Naturais da Madeira */}
      <path
        d="M 25 155 L 295 155"
        stroke="#422513"
        strokeWidth="1.2"
        strokeDasharray="18 8 35 12"
        opacity="0.6"
      />
      <path
        d="M 20 185 L 300 185"
        stroke="#422513"
        strokeWidth="1.2"
        strokeDasharray="28 12 15 8"
        opacity="0.6"
      />

      {/* Toalha de Mesa de Linho Rústico Artesanal (Centro) */}
      <path d="M 70 126 L 250 126 L 260 220 L 60 220 Z" fill="#FAF8F5" opacity="0.95" />
      {/* Padrão Xadrez Terracota Suave no Linho */}
      <path
        d="M 95 126 L 85 220 M 130 126 L 120 220 M 165 126 L 160 220 M 200 126 L 200 220 M 235 126 L 240 220"
        stroke="#B25D42"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.3"
      />

      {/* ======================================================== */}
      {/* PRATO PRINCIPAL ARTESANAL (Refeição de Montanha Farta)    */}
      {/* ======================================================== */}
      <g transform="translate(160, 162)">
        {/* Sombra Suave sob o Prato */}
        <ellipse cx="0" cy="18" rx="58" ry="12" fill="#3D2416" opacity="0.25" />

        {/* Base Cerâmica do Prato */}
        <ellipse cx="0" cy="8" rx="55" ry="24" fill="#B25D42" />
        <ellipse
          cx="0"
          cy="5"
          rx="52"
          ry="21"
          fill="url(#plateGrad)"
          stroke="#B25D42"
          strokeWidth="1.5"
        />
        <ellipse cx="0" cy="5" rx="42" ry="16" fill="#F4EFE6" />

        {/* Comida Farta: Grãos da Roça, Legumes Tostados e Proteína */}
        {/* Base de Arroz / Grãos da Terra */}
        <ellipse cx="-12" cy="4" rx="20" ry="10" fill="#FAF5E8" />
        {/* Feijão Tropeiro / Cogumelos Salteados */}
        <ellipse cx="14" cy="5" rx="18" ry="9" fill="#8C5837" />
        {/* Legumes Grelhados Dourados */}
        <circle cx="-16" cy="1" r="5" fill="#E07A5F" />
        <circle cx="-6" cy="-2" r="4.5" fill="#F4A261" />
        <circle cx="6" cy="-1" r="5" fill="#E76F51" />
        <circle cx="16" cy="1" r="4" fill="#E0A93B" />
        {/* Folhas Frescas de Manjericão / Alecrim */}
        <path d="M -4 2 C -2 -5, 4 -5, 6 2 C 2 0, -2 0, -4 2 Z" fill="#2E473B" />
        <path d="M 2 4 C 6 0, 12 1, 11 6 C 7 4, 4 4, 2 4 Z" fill="#416B58" />
      </g>

      {/* Espirais de Vapor Aromático Quente Subindo do Prato */}
      <path
        d="M 148 135 C 142 120, 155 105, 146 90 C 140 80, 148 70, 144 60"
        stroke="#B25D42"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 162 132 C 168 118, 158 102, 166 86 C 172 74, 164 64, 168 52"
        stroke="#E07A5F"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      <path
        d="M 174 136 C 180 122, 172 108, 180 94 C 185 84, 180 75, 184 66"
        stroke="#B25D42"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Caneca Esmaltada Clássica de Montanhista (Café da Serra / Chá) */}
      <g transform="translate(236, 142)">
        <ellipse cx="14" cy="24" rx="18" ry="6" fill="#3D2416" opacity="0.25" />
        {/* Asa da Caneca */}
        <path
          d="M 26 6 C 35 6, 35 20, 26 20"
          stroke="#2E473B"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Corpo da Caneca */}
        <rect x="0" y="2" width="26" height="22" rx="4" fill="#2E473B" />
        {/* Borda Prateada / Esmalte */}
        <ellipse cx="13" cy="2" rx="13" ry="3.5" fill="#416B58" stroke="#EAEAEA" strokeWidth="1" />
        {/* Café Negro Quente */}
        <ellipse cx="13" cy="2.5" rx="10.5" ry="2.5" fill="#2B1810" />
        {/* Vaporzinho da Caneca */}
        <path
          d="M 13 -4 C 10 -12, 16 -18, 12 -26"
          stroke="#FAF5EE"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </g>

      {/* Talheres Rústicos (Garfo e Faca ao Lado do Prato) */}
      <g transform="translate(85, 148)">
        {/* Garfo */}
        <path
          d="M 12 0 L 12 28 M 8 0 L 8 10 C 8 14, 16 14, 16 10 L 16 0"
          stroke="#8A95A5"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Cabo de Madeira do Garfo */}
        <rect x="10.5" y="16" width="3" height="18" rx="1.5" fill="#794B2E" />

        {/* Faca */}
        <path d="M -4 28 L -4 14 C -4 4, 3 2, 3 2 L 3 14 Z" fill="#A4B0BE" />
        <rect x="-5.5" y="16" width="3" height="18" rx="1.5" fill="#794B2E" />
      </g>

      {/* Cestinho com Pão Artesanal / Fruta da Época */}
      <g transform="translate(38, 140)">
        <ellipse cx="16" cy="18" rx="18" ry="6" fill="#3D2416" opacity="0.2" />
        {/* Cesto Trançado */}
        <path d="M 0 8 C 0 20, 32 20, 32 8 Z" fill="#C49A6C" stroke="#9E7345" strokeWidth="1.5" />
        {/* Pão Rústico de Fermentação Natural */}
        <ellipse cx="16" cy="7" rx="12" ry="7" fill="#E0A93B" stroke="#9E7345" strokeWidth="1" />
        <path
          d="M 10 5 L 14 9 M 15 4 L 19 8"
          stroke="#794B2E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Tag de Gastronomia Caipira / Local */}
      <g transform="translate(210, 24)">
        <rect width="96" height="22" rx="6" fill="#B25D42" opacity="0.9" />
        <text
          x="48"
          y="15"
          fill="#FFFFFF"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
        >
          FOGÃO · A · LENHA
        </text>
      </g>
    </svg>
  );
}

/**
 * 3. Curtindo o Pôr do Sol (Sunset Celebration Drawing)
 * Ilustração poética do cume da montanha de Pedra Bela ao entardecer:
 * disco solar dourado radiante, camadas onduladas da Mantiqueira em degradê,
 * silhueta de dois amigos celebrando a conquista no platô e andorinhas.
 */
export function SunsetCelebrationDrawing({ className = '', ...props }: TimelineDrawingProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A2545" />
          <stop offset="35%" stopColor="#8A3E4B" />
          <stop offset="65%" stopColor="#D96B43" />
          <stop offset="90%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#FFE0B2" />
        </linearGradient>
        <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="60%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#FB8500" />
        </linearGradient>
        <linearGradient id="mantiqueiraFar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B3A5A" />
          <stop offset="100%" stopColor="#4A2035" />
        </linearGradient>
        <linearGradient id="mantiqueiraMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3F2538" />
          <stop offset="100%" stopColor="#251622" />
        </linearGradient>
      </defs>

      {/* Céu em Degradê Crepuscular da Mantiqueira */}
      <rect width="320" height="220" rx="16" fill="url(#sunsetSky)" />

      {/* Raios Solares Radiantes em Linhas Finas */}
      <g stroke="#FFE8A3" strokeWidth="1" opacity="0.35">
        <line x1="160" y1="120" x2="60" y2="20" strokeDasharray="3 3" />
        <line x1="160" y1="120" x2="110" y2="10" strokeDasharray="4 4" />
        <line x1="160" y1="120" x2="160" y2="5" strokeDasharray="3 3" />
        <line x1="160" y1="120" x2="210" y2="10" strokeDasharray="4 4" />
        <line x1="160" y1="120" x2="260" y2="20" strokeDasharray="3 3" />
      </g>

      {/* O Enorme Sol Dourado Poente Descendo no Horizonte */}
      <circle cx="160" cy="115" r="42" fill="url(#sunGlow)" />
      {/* Halo Externo Solar */}
      <circle cx="160" cy="115" r="54" fill="#FFB703" opacity="0.25" />

      {/* Nuvens Crepusculares Horizontais Finas */}
      <path
        d="M 30 75 Q 80 70 120 75 Q 160 80 210 74 Q 260 70 290 75"
        stroke="#FFE0B2"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 70 98 Q 120 94 170 98 Q 220 102 260 97"
        stroke="#FFE0B2"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Camada Distante 1 da Serra da Mantiqueira */}
      <path
        d="M 0 135 Q 40 122 90 128 Q 140 134 180 124 Q 225 116 265 125 Q 295 130 320 128 L 320 220 L 0 220 Z"
        fill="url(#mantiqueiraFar)"
      />

      {/* Camada Intermediária 2 da Cordilheira */}
      <path
        d="M 0 152 Q 55 142 110 148 Q 170 155 220 144 Q 270 136 320 148 L 320 220 L 0 220 Z"
        fill="url(#mantiqueiraMid)"
      />

      {/* ======================================================== */}
      {/* PLATÔ ROCHOSO DO CUME (Pedra Bela / Primeiro Plano)      */}
      {/* ======================================================== */}
      <path
        d="M 0 178 L 75 168 L 130 174 L 190 166 L 245 170 L 320 162 L 320 220 L 0 220 Z"
        fill="#12161A"
      />
      {/* Destaque Iluminado pela Luz Dourada no Bordo da Rocha */}
      <path
        d="M 0 178 L 75 168 L 130 174 L 190 166 L 245 170 L 320 162"
        stroke="#F4A261"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* ======================================================== */}
      {/* SILHUETA DOS DOIS AMIGOS NO CUME CONTEMPLANDO O PÔR DO SOL */}
      {/* ======================================================== */}
      {/* Amigo 1 (Sentado na beira da pedra com pernas balançando) */}
      <g transform="translate(195, 142)">
        {/* Cabeça */}
        <circle cx="12" cy="0" r="4.5" fill="#12161A" />
        {/* Boné / Silhueta */}
        <path d="M 7 -1 L 18 -1" stroke="#12161A" strokeWidth="2" strokeLinecap="round" />
        {/* Corpo / Tronco relaxado */}
        <path d="M 12 4 L 12 18 L 8 26" stroke="#12161A" strokeWidth="5.5" strokeLinecap="round" />
        {/* Braço apontando para o pôr do sol */}
        <path d="M 12 8 L -2 6 L -16 2" stroke="#12161A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Pernas balançando na pedra */}
        <path
          d="M 8 24 L 8 36 L 14 38"
          stroke="#12161A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Amigo 2 (Sentado ao lado, braço apoiado no joelho) */}
      <g transform="translate(222, 144)">
        {/* Cabeça */}
        <circle cx="10" cy="0" r="4.5" fill="#12161A" />
        {/* Tronco */}
        <path d="M 10 4 L 10 18" stroke="#12161A" strokeWidth="5.5" strokeLinecap="round" />
        {/* Braço apoiado */}
        <path d="M 10 9 L 18 16 L 14 24" stroke="#12161A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Joelho dobrado / Perna */}
        <path
          d="M 10 18 L 18 20 L 16 32"
          stroke="#12161A"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Mochila Técnica de Trekking ao Lado deles */}
      <path d="M 244 154 C 244 148, 252 148, 252 154 L 253 167 L 243 167 Z" fill="#12161A" />

      {/* Andorinhas / Pássaros de Altitude Voando em V */}
      <g stroke="#FFE0B2" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M 80 48 Q 84 44 88 48 Q 92 44 96 48" />
        <path d="M 102 38 Q 105 35 108 38 Q 111 35 114 38" />
        <path d="M 92 60 Q 95 57 98 60 Q 101 57 104 60" />
      </g>

      {/* Tag de Altitude do Cume */}
      <g transform="translate(18, 24)">
        <rect width="90" height="22" rx="6" fill="#12161A" opacity="0.85" />
        <text
          x="45"
          y="15"
          fill="#FFB703"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
        >
          CUME · 1.100m
        </text>
      </g>
    </svg>
  );
}

/**
 * Ícones Vetoriais para os Nós Centrais da Timeline
 */
export function ClimbingNodeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 4l-4 4-3-3-5 5" />
      <path d="M14 4h4v4" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 15.5L15 9" />
    </svg>
  );
}

export function LunchNodeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V2" />
      <path d="M12 11v11" />
      <path d="M8 22h8" />
      <path d="M6 2v4" />
      <path d="M10 2v4" />
      <path d="M14 2v4" />
      <path d="M18 2v4" />
    </svg>
  );
}

export function SunsetNodeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v4" />
      <path d="M4.93 10.93l2.83-2.83" />
      <path d="M2 18h20" />
      <path d="M20 18a8 8 0 0 0-16 0" />
      <path d="M19.07 10.93l-2.83-2.83" />
    </svg>
  );
}
