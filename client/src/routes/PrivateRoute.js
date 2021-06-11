import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * Route component to declare privare routes. Uses context, created on login & logout & updated based on API calls.
 * The way it works is by redirecting to '/' if a backend service responds with a 401 (REST API route '/is-auth' to check if the user is authenticated),
 * It was designed to not take into account any cookie that can be manipulated by the client or local storage.
 * While waits for the response from the server, will render Loading... (which can be transformed into a fancy Loader component if needed)
 * @params Route Props like: component to be rendered, path, exact..
 * @returns Loader || Route || Redirect
 */
const PrivateRoute = ({ Component, ...rest }) => {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) {
        return <>Loading...</>;
    }
    if (user) {
        return <Route {...rest} />;
    } else {
        return <Redirect to="/" />;
    }
};

export default PrivateRoute;
