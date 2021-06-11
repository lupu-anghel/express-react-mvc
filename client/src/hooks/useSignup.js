import { useState } from "react";
import { useHistory } from "react-router-dom";
import validate from "./useValidateSingup";
import { API_ROUTE } from "../globals";

const useSignup = (props) => {
    const { setAlertData } = props;
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const history = useHistory();

    const [errors, setErrors] = useState({});

    const [registered, setRegister] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        //update state for field value
        setValues({
            ...values,
            [name]: value,
        });

        //remove prev err on field
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //validate fields
        const errors = validate(values);

        if (errors) {
            setErrors(errors);
        } else {
            //register request to server
            const reqOptions = {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            };
            const url = API_ROUTE + "/register";
            fetch(url, reqOptions)
                .then(async (response) => {
                    const data = await response.json();

                    if (response.status !== 201) {
                        setErrors(data.errors);
                        setRegister(false);
                    } else {
                        setAlertData({
                            isOpen: true,
                            type: "success",
                            title: "Success!",
                            message:
                                "You created your account. You will be redirected to the login page in a few moments",
                        });
                        setRegister(true);
                        setTimeout(() => {
                            history.push("/");
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setAlertData({
                        isOpen: true,
                        type: "error",
                        title: "Error!",
                        message:
                            "An error occured. If you are a developer, please check the console.",
                    });
                    setErrors(error);
                    setRegister(false);
                });
        }
    };

    return { handleChange, handleSubmit, values, errors, registered };
};

export default useSignup;
