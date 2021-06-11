import express from "express";
import middlewares from "../middleware/authMiddleware";
import AuthController from "../app/controllers/AuthController";
// import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", middlewares.checkRequest, AuthController.login);
router.post("/logout", AuthController.logout);

//Route for client (react) to check if a user is logged in
//in order to allow it to access or not one of its routes
router.get("/is-auth", AuthController.clientLoggedIn);

export default router;
