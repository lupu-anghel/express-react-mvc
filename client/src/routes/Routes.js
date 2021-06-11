import React from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import ErrorPage from "../pages/ErrorPage";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Roles from "../pages/Roles";
const Routes = () => {
    //Importing the user and loading state to be used in context
    const [user, isLoading, setUser, setLoading] = useAuth();

    //declare the value of the context with callbacks to update its state
    const value = {
        user: user,
        isLoading: isLoading,
        setUserContext: (data) => {
            setUser(data);
        },
        setLoadingContext: (data) => {
            setLoading(data);
        },
    };

    return (
        <>
            <UserContext.Provider value={value}>
                <Router>
                    <Switch>
                        <PublicRoute exact path="/" component={Login} to="/" />
                        <PublicRoute
                            exact
                            path="/register"
                            component={Signup}
                            to="/register"
                        />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute exact path="/users" component={Users} />
                        <PrivateRoute
                            exact
                            path="/profile"
                            component={Profile}
                        />
                        <PrivateRoute exact path="/roles" component={Roles} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        </>
    );
};

export default Routes;
