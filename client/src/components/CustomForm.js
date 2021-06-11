import TextField from "@material-ui/core/TextField";
import useForm from "../hooks/useForm";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modalBtns: {
        padding: theme.spacing(1, 3),
        marginTop: theme.spacing(3),
    },
}));

/**
 *  Component that returns a custom form component, based on the props received.
 * Can be used whenever a new Form is needed, and generates the fields
 * based on the formFields object sent in props, as well as the action button.
 * It makes use of useForm() custom hook for validation, input state change and submitting.
 * Currently deals only with TextField @material-ui type of inputs but can be expanded further.
 * @param {*} props{Object}
 * 1. formFields {Object} - ex name: {value: "", required: true, placeholder: "Placeholder", type:"text"}
 * 2. onSubmitCallback {Function} - Callback function to be passed upon submitting the form
 * 3. button {Object} - Object with data to customize the submit form button ex: { text: "Update", color: "primary" }
 * 4. loading {Boolean} - Boolean to render loading... before the asynchronous formFields are set
 * @returns {*} {Component}
 */
const CustomForm = (props) => {
    const classes = useStyles();
    const { formFields, onSubmitCallback, button, loading } = props;
    //useForm hook for managing and handling errors in the form
    const { handleSubmit, handleChange, values, errors } = useForm({
        formFields: formFields,
        callback: onSubmitCallback,
    });

    if (formFields && !loading) {
        return (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                    {/* loop through the form fields object and generate the inputs for the form */}
                    {Object.keys(formFields).map((key) => {
                        const { label, type } = formFields[key];

                        return type === "hidden" ? (
                            <TextField
                                key={key}
                                type={type}
                                id={key}
                                name={key}
                                value={values[key]["value"]}
                                onChange={handleChange}
                            />
                        ) : (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    error={errors && errors[key] ? true : false}
                                    helperText={errors ? errors[key] : ""}
                                    variant="outlined"
                                    label={label}
                                    type={type ? type : "text"}
                                    id={key}
                                    name={key}
                                    fullWidth
                                    required
                                    value={values[key]["value"]}
                                    onChange={handleChange}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color={button.color ? button.color : "default"}
                            variant="contained"
                            className={classes.modalBtns}
                        >
                            {button.text ? button.text : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    } else {
        return <>Loading</>;
    }
};

export default CustomForm;
