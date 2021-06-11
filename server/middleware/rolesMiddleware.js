import joi from "joi";
import Role from "../app/models/Role";
import { errorResponse } from "../app/utility/helpers";

/* -------------------------------------------
|  Schema for users resources validation
|  Defined for all operations that work
|  with users
|  ------------------------------------------- */
const schema = {
    create: joi.object({
        name: joi
            .string()
            .max(25)
            .message("Name can't be longer than 25 characters")
            .required(),
    }),
};

/* -------------------------------------------
|  Validation midlewares used in router
|  to validate the requests made on user routes
|  ------------------------------------------- */

const rolesMiddleware = {
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
    roleExists: async (req, res, next) => {
        try {
            const exists = await Role.find({ name: req.body.name });

            exists.length > 0
                ? res.status(409).json({
                      errors: {
                          name: "A role with this name already exists",
                      },
                  })
                : next();
        } catch (error) {
            next(error);
        }
    },
};

export default rolesMiddleware;
