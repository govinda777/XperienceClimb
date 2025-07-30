#!/bin/bash
# Script para instalar Vercel CLI com registry correto

echo "🔧 INSTALANDO VERCEL CLI COM REGISTRY OFICIAL"
echo ""

echo "1️⃣ Limpando cache npm..."
npm cache clean --force

echo ""
echo "2️⃣ Instalando Vercel CLI forçando registry oficial..."
npm install -g vercel --registry https://registry.npmjs.org

echo ""
echo "3️⃣ Verificando instalação..."
vercel --version

echo ""
echo "✅ VERCEL CLI INSTALADO COM SUCESSO!"
echo ""
echo "🚀 Comandos disponíveis:"
echo "• vercel --prod     (deploy de produção)"
echo "• vercel            (deploy de preview)"
echo "• vercel login      (fazer login)"
echo "• vercel projects   (listar projetos)"
echo ""
echo "📖 Para usar, execute: ./INSTALL_VERCEL.sh"