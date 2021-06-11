const useValidateLogin = (values) => {
    let errors = {};

    if (!values.email.trim()) {
        errors["email"] = "The field Email is required";
    } else if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            values.email.trim()
        )
    ) {
        errors["email"] = "Please use a valid email address";
    }

    if (!values.password) {
        errors["password"] = "The field Password is required";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
};

export default useValidateLogin;
