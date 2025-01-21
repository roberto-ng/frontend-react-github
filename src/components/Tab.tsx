import clsx from "clsx";
import { Link } from "react-router";

type Props = {
    title: string,
    href: string,
    iconSource: string,
    activeRoute?: string,
}

export default function Tab(props: Props) {
    const isActive = props.href === props.activeRoute;

    return (
        <Link to={props.href} viewTransition>
            <div
                className={clsx([
                    "flex flex-col justify-between items-center px-2 py-3 flex-1 border-white/50 border-r last:border-r-0",
                    "hover:bg-slate-600 first:rounded-l-lg  last:rounded-r-lg transition-colors",
                    isActive && "bg-blue-600 hover:bg-blue-500",
                ])}
            >
                <img
                    src={props.iconSource}
                    className="h-12 w-12"
                />

                <p className="text-lg lg:whitespace-nowrap text-center font-bold text-white">
                    {props.title}
                </p>
            </div>
        </Link>
    );
}