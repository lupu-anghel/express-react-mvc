import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    customForm: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    wrapper: {
        marginTop: theme.spacing(9),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "65vh",
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(2, 0),
    },
}));
const Login = () => {
    const classes = useStyles();

    const { handleChange, handleSubmit, values, errors } = useLogin();

    useEffect(() => {
        document.title = "Login";
    }, []);

    return (
        <Container component="main" maxWidth="sm" className={classes.wrapper}>
            <CssBaseline>
                <Avatar className={classes.icon}>
                    <LockOpenOutlinedIcon />
                </Avatar>

                <Typography variant="h5">Login</Typography>

                <form
                    className={classes.customForm}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.email ? true : false}
                                helperText={errors.email}
                                variant="outlined"
                                label="Email"
                                id="email"
                                name="email"
                                fullWidth
                                required
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.password ? true : false}
                                helperText={errors.password}
                                variant="outlined"
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                fullWidth
                                required
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/register" variant="body2">
                                You don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </CssBaseline>
        </Container>
    );
};

export default Login;
