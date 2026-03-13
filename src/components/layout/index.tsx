/*
  Componente Layout - layout principal da aplicação
  Envolve todas as páginas com Header no topo, conteúdo no meio (Outlet) e Footer no rodapé
*/

import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Placeholder para renderizar o componente da página atual */}
            <main className="flex-1 bg-black text-white">
                <Outlet/>
            </main>
            {/* Componente de rodapé */}
            <Footer />
        </div>
    );
}