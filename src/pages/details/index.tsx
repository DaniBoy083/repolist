/*
  Página de detalhes de um repositório
  Recebe o nome do repo via parâmetro de rota (:repo)
*/

import Conteiner from "../../components/conteiner";

export default function DetailsPage() {
    return (
        <Conteiner>
            <h1 className="text-4xl font-bold mb-4">Detalhes do Repositório</h1>
        </Conteiner>
    );
}
