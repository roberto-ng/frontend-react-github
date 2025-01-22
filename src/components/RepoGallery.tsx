import { useMemo, useState } from "react";
import { GithubRepo } from "../services/GithubApiService";
import { RepoCard } from "./RepoCard";

export type Props = {
    repos?: Array<GithubRepo> | null,
};

const ITEMS_PER_PAGE = 10;

export default function RepoGallery(props: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const numberOfPages = useMemo(() => {
        if (props.repos == null) {
            return 0;
        }

        // calcular quantidade de páginas
        return Math.ceil(props.repos.length / ITEMS_PER_PAGE);
    }, [props.repos]);

    const itemsInPage = useMemo(() => {
        if (props.repos == null) {
            return [];
        }

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return props.repos.slice(start, end);
    }, [props.repos, currentPage]);

    const canGoToNext = currentPage < numberOfPages;
    const canGoToPrevios = currentPage > 1;

    const goToNext = () => {
        if (canGoToNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevious = () => {
        if (canGoToPrevios) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (props.repos == null || props.repos.length === 0) {
        return (
            <div>
                <p className="mt-3 text-xl font-semibold text-white">
                    Nenhum repositório encontrado.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center flex-1 gap-4">
            <div className="grid w-[90vw] md:w-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[2200px]">
                {itemsInPage?.map((item) => (
                    <div key={item.node_id} className="">
                        <RepoCard
                            name={item.name}
                            fullName={item.full_name}
                            ownerName={item.owner.login}
                            description={item.description}
                            avatar={item.owner.avatar_url}
                        />
                    </div>
                ))}

            </div>

            <div className="flex items-center justify-between flex-1 w-full gap-10">
                <button 
                    className="w-10 text-3xl text-white rounded-full select-none bg-slate-700 hover:bg-slate-500 aspect-square"
                    onClick={goToPrevious}
                
                >
                    {"<"}
                </button>

                <p className="text-lg text-white">
                    Página {currentPage} de {numberOfPages}
                </p>

                <button 
                    className="w-10 text-3xl text-white rounded-full select-none bg-slate-700 hover:bg-slate-500 aspect-square"
                    onClick={goToNext}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}