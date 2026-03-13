import Conteiner from "../../components/conteiner";
import minhaFoto from "../../assets/minhafoto.jpg";
import { FaGithub, FaSearch, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getSavedRepos, saveRepo, deleteRepo } from "../../auth/session";

// Tipo mínimo do objeto de repositório retornado pela API do GitHub
interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
}

export default function HomePage() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [filtro, setFiltro] = useState("");
    const [carregando, setCarregando] = useState(true);
    // Conjunto de nomes de repos já salvos no dashboard
    const [salvos, setSalvos] = useState<Set<string>>(() => new Set(getSavedRepos()));

    // Busca todos os repositórios do usuário ao montar o componente
    useEffect(() => {
        api.get<Repo[]>("/users/DaniBoy083/repos?per_page=100&sort=updated")
            .then((response) => {
                console.log(response.data);
                setRepos(response.data);
            })
            .finally(() => setCarregando(false));
    }, []);

    // Filtra localmente os repos pelo nome digitado
    const reposFiltrados = repos.filter((repo) =>
        repo.name.toLowerCase().includes(filtro.toLowerCase())
    );

    function handleToggleSalvo(name: string) {
        // Alterna entre salvar e remover o repo do dashboard
        if (salvos.has(name)) {
            deleteRepo(name);
            setSalvos((prev) => { const next = new Set(prev); next.delete(name); return next; });
        } else {
            saveRepo(name);
            setSalvos((prev) => new Set(prev).add(name));
        }
    }

    return (
        <Conteiner>
            <img
                src={minhaFoto}
                alt="Foto de Daniel Costa"
                className="mx-auto mt-10 mb-6 h-32 w-32 rounded-full border-4 border-white object-cover transition-transform hover:scale-105"
            />
            <h1 className="text-4xl font-bold mb-4 text-center">Repositorios do Daniel Costa</h1>
            <p className="text-lg mb-4 text-center">Desenvolvedor Full Stack</p>
            <a
                href="https://github.com/DaniBoy083"
                className="mx-auto flex w-fit items-center justify-center rounded-md border border-white px-5 py-2 text-white transition hover:bg-white hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaGithub className="mr-2" />
                GitHub
            </a>

            {/* Campo de busca para filtrar os repositórios listados */}
            <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-2">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        type="text"
                        placeholder="Filtrar repositórios..."
                        className="w-full rounded-md border border-white bg-black py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Lista de repositórios */}
            <div className="mx-auto mt-6 w-full max-w-2xl pb-10">
                {carregando && (
                    <p className="text-center text-gray-400">Carregando repositórios...</p>
                )}
                {!carregando && reposFiltrados.length === 0 && (
                    <p className="text-center text-gray-400">Nenhum repositório encontrado.</p>
                )}
                {reposFiltrados.map((repo) => (
                    // Redireciona para a página interna de detalhes do repositório
                    <div key={repo.id} className="mb-3 flex items-center gap-2">
                        <Link
                            to={`/details/${repo.name}`}
                            className="flex flex-1 flex-col rounded-md border border-white/20 bg-white/5 px-4 py-3 transition hover:border-white/60 hover:bg-white/10"
                        >
                            <span className="font-semibold text-white">{repo.name}</span>
                            {repo.description && (
                                <span className="mt-1 text-sm text-gray-400">{repo.description}</span>
                            )}
                            <div className="mt-2 flex gap-4 text-xs text-gray-500">
                                {repo.language && <span>{repo.language}</span>}
                                <span>★ {repo.stargazers_count}</span>
                            </div>
                        </Link>

                        {/* Botão que salva ou remove o repo da lista do dashboard */}
                        <button
                            onClick={() => handleToggleSalvo(repo.name)}
                            title={salvos.has(repo.name) ? "Remover do dashboard" : "Salvar no dashboard"}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/20 text-lg text-white/60 transition hover:border-white hover:text-white"
                        >
                            {salvos.has(repo.name) ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </div>
                ))}
            </div>
        </Conteiner>
    );
}