// Componente utilitário de layout para centralizar conteúdo e limitar largura máxima.
import { type ReactNode } from "react"; // Importa tipo para tipagem de filhos React.

// Recebe elementos filhos e os envolve com espaçamento lateral e centralização.
export default function Conteiner({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4"> {/* Mantém layout responsivo centralizado. */}
            {children} {/* Renderiza o conteúdo enviado por cada página/componente. */}
        </div>
    );
}