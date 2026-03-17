/*
  Controle simples de autenticação em sessão local.
  Armazena e lê um booleano no localStorage para liberar rotas privadas.
*/

const AUTH_STORAGE_KEY = "repolist:isAuthenticated"; // Chave única usada para persistir autenticação no localStorage.

export function isAuthenticated(): boolean {
    // Retorna true quando o usuário marcou login na aplicação.
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated(value: boolean): void {
    // Persiste o estado de login para ser lido pelo guard de rota.
    localStorage.setItem(AUTH_STORAGE_KEY, String(value));
}

export function logout(): void {
    // Remove a sessão do usuário e redireciona pelo chamador.
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Credenciais do único usuário permitido.
// ATENÇÃO: em produção isso deve ser validado no servidor.
const VALID_EMAIL = "danielcostacarvalhomartins06@gmail.com"; // E-mail autorizado para login local.
const VALID_PASSWORD = "Dani31012006@123"; // Senha autorizada para login local.

export function verifyCredentials(email: string, password: string): boolean {
    // Retorna true apenas se as credenciais baterem exatamente.
    return email === VALID_EMAIL && password === VALID_PASSWORD;
}
