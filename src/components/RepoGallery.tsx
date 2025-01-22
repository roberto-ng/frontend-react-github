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

    return (
        <div className="flex flex-1 flex-col items-center gap-10">
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

            <div className="flex flex-1 w-full gap-10 justify-between items-center">
                <button 
                    className="bg-slate-700 hover:bg-slate-500 select-none text-white rounded-full text-3xl aspect-square w-10"
                    onClick={goToPrevious}
                
                >
                    {"<"}
                </button>

                <p className="text-white text-lg">
                    Página {currentPage} de {numberOfPages}
                </p>

                <button 
                    className="bg-slate-700 hover:bg-slate-500 select-none text-white rounded-full text-3xl aspect-square w-10"
                    onClick={goToNext}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}