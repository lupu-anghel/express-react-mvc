import joi from "joi";
import User from "../app/models/User";

import { errorResponse } from "../app/utility/helpers";

/* -------------------------------------------
|  Schema for users resources validation
|  Defined for all operations that work
|  with users
|  ------------------------------------------- */

const schema = {
    create: joi.object({
        firstName: joi
            .string()
            .max(50)
            .message("First name can't be longer than 50 characters")
            .required(),

        lastName: joi
            .string()
            .max(50)
            .message("Last name can't be longer than 50 characters")
            .required(),

        email: joi
            .string()
            .email()
            .max(50)
            .message("Last name can't be longer than 50 characters")
            .required(),

        password: joi
            .string()
            .required()
            .min(8)
            .message("password must be at least 8 characters long"),
    }),
};

/* -------------------------------------------
|  Validation midlewares used in router
|  to validate the requests made on user routes
|  ------------------------------------------- */

const usersMiddleware = {
    //Validates request for creating a user: checks for required fields
    createValidation: async (req, res, next) => {
        try {
            const value = await schema.create.validate(req.body, {
                abortEarly: false,
            });

            value.error
                ? res.status(400).json({ errors: errorResponse(value) })
                : next();
        } catch (error) {
            next(error);
        }
    },
    //Validates request for creating a user: checks if email already exists
    emailExists: async (req, res, next) => {
        try {
            const exists = await User.find({ email: req.body.email });
            exists.length > 0
                ? res.status(409).json({
                      errors: {
                          email: "An account with this email address already exists.",
                      },
                  })
                : next();
        } catch (error) {
            next(error);
        }
    },
};

export default usersMiddleware;
