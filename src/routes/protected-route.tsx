import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/session";

/*
  Guard de rota privada.
  Se não estiver autenticado, redireciona para /login e salva a origem.
*/
export default function ProtectedRoute() {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Guarda o caminho atual para retorno após o login.
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    // Libera o conteúdo filho quando o usuário está autenticado.
    return <Outlet />;
}
