import Conteiner from "../../components/conteiner"; // Importa container de layout da aplicação.
import type { FormEvent } from "react"; // Importa tipagem para evento de submit de formulário.
import { useState } from "react"; // Importa hook para estados do formulário.
import { Navigate, useLocation, useNavigate } from "react-router-dom"; // Importa utilitários de navegação e redirecionamento.
import toast from "react-hot-toast"; // Importa utilitário para feedback visual via toast.
import { isAuthenticated, setAuthenticated, verifyCredentials } from "../../auth/session"; // Importa funções de autenticação local.

export default function LoginPage() {
    const navigate = useNavigate(); // Permite navegar para rota de destino após login.
    const location = useLocation(); // Recupera rota de origem salva pelo guard.

    const [email, setEmail] = useState(""); // Estado do campo de e-mail.
    const [password, setPassword] = useState(""); // Estado do campo de senha.

    // Recupera rota de origem enviada pelo guard; fallback para dashboard.
    const from = (location.state as { from?: string } | undefined)?.from || "/dashboard";

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!verifyCredentials(email, password)) {
            // Credenciais inválidas: exibe toast de erro.
            toast.error("E-mail ou senha incorretos.");
            return;
        }

        // Autentica e redireciona para a rota desejada.
        setAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        navigate(from, { replace: true });
    }

    if (isAuthenticated()) {
        // Evita exibir login para quem já está autenticado.
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Conteiner>
            {/* Centraliza o card de login no meio da área útil da página */}
            <div className="flex min-h-[80vh] items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm"
                >
                    <h1 className="mb-2 text-center text-3xl font-bold">Login</h1>
                    <p className="mb-6 text-center text-sm text-gray-300">
                        Acesse sua conta para continuar.
                    </p>

                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        required
                        className="mb-4 w-full rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    />

                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                        className="mb-5 w-full rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-md border border-white px-5 py-2 text-white transition hover:bg-white hover:text-black"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </Conteiner>
    );
}