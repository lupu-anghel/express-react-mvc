import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useSignup from "../hooks/useSignup";
import CustomAlert from "../components/CustomAlert";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "65vh",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(2, 0),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    /*
     * Alert state
     */
    const [alertData, setAlertData] = useState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
    });
    const { handleChange, handleSubmit, values, errors, registered } =
        useSignup({ setAlertData });

    useEffect(() => {
        document.title = "Signup";
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <CustomAlert
                openAlert={alertData.isOpen}
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                updateSetAlert={setAlertData}
            />
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.firstName ? true : false}
                                helperText={errors.firstName}
                                name="firstName"
                                variant="outlined"
                                id="firstName"
                                label="First Name"
                                required
                                fullWidth
                                autoFocus
                                value={values.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.lastName ? true : false}
                                helperText={errors.lastName}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={errors.email ? true : false}
                                helperText={errors.email}
                                variant="outlined"
                                id="email"
                                label="Email Address"
                                name="email"
                                required
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={errors.password ? true : false}
                                helperText={errors.password}
                                variant="outlined"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                required
                                fullWidth
                                autoComplete="new-password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {registered ? (
                <CustomAlert
                    type="success"
                    title="Success"
                    message="Your account has been created!"
                />
            ) : (
                ""
            )}
        </Container>
    );
}
