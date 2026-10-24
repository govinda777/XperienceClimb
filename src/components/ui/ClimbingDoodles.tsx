import React from 'react';

export interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * 1. Bonequinho Escalador (Climber Buddy)
 * Inspirado no traço doodle/hand-drawn com dedinhos arredondados,
 * capacete de escalada e sorriso aventureiro alcançando a pedra.
 */
export function ClimberBuddyDoodle({
  size = 120,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Agarrom / Pedra no topo que ele está segurando */}
      <path
        d="M95 18 C105 14, 125 16, 130 24 C134 31, 128 42, 115 44 C102 46, 92 38, 92 28 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ranhura na rocha */}
      <path
        d="M102 26 C110 24, 118 28, 122 34"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />

      {/* Capacete de escalada */}
      <path
        d="M42 38 C42 22, 60 16, 78 18 C92 20, 98 28, 96 38 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Detalhe da ventilação do capacete */}
      <path
        d="M58 24 C62 23, 72 23, 76 25"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />

      {/* Rosto / Cabeça redonda */}
      <path
        d="M44 40 C40 52, 44 68, 56 74 C70 80, 86 76, 94 62 C98 52, 96 42, 94 38"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Olhinhos expressivos */}
      <path
        d="M62 48 L62 53"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
      <path
        d="M78 47 L78 52"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />

      {/* Sorriso confiante */}
      <path
        d="M65 62 C70 66, 78 65, 82 59"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Braço direito esticado para cima alcançando a pedra */}
      <path
        d="M92 48 C102 44, 108 34, 108 24"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Dedinhos na rocha (3 dedinhos fofos estilo sketch) */}
      <path
        d="M106 18 C108 20, 112 18, 114 22 C116 26, 112 28, 110 30"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tronco / Corpo inclinado na via */}
      <path
        d="M58 76 C52 92, 48 108, 52 120"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M78 74 C82 90, 84 105, 80 118"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Cadeirinha de escalada (Harness) */}
      <path
        d="M50 106 C60 110, 75 110, 84 104"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.1}
        strokeLinecap="round"
      />
      {/* Loop da cadeirinha (belay loop) */}
      <path
        d="M65 106 C65 113, 71 113, 71 106"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />

      {/* Braço esquerdo de apoio com mão de 3 dedinhos */}
      <path
        d="M48 64 C36 72, 28 84, 26 94"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M24 94 C20 96, 20 102, 24 104 C28 106, 32 100, 32 96"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      <path
        d="M28 104 C30 108, 36 106, 36 102"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 2. Mosquetão de Escalada (Carabiner Doodle)
 * Traço solto, com trava rosca e formato ergonômico.
 */
export function CarabinerDoodle({
  size = 80,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Corpo do mosquetão (costas reforçadas) */}
      <path
        d="M38 15 C60 14, 76 26, 76 45 C76 56, 72 72, 72 82 C72 100, 56 108, 38 106 C24 104, 16 92, 16 75 C16 48, 20 20, 38 15 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gatilho e rosca de segurança */}
      <path
        d="M62 44 L62 76"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.3}
        strokeLinecap="round"
      />
      {/* Anel da rosca */}
      <rect
        x="57"
        y="54"
        width="10"
        height="12"
        rx="3"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
      />
      {/* Linhas de atrito da rosca */}
      <line
        x1="59"
        y1="58"
        x2="65"
        y2="58"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      <line
        x1="59"
        y1="62"
        x2="65"
        y2="62"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 3. Montanha & Pedra Bela com Sol Radiante (Mountain Summit Doodle)
 */
export function MountainSummitDoodle({
  size = 110,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Sol radiante no cume */}
      <circle cx="96" cy="28" r="12" stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* Raios de sol soltos */}
      <path d="M96 8 L96 12" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M112 16 L108 20"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M118 32 L113 31"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M80 20 L84 23"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Montanha principal (Pedra do Santuário) */}
      <path
        d="M12 95 L55 24 C58 20, 64 20, 68 25 L118 95"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cume da montanha com neve / sombra da fenda */}
      <path
        d="M48 44 C56 50, 64 42, 72 48 L76 54"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Montanha secundária ao fundo */}
      <path
        d="M74 48 L96 32 C100 29, 105 31, 108 36 L124 72"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Linha de solo / horizonte orgânico */}
      <path
        d="M6 95 C30 92, 90 98, 126 94"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 4. Nó em Oito Duplo (Figure 8 Rope Knot Doodle)
 * O símbolo universal da união e segurança na escalada.
 */
