import axios from "axios";

// Endpoint base da API do GitHub
const api = axios.create({
    baseURL: "https://api.github.com",
});

export default api;