import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export default function TabGroup(props: Props) {
    return (
        <div className="flex cursor-pointer bg-slate-700 rounded-lg shadow">
            {props.children}
        </div>
    );
}