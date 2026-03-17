/*
  Componente Layout - layout principal da aplicação
  Envolve todas as páginas com Header no topo, conteúdo no meio (Outlet) e Footer no rodapé
*/

import Footer from '../footer/footer'; // Importa rodapé compartilhado da aplicação.
import { Outlet } from 'react-router-dom'; // Importa ponto onde as páginas filhas são renderizadas.


export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col"> {/* Estrutura principal ocupando a altura total da tela. */}
            {/* Placeholder para renderizar o componente da página atual */}
            <main className="flex-1 bg-black text-white">
                <Outlet /> {/* Renderiza o conteúdo da rota ativa. */}
            </main>
            {/* Componente de rodapé */}
            <Footer />
        </div>
    );
}