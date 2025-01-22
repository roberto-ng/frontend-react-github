import BuscaForm from "../components/BuscaForm";
import RepoGallery from "../components/RepoGallery";
import { Spinner } from "../components/Spinner";
import { usePromise } from "../hooks/usePromise";
import { GithubApiService } from "../services/GithubApiService";

export default function ReposPublicosRoute() {
    const promise = usePromise(() => GithubApiService.fetchPublicRepos());

    if (promise.isPending) {
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
            <BuscaForm />

            <RepoGallery repos={promise.data} />
        </div>
    );
}