import { FormEvent } from "react";
import { useNavigate } from "react-router";

type Props = {
    defaultName?: string,
}

export default function BuscaForm(props: Props) {
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const nome = formData.get("nome") as string;
        
        const url = `/repos/query/${encodeURIComponent(nome)}`
        navigate(url, { replace: true });
    }

    return (
        <div className="flex justify-center items-center flex-1">
            <form
                onSubmit={onSubmit}
                className="flex flex-col justify-center pb-10 gap-3"
            >
                <label htmlFor="nome" className="text-white text-2xl">
                    {"Buscar projetos: "}
                </label>

                <div className="flex gap-2">
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        className="rounded px-2 py-1"
                        defaultValue={props.defaultName} 
                        required 
                    />
                    <button className="bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md px-3 py-2 text-white">
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    );
}