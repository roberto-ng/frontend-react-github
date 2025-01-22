import { DateTime } from "luxon";
import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { z } from "zod";
import { GithubRepo, GithubRepoDetails, githubRepoDetailsSchema } from "../services/GithubApiService";

export type ActionAdicionar = {
    type: "ADICIONAR",
    payload: GithubRepoDetails,
}

export type ActionRemover = {
    type: "REMOVER",
    repoFullName: string,
}

export type ActionBuscarLocalStorage = {
    type: "BUSCAR_LOCAL_STORAGE",
}

export type Action =
    | ActionAdicionar
    | ActionRemover
    | ActionBuscarLocalStorage;

export type State = {
    favoritos: Array<GithubRepoDetails>,
    localStorageFetchedAt: string | null,
}

export type FavoritosContextValue = {
    state: State,
    dispatch: Dispatch<Action>,
}

export const FavoritosContext = createContext<FavoritosContextValue>(null!);

const initialState: State = {
    favoritos: [],
    localStorageFetchedAt: null,
};

function favoritosReducer(state: State, action: Action): State {
    console.log(action);
    switch (action.type) {
        case "ADICIONAR": {
            const favoritos = [...state.favoritos, action.payload];
            atualizarLocalStorage(favoritos);

            return {
                ...state,
                favoritos: favoritos,
            };
        }

        case "REMOVER": {
            const favoritos = state.favoritos.filter((item) => item.full_name !== action.repoFullName);
            atualizarLocalStorage(favoritos);
            return {
                ...state,
                favoritos: favoritos,
            };
        }

        case "BUSCAR_LOCAL_STORAGE": {
            const isoDateTime = DateTime.now().toISO();
            const json = localStorage.getItem("favoritos") ?? "[]";
            const favoritos = favoritesSchema.parse(JSON.parse(json));
            return {
                ...state,
                favoritos: favoritos,
                localStorageFetchedAt: isoDateTime,
            };
        }
    }
}

function atualizarLocalStorage(favoritos: Array<GithubRepo>) {
    const json = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", json);
}

export default function FavoritosProvider(props: PropsWithChildren) {
    const [state, dispatch] = useReducer(favoritosReducer, initialState);
    const value = { state, dispatch };

    useEffect(() => {
        if (state.localStorageFetchedAt == null) {
            dispatch({ type: "BUSCAR_LOCAL_STORAGE" });
        }
    }, []);

    return (
        <FavoritosContext.Provider value={value}>
            {props.children}
        </FavoritosContext.Provider>
    );
}

const favoritesSchema = z.array(githubRepoDetailsSchema);