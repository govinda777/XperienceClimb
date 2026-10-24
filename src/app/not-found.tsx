import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        <Image
          src="/assets/logo.svg"
          alt="Logo Xperience Climb"
          width={64}
          height={64}
          className="w-16 h-16 mx-auto mb-6 drop-shadow-sm"
        />
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta-500 font-bold block mb-3">
          ERRO · 404 · ROTA NÃO ENCONTRADA
        </span>
        <h1 className="font-display text-6xl sm:text-7xl font-black uppercase tracking-tight text-ink-900 leading-none mb-4">
          FORA DA{' '}
          <span className="font-serifIt italic font-light text-forest-700 normal-case">via</span>
        </h1>
        <p className="text-ink-600 text-sm sm:text-base leading-relaxed mb-8">
          A página ou via de escalada que você tentou acessar não existe ou foi remanejada.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          Voltar para a Base
        </Link>
      </div>
    </div>
  );
}
