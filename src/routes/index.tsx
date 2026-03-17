/*
  Arquivo de configuração de rotas
  Define todas as rotas da aplicação e a estrutura do layout
*/

import { createBrowserRouter } from "react-router-dom"; // Importa criador de roteador baseado em navegador.
import NotFoundPage from "../pages/notfound"; // Importa página de fallback para rotas inexistentes.
import Layout from "../components/layout"; // Importa layout base compartilhado por páginas.
import HomePage from "../pages/home"; // Importa página inicial pública.
import LoginPage from "../pages/login"; // Importa página de autenticação.
import DashboardPage from "../pages/dashnoard"; // Importa página privada do dashboard.
import DetailsPage from "../pages/details"; // Importa página de detalhes do repositório.
import ProtectedRoute from "./protected-route"; // Importa guard de autenticação para rotas privadas.


// Criação do roteador com as rotas da aplicação
const router = createBrowserRouter([
    {
        // Layout envolve todas as páginas filhas
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                // Página de detalhes de um repositório específico
                path: "/details/:owner/:repo",
                element: <DetailsPage />
            },
            {
                // Bloco de rotas privadas (exige autenticação).
                element: <ProtectedRoute />,
                children: [
                    {
                        // Dashboard só pode ser acessado por usuário logado.
                        path: "/dashboard",
                        element: <DashboardPage />
                    }
                ]
            },
            {
                // Rota coringa para página 404 (qualquer rota não definida)
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export { router }; // Exporta roteador para ser consumido pelo RouterProvider.