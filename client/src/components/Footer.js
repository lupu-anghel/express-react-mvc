import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
        justifyContent: "center",
    },
    footerChild: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        // borderTop: 'solid 1px #ddd',
        // width: '94%',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Box mt={5} className={classes.footerChild}>
                <Typography variant="body2" align="center">
                    {"Copyright © "}
                    <Link to="/">Your company</Link> {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;
