import Conteiner from "../../components/conteiner"; // Importa o componente de layout principal da pagina.
import minhaFoto from "../../assets/minhafoto.jpg"; // Importa a foto que sera exibida no topo.
import { FaGithub, FaSearch } from "react-icons/fa"; // Importa os icones usados na interface.
import { useState, useEffect } from "react"; // Importa hooks de estado e ciclo de vida do React.
import { Link } from "react-router-dom"; // Importa componente para navegacao interna entre rotas.
import api from "../../services/api"; // Importa instancia do cliente HTTP configurado para API.

// Define o tipo minimo esperado para cada repositorio retornado pela API do GitHub.
interface Repo {
    id: number; // Identificador unico do repositorio.
    name: string; // Nome curto do repositorio.
    description: string | null; // Descricao do repositorio (pode vir nula).
    html_url: string; // URL publica do repositorio no GitHub.
    language: string | null; // Linguagem principal do projeto (pode vir nula).
    stargazers_count: number; // Quantidade de estrelas recebidas no GitHub.
}

// Componente da pagina inicial onde os repositorios sao listados e filtrados.
export default function HomePage() {
    const [repos, setRepos] = useState<Repo[]>([]); // Guarda a lista completa de repositorios carregados.
    const [filtro, setFiltro] = useState(""); // Guarda o texto digitado no campo de filtro.
    const [carregando, setCarregando] = useState(true); // Controla o estado de carregamento inicial da lista.

    // Faz a busca dos repositorios quando o componente e montado pela primeira vez.
    useEffect(() => {
        api.get<Repo[]>("/users/DaniBoy083/repos?per_page=100&sort=updated") // Requisita ate 100 repositorios ordenados por atualizacao.
            .then((response) => {
                console.log(response.data); // Exibe os dados no console para apoio em debug.
                setRepos(response.data); // Atualiza o estado com os repositorios recebidos.
            })
            .finally(() => setCarregando(false)); // Finaliza o estado de carregamento com sucesso ou erro.
    }, []); // Dependencias vazias para executar apenas no primeiro render.

    // Cria uma lista derivada contendo apenas repositorios que combinam com o filtro digitado.
    const reposFiltrados = repos.filter((repo) =>
        repo.name.toLowerCase().includes(filtro.toLowerCase()) // Compara em minusculas para busca sem diferenciar maiusculas.
    );

    // Retorna a estrutura visual completa da pagina Home.
    return (
        <Conteiner> {/* Envolve o conteudo em um container de layout padrao. */}
            <img
                src={minhaFoto} // Define a origem da imagem de perfil.
                alt="Foto de Daniel Costa" // Texto alternativo para acessibilidade.
                className="mx-auto mt-10 mb-6 h-32 w-32 rounded-full border-4 border-white object-cover transition-transform hover:scale-105" // Classes de estilo e efeito de hover.
            />
            <h1 className="text-4xl font-bold mb-4 text-center">Repositorios do Daniel Costa</h1> {/* Titulo principal da pagina. */}
            <p className="text-lg mb-4 text-center">Desenvolvedor Full Stack</p> {/* Subtitulo com descricao profissional. */}
            <a
                href="https://github.com/DaniBoy083" // Link externo para o perfil GitHub.
                className="mx-auto flex w-fit items-center justify-center rounded-md border border-white px-5 py-2 text-white transition hover:bg-white hover:text-black" // Estilos do botao/link.
                target="_blank" // Abre o link em nova aba.
                rel="noopener noreferrer" // Protecoes de seguranca para links externos.
            >
                <FaGithub className="mr-2" /> {/* Icone do GitHub ao lado do texto. */}
                GitHub {/* Rotulo do link. */}
            </a>

            {/* Bloco do campo de busca para filtrar os repositorios por nome. */}
            <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-2">
                <div className="relative flex-1"> {/* Wrapper relativo para posicionar o icone dentro do input. */}
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> {/* Icone de lupa dentro do campo. */}
                    <input
                        value={filtro} // Valor controlado pelo estado de filtro.
                        onChange={(e) => setFiltro(e.target.value)} // Atualiza o filtro conforme digitacao.
                        type="text" // Define o tipo textual do input.
                        placeholder="Filtrar repositórios..." // Texto exibido quando o campo esta vazio.
                        className="w-full rounded-md border border-white bg-black py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-400 focus:outline-none" // Estilos visuais do campo.
                    />
                </div>
            </div>

            {/* Bloco com estados da listagem e cards dos repositorios filtrados. */}
            <div className="mx-auto mt-6 w-full max-w-2xl pb-10">
                {carregando && (
                    <p className="text-center text-gray-400">Carregando repositórios...</p> // Mensagem exibida enquanto carrega dados.
                )}
                {!carregando && reposFiltrados.length === 0 && (
                    <p className="text-center text-gray-400">Nenhum repositório encontrado.</p> // Mensagem exibida quando nao ha resultados.
                )}
                {reposFiltrados.map((repo) => (
                    <div key={repo.id} className="mb-3 flex items-center gap-2"> {/* Linha do repositorio com card clicavel. */}
                        <Link
                            to={`/details/DaniBoy083/${repo.name}`} // Navega para pagina de detalhes com owner e nome do repositorio.
                            className="flex flex-1 flex-col rounded-md border border-white/20 bg-white/5 px-4 py-3 transition hover:border-white/60 hover:bg-white/10" // Estilos do card clicavel.
                        >
                            <span className="font-semibold text-white">{repo.name}</span> {/* Exibe o nome do repositorio. */}
                            {repo.description && (
                                <span className="mt-1 text-sm text-gray-400">{repo.description}</span> // Exibe descricao quando existir.
                            )}
                            <div className="mt-2 flex gap-4 text-xs text-gray-500"> {/* Linha de metadados do repositorio. */}
                                {repo.language && <span>{repo.language}</span>} {/* Exibe linguagem principal quando existir. */}
                                <span>★ {repo.stargazers_count}</span> {/* Exibe total de estrelas. */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </Conteiner>
    );
}