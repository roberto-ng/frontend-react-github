import { useContext } from "react";
import RepoGallery from "../components/RepoGallery";
import { FavoritosContext } from "../contexts/FavoritosContext";

export default function ReposFavoritosRoute() {
    const { state } = useContext(FavoritosContext);

    if (state == null || state.favoritos.length === 0) {
        return (
            <div>
                <p className="text-white text-xl font-semibold mt-3">
                    Você ainda não adicionou nenhum repositório aos seus favoritos.
                </p>
            </div>
        );
    }

    return (
        <div>
            <RepoGallery repos={state.favoritos} />
        </div>
    );

}