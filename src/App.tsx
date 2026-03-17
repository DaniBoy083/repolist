import { RouterProvider } from "react-router-dom"; // Importa provedor de roteamento para habilitar navegação por rotas.
import { Toaster } from "react-hot-toast"; // Importa o container global de notificações toast.
import { router } from "./routes"; // Importa a configuração central de rotas da aplicação.

// Componente raiz responsável por registrar recursos globais da aplicação.
export default function App() {
  return (
    <div> {/* Wrapper raiz para elementos globais da aplicação. */}
      {/* Toaster global para exibir feedbacks visuais de sucesso/erro em qualquer página. */}
      <Toaster
        position="top-center" // Define posição fixa para as notificações.
        toastOptions={{ style: { background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" } }}
      />

      {/* Conecta o roteador ao React para renderizar páginas por URL. */}
      <RouterProvider router={router} />
    </div>
  );
}