/*
  Página de Dashboard — acesso restrito a usuários autenticados.
  Busca todos os repositórios da API do GitHub, permite adicionar repos externos
  e remover repos da lista, além do botão de logout.
*/

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaSignOutAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Conteiner from "../../components/conteiner";
import { logout } from "../../auth/session";
import api from "../../services/api";

// Chave local para repos removidos pelo usuário no dashboard
const HIDDEN_KEY = "repolist:hiddenRepos";
// Chave local para repos externos adicionados manualmente
const EXTRA_KEY = "repolist:extraRepos";

interface Repo {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
}

function getHidden(): Set<string> {
    const raw = localStorage.getItem(HIDDEN_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
}

function addHidden(name: string) {
    const set = getHidden();
    set.add(name);
    localStorage.setItem(HIDDEN_KEY, JSON.stringify([...set]));
}

function getExtraRepos(): Repo[] {
    // Retorna repos adicionados manualmente pelo desenvolvedor
    const raw = localStorage.getItem(EXTRA_KEY);
    return raw ? (JSON.parse(raw) as Repo[]) : [];
}

function saveExtraRepo(repo: Repo) {
    const current = getExtraRepos();
    localStorage.setItem(EXTRA_KEY, JSON.stringify([...current, repo]));
}

function removeExtraRepo(name: string) {
    const updated = getExtraRepos().filter((r) => r.name !== name);
    localStorage.setItem(EXTRA_KEY, JSON.stringify(updated));
}

export default function DashboardPage() {
    const navigate = useNavigate();

    const [repos, setRepos] = useState<Repo[]>([]);
    const [carregando, setCarregando] = useState(true);

    // Formulário de adição de repo externo
    const [owner, setOwner] = useState("");
    const [repoName, setRepoName] = useState("");
    const [adicionando, setAdicionando] = useState(false);

    // Busca todos os repos da API, filtra os ocultos e mescla os extras
    useEffect(() => {
        api.get<Repo[]>("/users/DaniBoy083/repos?per_page=100&sort=updated")
            .then((response) => {
                const hidden = getHidden();
                const proprios = response.data.filter((r) => !hidden.has(r.name));
                const extras = getExtraRepos().filter((r) => !hidden.has(r.name));
                setRepos([...proprios, ...extras]);
            })
            .finally(() => setCarregando(false));
    }, []);

    function handleLogout() {
        // Encerra a sessão e redireciona para o login
        logout();
        toast.success("Logout realizado com sucesso!");
        navigate("/login", { replace: true });
    }

    function handleDelete(repo: Repo) {
        // Marca como oculto, remove da lista e também dos extras caso seja externo
        addHidden(repo.name);
        removeExtraRepo(repo.name);
        setRepos((prev) => prev.filter((r) => r.name !== repo.name));
        toast.success(`"${repo.name}" removido da lista.`);
    }

    async function handleAdicionar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAdicionando(true);

        try {
            // Busca os dados do repo externo na API do GitHub
            const response = await api.get<Repo>(`/repos/${owner}/${repoName}`);
            const novo = response.data;

            // Evita duplicatas na lista
            if (repos.some((r) => r.id === novo.id)) {
                toast.error("Repositório já está na lista.");
                return;
            }

            saveExtraRepo(novo);
            setRepos((prev) => [...prev, novo]);
            setOwner("");
            setRepoName("");
            toast.success(`"${novo.name}" adicionado com sucesso!`);
        } catch {
            toast.error("Repositório não encontrado. Verifique o owner e o nome.");
        } finally {
            setAdicionando(false);
        }
    }

    return (
        <Conteiner>
            {/* Cabeçalho com título centralizado, botão voltar e botão de logout */}
            <div className="mt-10 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                >
                    ← Home
                </Link>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

            {/* Formulário para adicionar um repositório externo */}
            <div className="mt-8 w-full max-w-2xl">
                <h2 className="mb-3 text-xl font-semibold">Adicionar repositório externo</h2>
                <form onSubmit={handleAdicionar} className="flex gap-2">
                    <input
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="Owner (ex: facebook)"
                        required
                        className="flex-1 rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    />
                    <input
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="Repositório (ex: react)"
                        required
                        className="flex-1 rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={adicionando}
                        className="flex items-center gap-1 rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black disabled:opacity-50"
                    >
                        <FaPlus />
                        {adicionando ? "Buscando..." : "Adicionar"}
                    </button>
                </form>

            </div>

            {/* Lista de repositórios carregados da API */}
            <div className="mt-8 w-full max-w-2xl pb-10">
                <h2 className="mb-4 text-xl font-semibold">Repositórios cadastrados</h2>

                {carregando && (
                    <p className="text-gray-400">Carregando repositórios...</p>
                )}

                {!carregando && repos.length === 0 && (
                    <p className="text-gray-400">Nenhum repositório disponível.</p>
                )}

                {repos.map((repo) => (
                    <div
                        key={repo.id}
                        className="mb-3 flex items-center justify-between rounded-md border border-white/20 bg-white/5 px-4 py-3"
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold text-white">{repo.name}</span>
                            {repo.description && (
                                <span className="text-sm text-gray-400">{repo.description}</span>
                            )}
                            {repo.language && (
                                <span className="mt-1 text-xs text-gray-500">{repo.language}</span>
                            )}
                        </div>

                        {/* Botão de deleção do repositório da lista */}
                        <button
                            onClick={() => handleDelete(repo)}
                            className="flex shrink-0 items-center gap-1 rounded-md border border-red-500 px-3 py-1 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                            <FaTrash />
                            Deletar
                        </button>
                    </div>
                ))}
            </div>
        </Conteiner>
    );
}