export function FigureEightKnotDoodle({
  size = 90,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Traçado do nó em oito fluido */}
      <path
        d="M32 15 C20 28, 22 45, 38 52 C54 59, 74 65, 72 82 C70 98, 48 102, 34 94 C22 86, 26 72, 38 68 C54 62, 70 54, 68 35 C66 20, 48 12, 32 15 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ponta da corda que entra na cadeirinha */}
      <path
        d="M34 94 C30 102, 28 108, 26 112"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Textura de filamento trançado da corda */}
      <path
        d="M42 22 L46 26"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      <path
        d="M60 32 L64 36"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      <path
        d="M48 62 L52 66"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
      <path
        d="M58 84 L62 88"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 5. Costura de Escalada / Fita Expressa (Quickdraw Doodle)
 */
export function QuickdrawDoodle({
  size = 75,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Mosquetão superior (reto na chapeleta) */}
      <path
        d="M30 12 C46 10, 58 18, 58 32 C58 40, 52 48, 40 48 C28 48, 22 40, 22 28 C22 18, 26 12, 30 12 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="22"
        x2="48"
        y2="40"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />

      {/* Fita tubular de ligação */}
      <path
        d="M34 48 L34 88 M44 48 L44 88"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Costura em "X" na fita de segurança */}
      <line x1="36" y1="58" x2="42" y2="68" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
      <line x1="42" y1="58" x2="36" y2="68" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
      <line x1="36" y1="68" x2="42" y2="78" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
      <line x1="42" y1="68" x2="36" y2="78" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />

      {/* Mosquetão inferior (gatilho curvo para a corda passar) */}
      <path
        d="M32 88 C48 86, 62 94, 62 108 C62 122, 48 132, 34 130 C20 128, 16 118, 16 106 C16 96, 22 88, 32 88 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Gatilho curvado característico */}
      <path
        d="M52 98 C48 104, 48 112, 54 118"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 6. Sapatilha de Escalada (Climbing Shoe Doodle)
 */
export function ClimbingShoeDoodle({
  size = 90,
  strokeColor = 'currentColor',
  strokeWidth = 2.8,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Contorno anatômico com curvatura para reglete */}
      <path
        d="M20 28 C26 22, 40 32, 52 38 C68 44, 88 38, 104 46 C112 50, 114 58, 108 64 C96 72, 70 70, 46 68 C28 66, 14 58, 14 44 C14 36, 16 30, 20 28 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tira do calcanhar (slingshot rand) */}
      <path
        d="M16 48 C24 54, 38 56, 44 56"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      {/* Tiras de velcro ou cadarço cruzado */}
      <path
        d="M50 36 L60 48"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M64 36 L74 48"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Puxador traseiro de calçar */}
      <path
        d="M16 32 C12 28, 10 32, 12 36"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 7. Sublinhado Orgânico Marcador (Hand-Drawn Highlight Underline)
 * Idêntico ao sublinhado amarelo de destaque da imagem enviada pelo usuário.
 */
export function MarkerUnderlineDoodle({
  className = '',
  color = '#FFD700',
  height = 12,
  ...props
}: {
  className?: string;
  color?: string;
  height?: number;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible ${className}`}
      style={{ height }}
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M4 11 C40 6, 120 14, 180 8 C205 6, 228 10, 236 9"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M12 14 C65 11, 145 15, 210 12"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/**
 * 8. Setas e Brilhos Espontâneos de Cume (Stars / Sparkles / Arrows)
 */
export function SparkleDoodle({
  size = 36,
  strokeColor = '#FFD700',
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20 4 C20 14, 26 20, 36 20 C26 20, 20 26, 20 36 C20 26, 14 20, 4 20 C14 20, 20 14, 20 4 Z"
        fill={strokeColor}
      />
    </svg>
  );
}

export function HandArrowDoodle({
  size = 60,
  strokeColor = 'currentColor',
  strokeWidth = 2.5,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 70 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6 24 C22 14, 44 16, 58 22"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M46 14 C52 18, 58 22, 62 23 C58 27, 50 32, 46 34"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 9. Nuvenzinha de Giz / Magnésio (Chalk Puff Doodle)
 */
export function ChalkPuffDoodle({
  size = 50,
  strokeColor = 'currentColor',
  strokeWidth = 2.4,
  className = '',
  ...props
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16 35 C12 30, 14 20, 22 18 C28 16, 34 18, 38 14 C44 10, 52 16, 50 24 C52 30, 48 38, 40 40 C34 42, 28 38, 24 42 C18 44, 14 40, 16 35 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="1.5" fill={strokeColor} />
      <circle cx="36" cy="26" r="1.2" fill={strokeColor} />
      <circle cx="24" cy="34" r="1.2" fill={strokeColor} />
    </svg>
  );
}
