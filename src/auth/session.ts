/*
  Controle simples de autenticação em sessão local.
  Armazena e lê um booleano no localStorage para liberar rotas privadas.
*/

const AUTH_STORAGE_KEY = "repolist:isAuthenticated";

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
const VALID_EMAIL = "danielcostacarvalhomartins06@gmail.com";
const VALID_PASSWORD = "Dani31012006@123";

export function verifyCredentials(email: string, password: string): boolean {
    // Retorna true apenas se as credenciais baterem exatamente.
    return email === VALID_EMAIL && password === VALID_PASSWORD;
}

// ---------------------------------------------------------------------------
// Repositórios salvos no dashboard
// ---------------------------------------------------------------------------

const REPOS_STORAGE_KEY = "repolist:savedRepos";

export function getSavedRepos(): string[] {
    // Retorna a lista de nomes de repositórios salvos pelo usuário.
    const raw = localStorage.getItem(REPOS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
}

export function saveRepo(name: string): void {
    // Adiciona um repositório à lista salva, sem duplicatas.
    const current = getSavedRepos();
    if (!current.includes(name)) {
        localStorage.setItem(REPOS_STORAGE_KEY, JSON.stringify([...current, name]));
    }
}

export function deleteRepo(name: string): void {
    // Remove um repositório da lista salva.
    const updated = getSavedRepos().filter((r) => r !== name);
    localStorage.setItem(REPOS_STORAGE_KEY, JSON.stringify(updated));
}
