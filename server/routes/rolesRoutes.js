import express from "express";
import middlewares from "../middleware/rolesMiddleware";
import auth from "../middleware/authMiddleware";
import RolesController from "../app/controllers/RolesController";

const router = express.Router();
router.get("/roles", auth.isAuthenticated, RolesController.all);
router.get("/roles/:id", auth.isAuthenticated, RolesController.find);
router.put(
    "/roles/:id",
    auth.isAuthenticated,
    middlewares.createValidation,
    middlewares.roleExists,
    RolesController.update
);
router.post(
    "/roles",
    auth.isAuthenticated,
    middlewares.createValidation,
    middlewares.roleExists,
    RolesController.create
);
router.delete("/roles/:id", auth.isAuthenticated, RolesController.remove);

export default router;
