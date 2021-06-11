import joi from "joi";
import jwt from "jsonwebtoken";
import { errorResponse } from "../app/utility/helpers";

const schema = {
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
};

const authMiddleware = {
    //validate required fields for login
    checkRequest: async (req, res, next) => {
        try {
            const data = await schema.login.validate(req.body, {
                abortEarly: false,
            });
            data.error
                ? res.status(400).json({ errors: errorResponse(data) })
                : next();
        } catch (error) {
            next(error);
        }
    },
    //check if user is authenticated
    isAuthenticated: async (req, res, next) => {
        try {
            if (!req.cookies.sch) {
                res.status(401).json({
                    errors: [
                        { message: "It seems that you are not logged in." },
                    ],
                });
            } else {
                const token = req.cookies.sch;

                jwt.verify(token, process.env.TOKEN_SALT, (err) => {
                    if (err) {
                        res.status(401).json({
                            errors: [
                                {
                                    message:
                                        "It seems that you are not logged in.",
                                },
                            ],
                        });
                    }

                    next();
                });
            }
        } catch (error) {
            next(error);
        }
    },
};

export default authMiddleware;
