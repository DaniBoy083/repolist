import Conteiner from "../../components/conteiner";
import minhaFoto from "../../assets/minhafoto.jpg";
import { FaGithub} from "react-icons/fa";

// https://api.github.com

export default function HomePage() {
    return (
        <Conteiner>
            <img
                src={minhaFoto}
                alt="Foto de Daniel Costa"
                className="mx-auto mt-10 mb-6 h-32 w-32 rounded-full border-4 border-white object-cover transition-transform hover:scale-105"
            />
            <h1 className="text-4xl font-bold mb-4 text-center">Repositorios do Daniel Costa</h1>
            <p className="text-lg mb-4 text-center">Desenvolvedor Full Stack</p>
            <a href="https://github.com/DaniBoy083" className="mx-auto flex w-fit items-center justify-center rounded-md border border-white px-5 py-2 text-white transition hover:bg-white hover:text-black" target="_blank" rel="noopener noreferrer">
                <FaGithub className="mr-2" />
                GitHub
            </a>
            <form
                className="mx-auto mt-4 flex w-full max-w-md items-center gap-2"
                onSubmit={() => {
                }}
            >
                <input
                    type="text"
                    placeholder="Nome do repositorio"
                    className="min-w-0 flex-1 rounded-md border border-white bg-black px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                />
                <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white text-lg leading-none text-white transition hover:bg-white hover:text-black"
                >
                    +
                </button>
            </form>
        </Conteiner>
    );
}