import { useEffect, useState } from "react";

export type PromiseState =
    | "IDLE"
    | "PENDING"
    | "SUCCESS"
    | "ERROR";

export function usePromise<T>(promiseFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [state, setState] = useState<PromiseState>("IDLE");
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let ignore = false;

        setState("PENDING");
        promiseFn()
            .then(resolvedPromise => {
                if (!ignore) {
                    setData(resolvedPromise);
                    setState("SUCCESS");
                }
            })
            .catch((err) => {
                console.error(err);

                if (!ignore) {
                    setError(err);
                    setState("ERROR");
                }
            });

        return () => {
            ignore = true;
        };
    }, []);

    return {
        state: state,
        data: data,
        error: error,
        isSuccess: state === "SUCCESS",
        isPending: state === "PENDING" || state === "IDLE",
        isIdle: state === "IDLE",
        isError: state === "ERROR",
    };
}