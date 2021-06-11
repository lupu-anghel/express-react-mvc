import { useState, useEffect } from "react";
import { API_ROUTE } from "../globals";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        };

        fetch(API_ROUTE + "/is-auth", requestOptions)
            .then(async (response) => {
                const data = await response.json();

                if (response.status === 200) {
                    setUser(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    return [user, isLoading, setUser, setLoading];
};

export default useAuth;
