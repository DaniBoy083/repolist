/*
  Página 404 - Página não encontrada
  Exibida quando o usuário tenta acessar uma rota que não existe
*/

import { Link } from "react-router-dom"; // Importa link interno para navegação sem recarregar a página.

export default function NotFoundPage() {
    return (
        <div className="flex w-full min-h-screen justify-center items-center flex-col text-white"> {/* Centraliza conteúdo da página de erro na tela inteira. */}
            <h1 className="font-bold text-4xl mb-2">ERROR 404</h1> {/* Código de erro principal. */}
            <h2 className="font-bold text-2xl mb-4">Página não encontrada</h2> {/* Mensagem de rota inexistente. */}
            <p className="italic text-xl mb-6">Essa página não existe!</p> {/* Texto auxiliar para o usuário. */}
            <Link className="rounded-md border border-white px-5 py-2 transition hover:bg-white hover:text-black" to="/">
                Voltar ao início {/* Ação para retornar à Home. */}
            </Link>
        </div>
    );
}
