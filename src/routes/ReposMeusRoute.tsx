import RepoGallery from "../components/RepoGallery";
import { Spinner } from "../components/Spinner";
import { usePromise } from "../hooks/usePromise";
import { GithubApiService } from "../services/GithubApiService";

export default function ReposMeusRoute() {
    const promise = usePromise(() => GithubApiService.fetchMyRepos());

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
            <RepoGallery repos={promise.data} />
        </div>
    );
}