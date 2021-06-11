import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const useLogout = () => {
    const { setUserContext, setLoadingContext } = useContext(UserContext);
    const [errors, setErrors] = useState({});

    const handleLogout = (e) => {
        e.preventDefault();

        const reqOptions = {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: null,
        };
        fetch("http://localhost:5000/api/v1/logout", reqOptions)
            .then(async (response) => {
                const data = await response.json();

                if (response.status === 200) {
                    setErrors({});
                    setLoadingContext(false);
                    setUserContext(null);
                } else {
                    setErrors(data.errors);
                    setLoadingContext(false);
                    setUserContext(null);
                }
            })
            .catch((error) => {
                setErrors(error);
            });
    };

    return { handleLogout, errors };
};

export default useLogout;
