.PHONY: install test test-bdd test-all dev build

# Instala as dependências do projeto respeitando conflitos de peer dependencies
install:
	npm install --legacy-peer-deps

# Executa os testes de unidade e de integração pré-commit (Jest)
test:
	npm run test:pre-commit

# Executa os testes automatizados BDD (Cucumber)
test-bdd:
	npx cucumber-js --config tests/cucumber.config.ts

# Executa todos os testes (unidade, integração e BDD)
test-all: test test-bdd

# Inicia o servidor de desenvolvimento Next.js
dev:
	npm run dev

# Compila o projeto para produção
build:
	npm run build
