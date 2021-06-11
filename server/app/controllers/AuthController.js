import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    /**
     *  method used to login a user
     */
    static async login(req, res, next) {
        try {
            //get request data & find if user exists
            const { email, password } = req.body;
            const user = await User.find({ email: email });

            if (user.length > 0) {
                //if user exists, check the password
                const validPass = await bcrypt.compare(
                    password,
                    user[0].password
                );

                if (validPass) {
                    const payload = {
                        id: user[0]._id,
                        name: `${user[0].firstName} ${user[0].lastName}`,
                        role: user[0].role,
                    };
                    const token = jwt.sign(payload, process.env.TOKEN_SALT, {
                        expiresIn: "1h",
                    });

                    res.cookie("sch", token, {
                        httpOnly: true,
                        maxAge: 3600000,
                    })
                        .status(200)
                        .json(payload);
                } else {
                    res.status("401").json({
                        errors: {
                            email: "Incorrect email or password",
                            password: "Incorrect email or password",
                        },
                    });
                }
            } else {
                res.status("401").json({
                    errors: {
                        email: "Incorrect email or password",
                        password: "Incorrect email or password",
                    },
                });
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     *  Logout a user
     */
    static async logout(req, res, next) {
        try {
            //Check if user is currently logged in
            if (!req.cookies.sch) {
                res.status(401).json({
                    errors: { unauthorized: "Unauthorized" },
                });
            } else {
                const token = req.cookies.sch;
                jwt.verify(token, process.env.TOKEN_SALT, (error) => {
                    if (error) {
                        res.status(401).json({
                            errors: { unauthorized: "Unauthorized" },
                        });
                    } else {
                        res.cookie("sch", null, { httpOnly: true, maxAge: 0 })
                            .status(200)
                            .json({ success: true });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }

    /*
     *  method for client to check if user is logged in
     */
    static async clientLoggedIn(req, res, next) {
        try {
            if (!req.cookies.sch) {
                res.status(401).send(null);
            } else {
                const token = req.cookies.sch;

                jwt.verify(token, process.env.TOKEN_SALT, (err) => {
                    if (err) {
                        res.status(401).send(null);
                    } else {
                        res.status(200).json(jwt.decode(token));
                    }
                    // console.log(jwt.decode(token))
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
