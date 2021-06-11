import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    customAlert: {
        top: "24px",
        transform: "translatey(50%)",
        bottom: "auto",
    },
}));
/**
 *
 * @param {*} props{Object}
 * 1. type {String} error | success | warning | info
 * 2. title {String}
 * 3. message {String}
 * 4. openAlert {Boolean}
 * 5. updateSetAlert {Function} function to allow the component to change the state of openAlert on close
 * @returns {*} {Component}
 */
const CustomAlert = (props) => {
    const classes = useStyles();
    const { type, title, message, openAlert, updateSetAlert } = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        updateSetAlert(false);
    };

    return (
        <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            className={classes.customAlert}
        >
            <Alert severity={type} onClose={handleClose}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
