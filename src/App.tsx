import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes";

export default function App() {
  return (
    <div>
        {/* Toaster global — exibe notificações em toda a aplicação */}
        <Toaster position="top-right" toastOptions={{ style: { background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" } }} />
        <RouterProvider router={router}/>
    </div>
  )
}