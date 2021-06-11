import express from "express";
const router = express.Router();
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import rolesRoutes from "./rolesRoutes";

/* -----------------------------------------
|   Class that incapsulates all the routes
|   and handle the requests
|  ----------------------------------------- */
class Routes {
    set(app) {
        /*
         * Setting up desired app headers
         */

        app.use((req, res, next) => {
            res.set({
                "Content-Type": "application/json; charset=utf-8",
            });

            next();
        });

        /*
         *  App's declared routes
         */
        app.use("/api/v1/", authRoutes);
        app.use("/api/v1/", usersRoutes);
        app.use("/api/v1/", rolesRoutes);

        /*
         * General error handling
         */
        app.use((err, req, res, next) => {
            const { status = 500 } = err;
            const { message = "Internal Server Error" } = err;
            res.status(status).send(message);
        });

        /*
         * 404 response handler for unexisting routes
         */
        app.use(async (req, res) => {
            res.status(404).send({ message: "Resource not found" });
        });
    }
}

export default Routes;
