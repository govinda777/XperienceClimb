import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Xperience Climb',
  description:
    'Política de Privacidade e Proteção de Dados da Xperience Climb, em total conformidade com a LGPD (Lei nº 13.709/2018). Saiba como tratamos seus dados.',
  alternates: {
    canonical: 'https://climb.xperiencehubs.com/politica-de-privacidade',
  },
  robots: 'index, follow',
};

export default function PoliticaDePrivacidadePage() {
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
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                Política de Privacidade
              </h1>
              <p className="text-sm text-neutral-600">
                Xperience Climb • Conformidade com a Lei Geral de Proteção de Dados (LGPD)
              </p>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 leading-relaxed text-neutral-700">
            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-climb-600" />
                1. Visão Geral e Compromisso
              </h2>
              <p>
                A <strong>Xperience Climb</strong> (https://climb.xperiencehubs.com) está
                comprometida com a segurança, privacidade e transparência no tratamento dos dados
                pessoais de todos os clientes, participantes de vivências e visitantes do nosso
                site.
              </p>
              <p>
                Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e
                protegemos as suas informações, em total conformidade com a{' '}
                <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong>{' '}
                e com as melhores práticas de segurança da informação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-climb-600" />
                2. Quais Dados Coletamos
              </h2>
              <p>
                Coletamos apenas os dados estritamente necessários para viabilizar as atividades de
                ecoturismo e escalada em rocha:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dados Cadastrais e de Contato:</strong> Nome completo, e-mail, número de
                  telefone celular/WhatsApp e cidade de residência.
                </li>
                <li>
                  <strong>Dados para Segurança e Seguro Aventura:</strong> Data de nascimento /
                  idade, declaração básica de condições de saúde preexistentes, número do
                  tênis/calçado (para ajuste adequado de sapatilhas de escalada e equipamentos
                  técnicos) e dados de contato de emergência (nome e telefone de
                  responsável/parente).
                </li>
                <li>
                  <strong>Dados de Navegação e Cookies:</strong> Endereço IP aproximado, páginas
                  visitadas, tempo de permanência e interações de navegação (coletados mediante o
                  seu consentimento através do nosso banner de cookies).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-climb-600" />
                3. Finalidades do Tratamento de Dados
              </h2>
              <p>Seus dados pessoais são utilizados para:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Emissão da Apólice de Seguro Aventura:</strong> Contratação do seguro
                  individual obrigatório para a prática de atividades em ambientes naturais.
                </li>
                <li>
                  <strong>Logística e Dimensionamento de Equipamentos:</strong> Preparação de
                  equipamentos individuais homologados (capacetes, baudriers/cadeirinhas,
                  sapatilhas) no tamanho correto de cada escalador.
                </li>
                <li>
                  <strong>Atendimento e Comunicação Operacional:</strong> Envio de instruções sobre
                  o Ponto de Encontro em Pedra Bela - SP, checklist de vestimenta e atualizações
                  meteorológicas.
                </li>
                <li>
                  <strong>Aperfeiçoamento Contínuo e Métricas:</strong> Avaliação agregada e anônima
                  de tráfego através do Google Analytics para otimização da experiência digital.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">4. Compartilhamento de Dados</h2>
              <p>
                A Xperience Climb <strong>nunca comercializa</strong> seus dados pessoais. O
                compartilhamento restringe-se aos seguintes agentes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Companhia Seguradora:</strong> Compartilhamento dos dados estritamente
                  necessários para ativação da cobertura do Seguro de Acidentes Pessoais no dia da
                  atividade.
                </li>
                <li>
                  <strong>Equipe de Guias e Instrutores Credenciados:</strong> Acesso à lista de
                  participantes, histórico relevante de saúde e contatos de emergência para resposta
                  rápida em campo.
                </li>
                <li>
                  <strong>Autoridades Públicas:</strong> Exclusivamente mediante exigência legal ou
                  ordem judicial válida.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">
                5. Gestão de Cookies e Consentimento
              </h2>
              <p>
                Utilizamos cookies analíticos (como Google Analytics) para entender a audiência e o
                desempenho da plataforma. Você pode aceitar ou rejeitar a ativação de cookies não
                essenciais a qualquer momento através do nosso banner de preferências ou
                configurando diretamente seu navegador web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-neutral-900">6. Seus Direitos (LGPD)</h2>
              <p>
                Conforme previsto no Artigo 18 da LGPD, você tem o direito de, a qualquer momento e
                gratuitamente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmar a existência de tratamento de seus dados pessoais;</li>
                <li>Acessar os dados coletados;</li>
                <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>
                  Requerer a eliminação ou anonimização de dados desnecessários ou tratados em
                  desconformidade;
                </li>
                <li>Revogar o consentimento previamente fornecido.</li>
              </ul>
            </section>

            <section className="rounded-xl border border-orange-200 bg-orange-50/70 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-2">7. Canal de Contato e DPO</h2>
              <p className="text-sm mb-4">
                Para exercer qualquer um de seus direitos ou esclarecer dúvidas sobre o tratamento
                de seus dados, entre em contato diretamente com o nosso responsável pela
                privacidade:
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
