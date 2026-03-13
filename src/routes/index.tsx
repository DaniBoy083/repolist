/*
  Arquivo de configuração de rotas
  Define todas as rotas da aplicação e a estrutura do layout
*/

import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfound";
import Layout from "../components/layout";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashnoard";
import DetailsPage from "../pages/details";
import ProtectedRoute from "./protected-route";


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
                path: "/details/:repo",
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

export {router};