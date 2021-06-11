import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "65vh",
    },
}));
const Dashboard = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <AppLayout>
            <div className={classes.root}>
                <h1>This is the dashboard page</h1>
            </div>
            <Footer />
        </AppLayout>
    );
};
export default Dashboard;
