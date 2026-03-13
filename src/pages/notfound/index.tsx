/*
  Página 404 - Página não encontrada
  Exibida quando o usuário tenta acessar uma rota que não existe
*/

import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
            <h1 className="font-bold text-4xl mb-2">ERROR 404</h1>
            <h2 className="font-bold text-2xl mb-4">Página não encontrada</h2>
            <p className="italic text-xl mb-6">Essa página não existe!</p>
            <Link className="rounded-md border border-white px-5 py-2 transition hover:bg-white hover:text-black" to="/">
                Voltar ao início
            </Link>
        </div>
    )
}
