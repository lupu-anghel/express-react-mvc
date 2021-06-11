import Role from "../models/Role";
import { hateoas } from "../utility/helpers";

class RolesController {
    /*
     * method to retrieve all resources
     * @param req res next
     * @return response
     *
     */
    static async all(req, res, next) {
        try {
            const roles = await Role.find({});
            return res.status(200).json({
                data: hateoas("/api/v1/roles/", roles),
            });
        } catch (error) {
            next(error);
        }
    }

    /*
     * method to retrieve one resource by id
     * @param req res next
     * @return response
     *
     */
    static async find(req, res, next) {
        try {
            const id = req.params.id;
            const role = await Role.find({ _id: id }).select();

            if (role.length === 0) {
                return res
                    .status(404)
                    .json({ errros: { message: "Role not found" } });
            } else {
                return res.status(200).json(role);
            }
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ errors: { message: "Role not found" } });
            }
            next(error);
        }
    }

    /*
     * method to create a resource
     * @param req res next
     * @return response
     *
     */
    static async create(req, res, next) {
        try {
            const role = new Role({
                name: req.body.name,
            });
            await role.save();

            res.status(201).json({ message: "Resource created" });
        } catch (error) {
            next(error);
        }
    }

    /*
     * method to update a role
     */
    static async update(req, res, next) {
        try {
            const id = req.params.id;

            const role = await Role.updateOne(
                { _id: id },
                {
                    $set: {
                        name: req.body.name,
                    },
                }
            );
            if (role && role.ok === 1) {
                res.status(200).json({
                    success: true,
                    message: "Successfully modified",
                });
            } else {
                res.status(500).json({ success: false });
            }
        } catch (error) {
            next(error);
        }
    }

    /*
     * method to delete the role
     */
    static async remove(req, res, next) {
        try {
            const id = req.params.id;
            const role = await Role.deleteOne({ _id: id });
            if (role.deletedCount === 0) {
                res.status(204).send();
            } else {
                res.status(200).json({
                    success: true,
                    message: "Role deleted",
                });
            }
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ errors: { message: "Role not found" } });
            } else {
                next(error);
            }
        }
    }
}

export default RolesController;
