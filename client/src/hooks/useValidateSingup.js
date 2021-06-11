const useValidateSignup = (values) => {
    let errors = {};

    //validate fields firstName & lastName: they are required and
    //should only contain letters & spaces
    const names = {
        firstName: "First Name",
        lastName: "Last Name",
    };
    for (let k in names) {
        if (!values[k].trim()) {
            errors[k] = `The field ${names[k]} is required`;
        } else if (/[^a-zA-Z -]/.test(values[k])) {
            errors[k] = `Please use only letters, dashes, space`;
        }
    }

    //validate email field: required and should be valid email
    if (!values.email.trim()) {
        errors["email"] = "The field Email is required";
    } else if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            values.email
        )
    ) {
        errors["email"] = "Please use a valid email address";
    }

    //validate password: required and should be at least 8 chars long
    if (!values.password) {
        errors["password"] = "The field Password is required";
    } else if (values.password.length < 8) {
        errors["password"] = "Password must be at least 8 characters long";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
};

export default useValidateSignup;
