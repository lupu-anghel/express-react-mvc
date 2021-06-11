import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import validate from "./useValidateLogin";
import { API_ROUTE } from "../globals";

const useLogin = () => {
    const { setUserContext, setLoadingContext } = useContext(UserContext);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;

        //update state for field value
        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate(values);
        if (errors) {
            setErrors(errors);
        } else {
            //make http request towards the REST API endpoint
            const requestOptions = {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            };
            fetch(API_ROUTE + "/login", requestOptions)
                .then(async (response) => {
                    const data = await response.json();

                    if (response.status === 400 || response.status === 401) {
                        setErrors(data.errors);
                        setUserContext(null);
                        setLoadingContext(false);
                    }
                    if (response.status === 200) {
                        setErrors({});
                        setUserContext(data);
                        setLoadingContext(false);
                        history.push("/dashboard");
                    }
                })
                .catch((error) => {
                    setErrors(error);
                });
        }
    };

    return { handleChange, handleSubmit, values, errors };
};

export default useLogin;
