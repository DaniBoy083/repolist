//Componente que alinha todos os outros com o cabeçalho.
import { type ReactNode } from "react";

export default function Conteiner({children}: {children: ReactNode}) {
    return(
        <div className="w-full max-w-7xl mx-auto px-4">
            {children}
        </div>
    )
}