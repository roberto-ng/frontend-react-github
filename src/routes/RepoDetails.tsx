import { DateTime } from "luxon";
import { useContext, useMemo } from "react";
import { Link, useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { FavoritosContext } from "../contexts/FavoritosContext";
import { usePromise } from "../hooks/usePromise";
import { GithubApiService } from "../services/GithubApiService";

export default function RepoDetails() {
    const { owner, repoName } = useParams();
    const { state, dispatch } = useContext(FavoritosContext);

    const parametrosInvalidos = owner == null || repoName == null;

    const promise = usePromise(async () => {
        if (parametrosInvalidos) {
            return null;
        }

        return await GithubApiService.fetchRepoDetails(owner, repoName);
    });

    const isFavorite = useMemo(() => {
        if (!promise.isSuccess) {
            return false;
        }

        return state.favoritos.some(f => f.full_name === promise.data?.full_name);
    }, [promise.data, state.favoritos]);

    const toggleFavorite = () => {
        if (promise.data == null) {
            return;
        }

        if (isFavorite) {
            dispatch({ type: "REMOVER", repoFullName: promise.data.full_name });
        } else {
            dispatch({ type: "ADICIONAR", payload: promise.data });
        }
    };

    if (parametrosInvalidos) {
        return (
            <div className="flex flex-1 px-2 flex-col justify-center items-center gap-5 min-w-full min-h-svh bg-slate-800">
                <h2 className="font-bold text-2xl text-white">
                    Parâmetros inválidos
                </h2>

                <button className="bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md px-3 py-1 text-white">
                    Voltar
                </button>
            </div>
        )
    }

    if (promise.isError) {
        return (
            <div className="flex flex-1 px-2 flex-col justify-center items-center gap-5 min-w-full min-h-svh bg-slate-800">
                <h2 className="font-bold text-2xl text-white">
                    Erro ao buscar repositório.
                </h2>

                <button className="bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md px-3 py-1 text-white">
                    Voltar
                </button>
            </div>
        )
    }

    if (promise.isPending) {
        return (
            <div className="flex flex-1 px-2 flex-col justify-center items-center pt-20 min-w-full min-h-screen bg-slate-800">
                <Spinner />
            </div>
        )
    }

    const data = promise.data!;

    const updatedAt = DateTime
        .fromISO(data.updated_at)
        .toLocaleString(DateTime.DATETIME_MED, { locale: "pt-BR" });

    return (
        <div className="flex flex-1 px-3 flex-col items-center gap-10 pt-5 min-h-svh bg-slate-800">
            <div className="flex items-center gap-5 w-full">
                <Link to="/">
                    <button
                        className="bg-slate-700 hover:bg-slate-500 select-none text-white rounded-full text-3xl aspect-square w-10"
                    >
                        {"<"}
                    </button>
                </Link>

                <h1 className="text-white font-bold text-xl m-0">
                    Detalhes
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
                <div className="flex flex-col items-center gap-3 min-w-[200px]">
                    <img
                        src={data.owner.avatar_url}
                        className="rounded-full w-[100px] h-[100px] aspect-square object-cover"
                        alt={`Avatar de ${data.owner.login}`}
                    />

                    <button 
                        className="bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md px-3 py-1 text-white"
                        onClick={toggleFavorite}
                    >
                        {(isFavorite) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </button>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-white font-bold text-3xl">
                        {data.name}
                    </h1>

                    <p className="text-white">
                        {data.description}
                    </p>

                    <ul className="list-disc">
                        <li className="text-white">
                            Linguagem: {data.language}
                        </li>

                        <li className="text-white">
                            Dono do repositório: {data.owner.login}
                        </li>

                        <li className="text-white">
                            Última data de alteração: {updatedAt}
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}