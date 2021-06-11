import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// import useAuth from '../hooks/useAuth';
import { UserContext } from "../context/UserContext";

/**
 * Route component that is the opposite of the PrivateRoute.
 * The routes which should be accessed ONLY if user IS NOT authenticated
 * meaning pages like Login or Signup.
 * It is based on server response as the PrivateRoute.
 * For other Public routes, that doesn't need any checks regarding
 * authentication, React Route can be used.
 * @params Route Props like: component to be rendered, path, exact..
 * @returns Loader || Route || Redirect
 */
const PublicRoute = ({ Component, ...rest }) => {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) {
        return <>loading...</>;
    }
    if (user) {
        return <Redirect to="/dashboard" />;
    } else {
        return <Route {...rest} />;
    }
};

export default PublicRoute;
