import { RepoCard } from "../components/RepoCard";
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
            <div className="flex flex-wrap justify-center gap-3 max-w-[2000px]">
                {promise.data?.map((item) => (
                    <RepoCard 
                        key={item.node_id} 
                        name={item.name}
                        fullName={item.full_name}
                        ownerName={item.owner.login}
                        description={item.description}
                        avatar={item.owner.avatar_url}
                    />
                ))}
            </div>
        </div>
    );
}