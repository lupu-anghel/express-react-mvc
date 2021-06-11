import User from "../models/User";

import bcrypt from "bcrypt";
import { hateoas } from "../utility/helpers";

class UsersController {
    /**
     * method to retrieve all resources
     * @param {*}(req, res, next)
     * @return response
     *
     */
    static async all(req, res, next) {
        try {
            const users = await User.find().select(["-password"]);

            return res.status(200).json({
                data: hateoas("/api/v1/users/", users),
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * method to retrieve one resource
     * @param {*}(req, res, next)
     * @return response
     *
     */
    static async find(req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.find({ _id: id }).select(["-password"]);

            if (user.length === 0) {
                return res
                    .status(404)
                    .json({ errros: { message: "User not found" } });
            } else {
                return res.status(200).json(user);
            }
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ errors: { message: "User not found" } });
            }
            next(error);
        }
    }

    /**
     * method to create a resource
     * @param {*}(req, res, next)
     * @return response
     *
     */
    static async create(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
            });

            await user.save();
            res.status(201).json({
                success: true,
                message: "You have been successfully registered",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;
