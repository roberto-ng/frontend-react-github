import { DateTime } from "luxon";
import { useContext, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { FavoritosContext } from "../contexts/FavoritosContext";
import { usePromise } from "../hooks/usePromise";
import { GithubApiService } from "../services/GithubApiService";

export default function RepoDetails() {
    const { owner, repoName } = useParams();
    const { state, dispatch } = useContext(FavoritosContext);
    const navigate = useNavigate();

    const parametrosInvalidos = owner == null || repoName == null;

    const promise = usePromise(async () => {
        if (parametrosInvalidos) {
            return null;
        }

        return await GithubApiService.fetchRepoDetails(owner, repoName);
    });

    const contribuidoresPromise = usePromise(async () => {
        if (parametrosInvalidos) {
            return null;
        }

        return await GithubApiService.fetchContributors(owner, repoName);
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
            <div className="flex flex-col items-center justify-center flex-1 min-w-full gap-5 px-2 min-h-svh bg-slate-800">
                <h2 className="text-2xl font-bold text-white">
                    Parâmetros inválidos
                </h2>

                <button
                    className="px-3 py-1 text-white rounded-md cursor-pointer bg-slate-700 hover:bg-slate-500"
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>
            </div>
        )
    }

    if (promise.isError) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 min-w-full gap-5 px-2 min-h-svh bg-slate-800">
                <h2 className="text-2xl font-bold text-white">
                    Erro ao buscar repositório.
                </h2>

                <button
                    className="px-3 py-1 text-white rounded-md cursor-pointer bg-slate-700 hover:bg-slate-500"
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>
            </div>
        )
    }

    if (promise.isPending) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 min-w-full min-h-screen px-2 pt-20 bg-slate-800">
                <Spinner />
            </div>
        )
    }

    const data = promise.data!;

    const updatedAt = DateTime
        .fromISO(data.updated_at)
        .toLocaleString(DateTime.DATETIME_MED, { locale: "pt-BR" });

    return (
        <div className="flex flex-col items-center flex-1 gap-10 px-3 pt-5 min-h-svh bg-slate-800">
            <div className="flex items-center w-full gap-5">
                <Link to="/">
                    <button
                        className="w-10 text-3xl text-white rounded-full select-none bg-slate-700 hover:bg-slate-500 aspect-square"
                    >
                        {"<"}
                    </button>
                </Link>

                <h1 className="m-0 text-xl font-bold text-white">
                    Detalhes
                </h1>
            </div>

            <div className="flex flex-col justify-between gap-10 md:flex-row">
                <div className="flex flex-col items-center gap-3 min-w-[200px]">
                    <img
                        src={data.owner.avatar_url}
                        className="rounded-full w-[100px] h-[100px] aspect-square object-cover"
                        alt={`Avatar de ${data.owner.login}`}
                    />

                    <button
                        className="px-3 py-1 text-white rounded-md cursor-pointer bg-slate-700 hover:bg-slate-500"
                        onClick={toggleFavorite}
                    >
                        {(isFavorite) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    </button>
                </div>

                <div className="flex flex-col gap-5 px-4 pb-2 md:px-0">
                    <h1 className="text-3xl font-bold text-white">
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

                    {(!contribuidoresPromise.isPending) && (
                        <div className="mt-4">
                            <h1 className="m-0 mb-2 text-xl font-bold text-white">
                                Contribuidores:
                            </h1>

                            {(contribuidoresPromise.isError) && (
                                <p className="text-white">
                                    Erro ao buscar contribuidores do projeto.
                                </p>
                            )}

                            {(contribuidoresPromise.isSuccess) && (
                                <ul className="list-disc">
                                    {contribuidoresPromise.data?.map(c => (
                                        <li key={c.id} className="text-white">
                                            {c.login}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}