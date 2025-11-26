# Estoque — Frontend

Uma aplicação frontend em React criada com Vite para gerenciar produtos, categorias, movimentações e relatórios de um sistema de estoque.

**Status:** Em desenvolvimento

## Sumário
- **Visão geral**: O que é o projeto
- **Tecnologias**: stack usada
- **Instalação**: como rodar localmente
- **Configuração da API**: onde configurar o endpoint
- **Estrutura do projeto**: arquivos e pastas principais
- **Scripts úteis**: comandos npm/yarn
- **Desenvolvimento**: boas práticas e como contribuir

## Visão geral

Este repositório contém a interface web do sistema de controle de estoque. A aplicação oferece telas para cadastrar e listar produtos, gerenciar categorias, registrar movimentações (entrada/saída) e exibir relatórios básicos.

O frontend consome uma API REST (backend separado). Por padrão as chamadas apontam para `http://localhost:5000/api` (veja `src/services/api.js`).

## Tecnologias

- **React 19**: UI
- **Vite**: bundler / dev server
- **ESLint**: linting
- Estrutura de pastas baseada em componentes (ver seção abaixo)

## Requisitos

- Node.js (16+ recomendado)
- npm ou yarn

## Instalação e execução (Windows / PowerShell)

Clone o repositório e instale dependências:

```powershell
git clone <URL-do-repo>
cd estoque-frontend
npm install
```

Rodar em modo desenvolvedor (HMR):

```powershell
npm run dev
```

Gerar build de produção:

```powershell
npm run build
```

Prever build localmente:

```powershell
npm run preview
```

Rodar ESLint:

```powershell
npm run lint
```

## Configuração da API

As chamadas às rotas do backend estão em `src/services/api.js`. Atualmente o endpoint está definido como:

```js
const API_URL = 'http://localhost:5000/api';
```

Para apontar para outro servidor de API você pode:

- Atualizar diretamente a constante em `src/services/api.js`.
- Ou adicionar uma variável de ambiente (recomendado): criar `env` com `VITE_API_URL` e alterar `api.js` para usar `import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`.

Exemplo de `.env`:

```
VITE_API_URL=https://minha-api.example.com/api
```

Após alterar o `.env` reinicie o dev server.

## Estrutura do projeto

Visão geral das pastas mais importantes:

- `public/` : arquivos estáticos
- `src/main.jsx` : entrada da aplicação
- `src/App.jsx` : componente raiz
- `src/services/api.js` : funções para consumir a API REST
- `src/components/` : componentes por feature
	- `Categorias/` : `FormCategoria.jsx`, `ListaCategorias.jsx`
	- `Produtos/` : `FormProduto.jsx`, `ListaProdutos.jsx` (+ CSS associados)
	- `Movimentacoes/` : `FormMovimentacao.jsx`, `ListaMovimentacoes.jsx`
	- `Relatorios/` : `Relatorios.jsx`
	- `Layout/` : `Header.jsx`, `Header.css`

## Scripts (no `package.json`)

- `npm run dev` : inicia o servidor de desenvolvimento (Vite)
- `npm run build` : gera o build de produção
- `npm run preview` : serve o build para pré-visualização
- `npm run lint` : executa o ESLint

## Boas práticas de desenvolvimento

- Mantenha a lógica de chamadas HTTP em `src/services/api.js`.
- Componentes devem ser organizados por feature (cada pasta agrupa componentes, estilos e testes desta feature).
- Use CSS modular ou classes bem nomeadas para manter a consistência visual.
- Adicione testes unitários quando possível (Jest / React Testing Library).

## Como contribuir

1. Crie uma branch a partir de `main` ou da branch de trabalho: `feature/minha-melhora`.
2. Faça commits pequenos e claros.
3. Abra um Pull Request descrevendo a mudança e como testar.

## Deploy

Para deploy, gere o build (`npm run build`) e hospede a pasta `dist` em qualquer serviço estático (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.).

Lembre-se de configurar a URL da API no ambiente de produção.

## Dúvidas / Contato

Se precisar de ajuda com o frontend, abra uma issue no repositório ou entre em contato com os mantenedores.

---

_Arquivo gerado automaticamente: versão melhorada do README para o projeto `estoque-frontend`._
