# RepoList

Aplicacao React com TypeScript, Vite, React Router e Tailwind CSS para listar repositorios do GitHub, visualizar detalhes e acompanhar issues.

## Stack

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Axios
- React Icons
- React Hot Toast

## Requisitos

- Node.js 20+
- npm 10+

## Scripts

- `npm run dev`: inicia servidor local com hot reload.
- `npm run build`: executa type-check e gera build de producao.
- `npm run preview`: sobe o build localmente.
- `npm run lint`: executa o ESLint.

## Execucao local

1. Instale as dependencias:

```bash
npm install
```

2. Rode em modo desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```text
http://localhost:5173
```

## Funcionalidades

### Home

- Lista repositorios do usuario `DaniBoy083`.
- Filtro por nome em tempo real.
- Navegacao para detalhes ao clicar em um repositorio.

### Detalhes do repositorio

- Exibe dados do repositorio: nome completo, descricao, linguagem, estrelas, forks e issues abertas.
- Exibe avatar e login do dono do repositorio.
- Lista issues com paginacao.
- Filtro de issues por estado: `open`, `closed` e `all`.
- Seletor de quantidade por pagina: `5`, `10` e `20`.
- Exibe autor da issue com nome (quando disponivel) e avatar.

### Dashboard (rota protegida)

- Exige autenticacao.
- Carrega repositorios principais do usuario.
- Permite adicionar repositorios externos via `owner/repo`.
- Permite remover repositorios da lista do dashboard.
- Permite abrir detalhes de qualquer repositorio da lista.
- Exibe feedback visual com `react-hot-toast`.

### Autenticacao

- Controle simples com `localStorage`.
- Guard de rota para proteger o dashboard.
- Login com credenciais fixas (ambiente de estudo).

Credenciais atuais:

- Email: `danielcostacarvalhomartins06@gmail.com`
- Senha: `Dani31012006@123`

Importante: em producao, a validacao deve acontecer no backend.

## Rotas

- `/`: Home.
- `/login`: Login.
- `/details/:owner/:repo`: Detalhes do repositorio e issues.
- `/dashboard`: Dashboard protegido.
- `*`: Pagina 404.

## Deploy na Vercel

Build local:

```bash
npm run build
```

Opcao 1 (painel web):

1. Faça push para o GitHub.
2. Importe o repositorio no Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

Opcao 2 (CLI):

```bash
npm i -g vercel
vercel
vercel --prod
```

O arquivo `vercel.json` ja possui rewrite para SPA, garantindo funcionamento das rotas do React Router em producao.
