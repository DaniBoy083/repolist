# RepoList

Aplicacao React com TypeScript, Vite, React Router e Tailwind CSS v4.

## Tecnologias

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- ESLint 9

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```text
http://localhost:5173
```

## Scripts

- `npm run dev`: inicia o projeto em modo desenvolvimento com HMR.
- `npm run build`: faz type-check (`tsc -b`) e build de producao com Vite.
- `npm run preview`: serve o build de producao localmente.
- `npm run lint`: executa o ESLint no projeto.

## Estrutura principal

```text
src/
  App.tsx
  main.tsx
  index.css
  routes/
    index.tsx
  pages/
    home/
      index.tsx
    notfound/
      index.tsx
  components/
    conteiner/
      index.tsx
    layout/
      index.tsx
    footer/
      footer.tsx
      footer.module.css
```

## Rotas

- `/`: pagina inicial (`HomePage`).
- `*`: pagina 404 (`NotFoundPage`) para qualquer rota nao mapeada.

As rotas sao definidas em `src/routes/index.tsx` usando `createBrowserRouter`.

## Estilos e Tailwind

- O Tailwind e carregado em `src/index.css` com:

```css
@import "tailwindcss";
```

- A integracao com Vite 8 esta configurada via PostCSS em `postcss.config.js`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## Configuracao de desenvolvimento (Vite)

Em `vite.config.ts`:

- Porta fixa `5173`.
- `strictPort: true` para evitar alternancia automatica de porta.
- `hmr.overlay: false` para nao bloquear a tela com overlay de erro durante desenvolvimento.

## Solucao de problemas

Se aparecer erro antigo de CSS/overlay no navegador:

1. Feche abas antigas do app.
2. Garanta que o dev server ativo esta em `http://localhost:5173`.
3. Faça recarga forcada (`Ctrl + F5`).
4. Se necessario, limpe cache do Vite e rode novamente:

```bash
rm -rf node_modules/.vite
npm run dev
```

No Windows PowerShell, use:

```powershell
if (Test-Path node_modules/.vite) { Remove-Item -Recurse -Force node_modules/.vite }
npm run dev
```

## Estado atual

- Build validado com sucesso.
- Lint validado com sucesso.
