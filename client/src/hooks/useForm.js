import { useState, useEffect } from "react";
import validate from "./useFormValidate";

/**
 * Generic hook for Form handling and validation
 * @param {*} props
 * 1. formFields(Object) => ex. structure: { email: {value:"", type:"email", required: true}, password: {value: "", type:"password", required:true, minLength: 8} }
 * 2. callback(Function) => callback to be passed to handleSubmit
 * @returns {*} Object
 * 1. handleChange(Function)
 * 2. handleSubmit(Function)
 * 3. values(Object)
 * 4. erros(Object)
 * 5. updateSetErrors(Function)
 */
const useForm = (props) => {
    const { formFields, callback } = props;

    const [values, setValues] = useState(formFields);
    const [errors, setErrors] = useState({});

    //fix race condition: values always got previous state for formFields
    useEffect(() => {
        setValues(formFields);
    }, [formFields]);

    //allow components to update the state
    const updateSetErrors = (state) => {
        setErrors(state);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        //update field values on input change
        setValues({
            ...values,
            [name]: { ...values[name], value: value },
        });
        //remove previous errors on input change
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
            if (callback && typeof callback === "function") {
                callback(values);
            }
        }
    };

    return { handleChange, handleSubmit, updateSetErrors, errors, values };
};

export default useForm;
