# RepoList

Aplicacao React com TypeScript, Vite, React Router e Tailwind CSS v4 para listagem e gerenciamento de repositórios do GitHub.

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

- `npm run dev`: inicia o servidor local com HMR.
- `npm run build`: roda type-check e gera build de producao.
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

## Rotas

- `/`: Home com listagem de repositorios do usuario, filtro e marcador para dashboard.
- `/login`: Login com credenciais fixas (modo aprendizado).
- `/details/:repo`: Página de detalhes (estrutura inicial).
- `/dashboard`: Rota protegida com logout, adicao de repos externos e delecao da lista.
- `*`: Página 404.

## Autenticacao

Autenticacao simplificada em frontend, usando `localStorage` e guard de rota.

Credenciais atuais:

- Email: `danielcostacarvalhomartins06@gmail.com`
- Senha: `Dani31012006@123`

Importante: isso é apenas para estudo. Em producao, a validacao deve acontecer no backend.

## Dashboard

- Carrega repositorios da API do GitHub.
- Permite adicionar repositórios externos por `owner/repo`.
- Permite remover repositorios da lista.
- Exibe feedback visual com `react-hot-toast` (sucesso/erro).

## Build para Vercel

Gerar build localmente:

```bash
npm run build
```

Publicar no Vercel (opcao 1 - painel web):

1. Faça push para o GitHub.
2. Importe o repositório no Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

Publicar no Vercel (opcao 2 - CLI):

```bash
npm i -g vercel
vercel
vercel --prod
```

Observacao: o arquivo `vercel.json` já contém rewrite para SPA, garantindo funcionamento das rotas do React Router em producao.
