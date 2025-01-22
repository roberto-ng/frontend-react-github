import loadingIcon from "../assets/loading.svg";

export function Spinner() {
    return (
        <div className="flex-1 items-center justify-center">
            <img 
                src={loadingIcon}
                className="h-12 w-12 animate-spin"
            />
        </div>
    );
}