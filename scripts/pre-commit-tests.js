#!/usr/bin/env node

/**
 * Pre-commit test script (backup option)
 * Executa testes de forma mais permissiva para desenvolvimento
 * Use este script apenas se precisar fazer commits com testes falhando
 */

const { execSync } = require('child_process');

console.log('🧪 Executando testes de unidade (modo permissivo)...');

try {
  // Executa testes com opções mais permissivas
  const testCommand = 'yarn test:pre-commit';

  execSync(testCommand, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });

  console.log('✅ Testes executados com sucesso!');
  process.exit(0);
} catch (error) {
  console.log('❌ Alguns testes falharam, mas continuando o commit...');
  console.log('💡 Execute "yarn test" para ver os detalhes dos testes');
  console.log('💡 Para forçar o commit com testes falhando, use: git commit --no-verify');

  // Não falha o commit, apenas avisa
  process.exit(0);
}
