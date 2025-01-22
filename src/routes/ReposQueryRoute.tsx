import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import BuscaForm from "../components/BuscaForm";
import RepoGallery from "../components/RepoGallery";
import { Spinner } from "../components/Spinner";
import { usePromise } from "../hooks/usePromise";
import { GithubApiService } from "../services/GithubApiService";

export default function ReposQueryRoute() {
    const { nome } = useParams();
    const navigate = useNavigate();

    const parametrosInvalidos = nome == null;

    const promise = usePromise(async () => {
        if (parametrosInvalidos) {
            return;
        }

        return await GithubApiService.queryRepos(nome);
    }, [nome]);


    useEffect(() => {
        if (parametrosInvalidos) {
            navigate("/repos/publicos");
            return;
        }
    }, [])

    if (parametrosInvalidos || promise.isPending) {
        return <Spinner />;
    }

    if (promise.isError) {
        return (
            <div>
                <p className="text-white">
                    Erro ao buscar repositórios.
                </p>
            </div>
        );
    }

    return (
        <div>
            <BuscaForm defaultName={nome} />

            <RepoGallery repos={promise.data} />
        </div>
    );
}