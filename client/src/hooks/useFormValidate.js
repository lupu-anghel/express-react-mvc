/**
 * Generic method to validate input fields
 * @param (array of objects) fields
 * @returns object || false
 *
 */

const useFormValidate = (fields) => {
    let errors = {};

    for (const k in fields) {
        const { value, required, type, minLength, maxLength } = fields[k];
        //required field
        if (required && !value.trim()) {
            errors[k] = "The field " + k + " is required";
        }
        //field type email
        if (
            type === "email" &&
            !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                value.trim()
            )
        ) {
            errors[k] = "Please use a valid email address";
        }
        //minimum length required
        if (minLength && minLength > value.trim().length) {
            errors[k] = "Please enter at least " + minLength + " characters";
        }
        //max length required
        if (maxLength && maxLength < value.trim().length) {
            errors[k] =
                "Please enter a maximum of " + maxLength + " characters";
        }
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return false;
    }
};

export default useFormValidate;
