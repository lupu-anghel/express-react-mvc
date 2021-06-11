import express from "express";
import middlewares from "../middleware/usersMiddleware";
import UsersController from "../app/controllers/UsersController";
import auth from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", auth.isAuthenticated, UsersController.all);

router.get("/users/:id", auth.isAuthenticated, UsersController.find);

router.post(
    "/register",
    middlewares.createValidation,
    middlewares.emailExists,
    UsersController.create
);

export default router;
