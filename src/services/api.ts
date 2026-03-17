import axios from "axios"; // Importa cliente HTTP para consumo da API.

// Cria instância HTTP centralizada com URL base da API pública do GitHub.
const api = axios.create({
    baseURL: "https://api.github.com", // Todas as requisições relativas usarão este prefixo.
});

export default api; // Exporta cliente para ser reutilizado em páginas e serviços.