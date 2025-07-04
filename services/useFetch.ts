import { useEffect, useState } from "react";


const useFetch = <T>(fetchFunc : () => Promise<T>, authFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null);
            const result = await fetchFunc();
            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error : new Error("An unexpected error occurred"))
        }finally {
            setLoading(false);
        }
    }
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

   useEffect(()=>{
        if (authFetch) {
            fetchData();
        }
   }, [])

   return {data, loading, error, refetch: fetchData, reset}
}

export default useFetch;