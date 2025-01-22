import clsx from "clsx";

export type Props = {
    name: string,
    fullName: string,
    ownerName: string,
    description?: string | null,
    avatar: string,
};

export function RepoCard(props: Props) {
    return (
        <div
            className={clsx([
                "flex justify-between items-center gap-5 px-3 py-1 rounded-md cursor-pointer",
                "w-full md:w-[310px] h-[200px] bg-slate-700 hover:bg-slate-500 transition-colors"
            ])}
        >
            <div className="flex flex-1 flex-col gap-5">
                <h2 className="text-white text-2xl">
                    {props.name}
                </h2>

                <p className="text-white max-w-[250px]">
                    {props.description?.slice(0, 60)}
                </p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <img
                    src={props.avatar}
                    className="rounded-full w-[60px] h-[60px] aspect-square object-cover"
                    alt={`Avatar de ${props.ownerName}`}
                />

                <p className="text-white">
                    {props.ownerName}
                </p>
            </div>
        </div>
    );
}