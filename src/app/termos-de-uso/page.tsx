import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertTriangle,
  CloudRain,
  ShieldCheck,
  Mail,
  Phone,
} from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Termos de Uso e Condições de Participação | Xperience Climb',
  description:
    'Termos de Uso, regras de segurança, políticas de cancelamento e condições gerais de participação nas atividades de escalada e aventura da Xperience Climb em Pedra Bela - SP.',
  alternates: {
    canonical: 'https://climb.xperiencehubs.com/termos-de-uso',
  },
  robots: 'index, follow',
};

export default function TermosDeUsoPage() {
  const lastUpdated = '10 de setembro de 2026';

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      {/* Top Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-climb-600 transition-colors hover:text-climb-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Página Inicial
          </Link>
          <span className="text-xs text-neutral-500">Última atualização: {lastUpdated}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                Termos de Uso e Condições
              </h1>
              <p className="text-sm text-neutral-600">
                Xperience Climb • Diretrizes Operacionais e Segurança em Pedra Bela - SP
              </p>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 leading-relaxed text-neutral-700">
            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-climb-600" />
                1. Aceite dos Termos
              </h2>
              <p>
                Ao navegar no site <strong>climb.xperiencehubs.com</strong>, adquirir pacotes ou
                participar das saídas de escalada organizadas pela <strong>Xperience Climb</strong>,
                o participante declara ter lido, compreendido e aceito integralmente os presentes
                Termos de Uso e Condições de Participação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-climb-600" />
                2. Natureza da Atividade e Requisitos
              </h2>
              <p>
                As experiências oferecidas compreendem turismo de aventura, ecoturismo e batismo de
                escalada em rocha natural (especialmente no Campo Escola e setores da Pedra do
                Santuário, Pedra Bela - SP).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Experiência Prévia:</strong> Nossos pacotes de batismo (como o Pacote
                  Agarrão) são desenhados especificamente para pessoas{' '}
                  <em>sem qualquer experiência anterior</em>.
                </li>
                <li>
                  <strong>Idade Mínima:</strong> A idade mínima recomendada é de 12 anos. Menores de
                  18 anos devem obrigatoriamente estar acompanhados por responsável legal ou
                  apresentar autorização formal por escrito.
                </li>
                <li>
                  <strong>Condição Física e Saúde:</strong> O participante declara não possuir
                  contraindicações médicas impeditivas para a prática de atividades físicas
                  moderadas ao ar livre.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                3. Segurança e Equipamentos Homologados
              </h2>
              <p>A segurança é nosso princípio inegociável. Por isso:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Todos os equipamentos de proteção individual (EPI) e coletivos fornecidos são
                  estritamente certificados pelas normas{' '}
                  <strong>UIAA (União Internacional das Associações de Alpinismo)</strong> e{' '}
                  <strong>CE (Conformidade Europeia)</strong>.
                </li>
                <li>
                  O uso do capacete de escalada homologado é obrigatório durante todo o período de
                  permanência na base e nas vias da rocha.
                </li>
                <li>
                  O participante compromete-se a seguir com rigor todas as orientações técnicas e
                  comandos dos instrutores e guias credenciados.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-blue-500" />
                4. Política Meteorológica e Remarcação
              </h2>
              <p>
                A escalada em rocha natural requer condições climáticas adequadas para garantia
                total de aderência e segurança dos participantes.
              </p>
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5">
                <p className="font-semibold text-blue-900 mb-1">Garantia Climática:</p>
                <p className="text-sm text-blue-800">
                  Caso a previsão meteorológica aponte chuva persistente ou condições desfavoráveis
                  no dia da atividade que comprometam a segurança, a Xperience Climb remarcará a
                  saída para a próxima data disponível sem qualquer custo adicional para o
                  participante.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                5. Política de Cancelamento e Desistência
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Direito de Arrependimento:</strong> Conforme o Código de Defesa do
                  Consumidor (Artigo 49), o cancelamento realizado em até 7 (sete) dias corridos
                  após a contratação online ensejará o reembolso integral de 100% dos valores pagos.
                </li>
                <li>
                  <strong>Cancelamentos com mais de 7 dias de antecedência da saída:</strong>{' '}
                  Reembolso de 80% do valor ou crédito integral de 100% para utilização em saídas
                  futuras.
                </li>
                <li>
                  <strong>Não comparecimento (No-show):</strong> Em caso de não comparecimento no
                  Ponto de Encontro no horário previsto sem aviso prévio mínimo de 48 horas, o valor
                  não será reembolsável em virtude dos custos fixos já contratados (seguro, guias e
                  restaurante).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">6. Seguro Aventura Obrigatório</h2>
              <p>
                Todas as reservas confirmadas incluem apólice individual do Seguro Aventura contra
                acidentes pessoais durante a vigência do roteiro, com cobertura médica, hospitalar e
                assistência emergencial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">7. Direitos de Imagem</h2>
              <p>
                Durante a saída, fotos e filmagens podem ser registradas pela nossa equipe para
                registro afetivo dos participantes e divulgação institucional em nossas redes
                sociais. Caso não deseje ter sua imagem veiculada, basta comunicar nossa equipe
                antes ou durante a saída.
              </p>
            </section>

            <section className="rounded-xl border border-orange-200 bg-orange-50/70 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-2">8. Atendimento e Suporte</h2>
              <p className="text-sm mb-4">
                Ficou com alguma dúvida sobre o regulamento, horários ou cancelamento? Fale
                diretamente conosco:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex items-center gap-2 text-climb-600 hover:text-climb-700"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-2 text-climb-600 hover:text-climb-700"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </section>
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-md"
            >
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
