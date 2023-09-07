import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../utils/makeRequest";

const useFetch = (url, request="") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if(request === 'userRequest') {
                    const res = await userRequest.get(url);
                    setData(res.data);
                } else {
                    const res = await publicRequest.get(url);
                    setData(res.data);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;