/*
  Página de detalhes de um repositório
  Recebe owner e nome do repo via parâmetros de rota (:owner/:repo)
*/

import { useEffect, useState } from "react"; // Importa hooks para estados e efeitos assíncronos da página.
import { Link, useParams } from "react-router-dom"; // Importa link interno e leitura de parâmetros da rota.
import Conteiner from "../../components/conteiner"; // Importa container para manter largura e alinhamento do layout.
import api from "../../services/api"; // Importa cliente HTTP para consultar dados no GitHub.

type IssueStateFilter = "open" | "closed" | "all"; // Define estados possíveis para filtro de issues.
type DetailsContentView = "issues" | "labels"; // Define qual bloco de conteúdo deve ser exibido na tela.

interface RepoDetails {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface RepoIssue {
    id: number;
    number: number;
    title: string;
    html_url: string;
    state: "open" | "closed";
    created_at: string;
    user: {
        login: string;
        avatar_url: string;
    };
    pull_request?: object;
}

interface GithubUserProfile {
    login: string;
    name: string | null;
    avatar_url: string;
}

interface RepoLabel {
    id: number;
    name: string;
    color: string;
    description: string | null;
}

export default function DetailsPage() {
    const { owner, repo } = useParams();

    const [dados, setDados] = useState<RepoDetails | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [issues, setIssues] = useState<RepoIssue[]>([]);
    const [paginaIssues, setPaginaIssues] = useState(1);
    const [estadoIssues, setEstadoIssues] = useState<IssueStateFilter>("open");
    const [issuesPorPagina, setIssuesPorPagina] = useState(5);
    const [carregandoIssues, setCarregandoIssues] = useState(false);
    const [erroIssues, setErroIssues] = useState("");
    const [temProximaPagina, setTemProximaPagina] = useState(false);
    const [autoresIssue, setAutoresIssue] = useState<Record<string, GithubUserProfile>>({});
    const [labels, setLabels] = useState<RepoLabel[]>([]);
    const [paginaLabels, setPaginaLabels] = useState(1);
    const [labelsPorPagina, setLabelsPorPagina] = useState(5);
    const [carregandoLabels, setCarregandoLabels] = useState(false);
    const [erroLabels, setErroLabels] = useState("");
    const [temProximaPaginaLabels, setTemProximaPaginaLabels] = useState(false);
    const [visualizacaoAtiva, setVisualizacaoAtiva] = useState<DetailsContentView>("issues");

    useEffect(() => {
        if (!owner || !repo) {
            setErro("Parâmetros inválidos para carregar o repositório.");
            setCarregando(false);
            return;
        }

        setCarregando(true);
        setErro("");

        api.get<RepoDetails>(`/repos/${owner}/${repo}`)
            .then((response) => {
                setDados(response.data);
            })
            .catch(() => {
                setErro("Não foi possível carregar os detalhes do repositório.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [owner, repo]);

    useEffect(() => {
        if (!owner || !repo || visualizacaoAtiva !== "issues") {
            return;
        }

        setCarregandoIssues(true);
        setErroIssues("");

        api.get<RepoIssue[]>(`/repos/${owner}/${repo}/issues`, {
            params: {
                state: estadoIssues,
                per_page: issuesPorPagina,
                page: paginaIssues,
            },
        })
            .then(async (response) => {
                const apenasIssues = response.data.filter((item) => !item.pull_request);
                setIssues(apenasIssues);

                const loginsUnicos = Array.from(new Set(apenasIssues.map((item) => item.user.login)));

                const perfis = await Promise.all(
                    loginsUnicos.map(async (login) => {
                        try {
                            const userResponse = await api.get<GithubUserProfile>(`/users/${login}`);
                            return userResponse.data;
                        } catch {
                            return null;
                        }
                    })
                );

                const mapaPerfis = perfis.reduce<Record<string, GithubUserProfile>>((acc, perfil) => {
                    if (perfil) {
                        acc[perfil.login] = perfil;
                    }
                    return acc;
                }, {});

                setAutoresIssue(mapaPerfis);

                const linkHeader = String(response.headers.link || "");
                const hasNextFromHeader = /rel="next"/.test(linkHeader);
                setTemProximaPagina(hasNextFromHeader || response.data.length === issuesPorPagina);
            })
            .catch(() => {
                setErroIssues("Não foi possível carregar as issues do repositório.");
                setIssues([]);
                setAutoresIssue({});
                setTemProximaPagina(false);
            })
            .finally(() => {
                setCarregandoIssues(false);
            });
    }, [owner, repo, paginaIssues, estadoIssues, issuesPorPagina, visualizacaoAtiva]);

    useEffect(() => {
        setPaginaIssues(1);
    }, [owner, repo, estadoIssues, issuesPorPagina]);

    useEffect(() => {
        if (!owner || !repo || visualizacaoAtiva !== "labels") {
            return;
        }

        setCarregandoLabels(true);
        setErroLabels("");

        api.get<RepoLabel[]>(`/repos/${owner}/${repo}/labels`, {
            params: {
                per_page: labelsPorPagina,
                page: paginaLabels,
            },
        })
            .then((response) => {
                setLabels(response.data);

                const linkHeader = String(response.headers.link || "");
                const hasNextFromHeader = /rel="next"/.test(linkHeader);
                setTemProximaPaginaLabels(hasNextFromHeader || response.data.length === labelsPorPagina);
            })
            .catch(() => {
                setErroLabels("Não foi possível carregar as labels do repositório.");
                setLabels([]);
                setTemProximaPaginaLabels(false);
            })
            .finally(() => {
                setCarregandoLabels(false);
            });
    }, [owner, repo, paginaLabels, labelsPorPagina, visualizacaoAtiva]);

    useEffect(() => {
        setPaginaLabels(1);
    }, [owner, repo, labelsPorPagina]);

    return (
        <Conteiner>
            <div className="mx-auto mt-10 w-full max-w-2xl">
                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                >
                    ← Voltar
                </Link>

                {carregando && (
                    <p className="text-gray-400">Carregando detalhes do repositório...</p>
                )}

                {!carregando && erro && (
                    <p className="text-red-400">{erro}</p>
                )}

                {!carregando && !erro && dados && (
                    <div className="rounded-md border border-white/20 bg-white/5 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src={dados.owner.avatar_url}
                                alt={`Avatar de ${dados.owner.login}`}
                                className="h-12 w-12 rounded-full border border-white/20 object-cover"
                            />
                            <span className="text-sm text-gray-300">{dados.owner.login}</span>
                        </div>

                        <h1 className="text-3xl font-bold text-white">{dados.full_name}</h1>

                        <p className="mt-2 text-gray-300">
                            {dados.description || "Sem descrição disponível."}
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300 sm:grid-cols-4">
                            <div className="rounded-md border border-white/10 p-3">
                                <p className="text-xs text-gray-500">Linguagem</p>
                                <p className="mt-1 font-semibold text-white">{dados.language || "N/A"}</p>
                            </div>
                            <div className="rounded-md border border-white/10 p-3">
                                <p className="text-xs text-gray-500">Estrelas</p>
                                <p className="mt-1 font-semibold text-white">{dados.stargazers_count}</p>
                            </div>
                            <div className="rounded-md border border-white/10 p-3">
                                <p className="text-xs text-gray-500">Forks</p>
                                <p className="mt-1 font-semibold text-white">{dados.forks_count}</p>
                            </div>
                            <div className="rounded-md border border-white/10 p-3">
                                <p className="text-xs text-gray-500">Issues abertas</p>
                                <p className="mt-1 font-semibold text-white">{dados.open_issues_count}</p>
                            </div>
                        </div>

                        <a
                            href={dados.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center rounded-md border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                        >
                            Abrir no GitHub
                        </a>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white">Conteúdo do repositório</h2>

                            <div className="mt-4 inline-flex rounded-md border border-white/20 bg-black/30 p-1">
                                <button
                                    onClick={() => setVisualizacaoAtiva("issues")}
                                    className={`rounded px-3 py-1 text-sm transition ${visualizacaoAtiva === "issues" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                                >
                                    Issues
                                </button>
                                <button
                                    onClick={() => setVisualizacaoAtiva("labels")}
                                    className={`rounded px-3 py-1 text-sm transition ${visualizacaoAtiva === "labels" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                                >
                                    Labels
                                </button>
                            </div>

                            {visualizacaoAtiva === "issues" && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-white">Issues do repositório</h3>

                                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                        <label className="flex items-center gap-2 text-sm text-gray-300">
                                            Estado:
                                            <select
                                                value={estadoIssues}
                                                onChange={(e) => setEstadoIssues(e.target.value as IssueStateFilter)}
                                                className="rounded-md border border-white/30 bg-black px-2 py-1 text-sm text-white"
                                            >
                                                <option value="open">Abertas</option>
                                                <option value="closed">Fechadas</option>
                                                <option value="all">Todas</option>
                                            </select>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm text-gray-300">
                                            Por página:
                                            <select
                                                value={issuesPorPagina}
                                                onChange={(e) => setIssuesPorPagina(Number(e.target.value))}
                                                className="rounded-md border border-white/30 bg-black px-2 py-1 text-sm text-white"
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </label>
                                    </div>

                                    {carregandoIssues && (
                                        <p className="mt-3 text-sm text-gray-400">Carregando issues...</p>
                                    )}

                                    {!carregandoIssues && erroIssues && (
                                        <p className="mt-3 text-sm text-red-400">{erroIssues}</p>
                                    )}

                                    {!carregandoIssues && !erroIssues && issues.length === 0 && (
                                        <p className="mt-3 text-sm text-gray-400">Nenhuma issue encontrada para os filtros atuais.</p>
                                    )}

                                    {!carregandoIssues && !erroIssues && issues.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            {issues.map((issue) => (
                                                (() => {
                                                    const perfilAutor = autoresIssue[issue.user.login];
                                                    const nomeAutor = perfilAutor?.name || issue.user.login;
                                                    const avatarAutor = perfilAutor?.avatar_url || issue.user.avatar_url;

                                                    return (
                                                        <a
                                                            key={issue.id}
                                                            href={issue.html_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-start gap-3 rounded-md border border-white/10 bg-black/30 p-3 transition hover:border-white/30"
                                                        >
                                                            <img
                                                                src={avatarAutor}
                                                                alt={`Avatar de ${nomeAutor}`}
                                                                className="h-8 w-8 rounded-full border border-white/20 object-cover"
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold text-white">#{issue.number} {issue.title}</p>
                                                                <p className="mt-1 text-xs text-gray-400">aberta por {nomeAutor}</p>
                                                            </div>
                                                        </a>
                                                    );
                                                })()
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            onClick={() => setPaginaIssues((prev) => Math.max(1, prev - 1))}
                                            disabled={paginaIssues === 1 || carregandoIssues}
                                            className="rounded-md border border-white px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Anterior
                                        </button>

                                        <span className="text-sm text-gray-300">Página {paginaIssues}</span>

                                        <button
                                            onClick={() => setPaginaIssues((prev) => prev + 1)}
                                            disabled={!temProximaPagina || carregandoIssues}
                                            className="rounded-md border border-white px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                </div>
                            )}

                            {visualizacaoAtiva === "labels" && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-white">Labels do repositório</h3>

                                    <div className="mt-4">
                                        <label className="flex items-center gap-2 text-sm text-gray-300">
                                            Por página:
                                            <select
                                                value={labelsPorPagina}
                                                onChange={(e) => setLabelsPorPagina(Number(e.target.value))}
                                                className="rounded-md border border-white/30 bg-black px-2 py-1 text-sm text-white"
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </label>
                                    </div>

                                    {carregandoLabels && (
                                        <p className="mt-3 text-sm text-gray-400">Carregando labels...</p>
                                    )}

                                    {!carregandoLabels && erroLabels && (
                                        <p className="mt-3 text-sm text-red-400">{erroLabels}</p>
                                    )}

                                    {!carregandoLabels && !erroLabels && labels.length === 0 && (
                                        <p className="mt-3 text-sm text-gray-400">Nenhuma label encontrada.</p>
                                    )}

                                    {!carregandoLabels && !erroLabels && labels.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            {labels.map((label) => (
                                                <div
                                                    key={label.id}
                                                    className="rounded-md border border-white/10 bg-black/30 p-3"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="inline-block h-3 w-3 rounded-full border border-white/20"
                                                            style={{ backgroundColor: `#${label.color}` }}
                                                        />
                                                        <p className="text-sm font-semibold text-white">{label.name}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {label.description || "Sem descrição para esta label."}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            onClick={() => setPaginaLabels((prev) => Math.max(1, prev - 1))}
                                            disabled={paginaLabels === 1 || carregandoLabels}
                                            className="rounded-md border border-white px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Anterior
                                        </button>

                                        <span className="text-sm text-gray-300">Página {paginaLabels}</span>

                                        <button
                                            onClick={() => setPaginaLabels((prev) => prev + 1)}
                                            disabled={!temProximaPaginaLabels || carregandoLabels}
                                            className="rounded-md border border-white px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Conteiner>
    );
}
