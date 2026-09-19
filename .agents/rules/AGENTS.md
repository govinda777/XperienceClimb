# UI & Design System Guidelines (Claude Designer + Boulder Aesthetic)

Sempre que você criar, modificar ou refatorar componentes visuais, páginas ou seções no projeto **XperienceClimb**, siga obrigatoriamente estas regras:

## 1. Princípios de Design & Acabamento

- **Estilo Editorial / Outdoor:** O visual deve transmitir aventura, precisão técnica e sofisticação (inspirado em marcas como Arc'teryx, Black Diamond e na interface de [AcademiaBoulder](file:///Users/govinda/projetos/AcademiaBoulder)).
- **Hierarquia Visual Rica:**
  - Sempre inclua tags técnicas em mono (ex: `CAP · 01 / BATISMO`, `ALT 1.100m`, `GPS 22°42'S`).
  - Use contrastes tipográficos: Títulos sólidos em caixa alta + palavras de acento poético em itálico serifado + dados técnicos em mono.
  - Cartões com cantos arredondados generosos (`rounded-2xl` ou `rounded-3xl`), bordas finas com transparência (`border border-white/10` ou `border-black/5`) e sombras sutis.
- **Cores & Tokens:**
  - Background escuro de rocha: tons profundos (`#080A0E`, `#0F1116`).
  - Realces: Azul Elétrico (`#1E88E5`) e Dourado/Magma (`#FFD700` / `#FF4D2B`).
  - Superfícies claras / papel: `#FAFAF7` com contraste escuro preciso.

## 2. Micro-interações

- Todos os botões, cards clicáveis e links devem possuir transições suaves (`transition-all duration-300 ease-out`).
- Efeitos de hover nos cards: leve elevação (`hover:-translate-y-1.5 hover:border-white/20`).
- Badges e chips interativos com feedback de toque.

## 3. Qualidade de Código Frontend

- Use **Tailwind CSS** mantendo legibilidade e consistência.
- Use ícones do **`lucide-react`** com `strokeWidth={1.5}` para manter traço elegante.
- Mantenha os componentes acessíveis com labels `aria-label`, contraste adequado e boa experiência mobile.
