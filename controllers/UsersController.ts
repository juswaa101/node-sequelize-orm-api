import { Request, Response } from "express";
import User from "../models/User";
import ResponseHelper from "../helpers/ResponseHelper";
import bcrypt from "bcrypt";
import { NOW } from "sequelize";

class UsersController {

    response: ResponseHelper;

    constructor() {
        this.response = new ResponseHelper();
    }

    fetchUsers = async (req: Request, res: Response) => {
        try {
            const result = await User.findAll();
            this.response.success(res, 'OK', 200, result);
        }
        catch (e) {
            this.response.error(res, 'Error', 500);
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;            
            const hash_password = await bcrypt.hash(password, 10);

            const user = await User.create(
                { name: name, email: email, password: hash_password }
            );

            this.response.success(res, 'User Created!', 200, user.toJSON());
        }
        catch (e) {
            this.response.error(res, 'Error', 500);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params?.user
                }
            });

            if (user) {
                user?.destroy();
                this.response.success(res, 'User Deleted', 200);
            }
            else {
                this.response.error(res, 'User Not Found', 404);
            }
        }
        catch (e) {
            this.response.error(res, 'Error', 500);
        }
    }

    showUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params?.user
                }
            });

            if (user) {
                this.response.success(res, 'User Found', 200, user);
            }
            else {
                this.response.error(res, 'User Not Found', 404);
            }
        }
        catch (e) {
            this.response.error(res, 'Error', 500);
        }
    }


    updateUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params?.user
                }
            });

            if (user) {
                const { name, email, password } = req.body;
                const hash_password = await bcrypt.hash(password, 10);
                user?.update({
                    name, email, password: hash_password, updatedAt: NOW
                });

                this.response.success(res, 'User Updated', 200);
            }
            else {
                this.response.error(res, 'User Not Found', 404);
            }

        }
        catch (e) {
            this.response.error(res, 'Error', 500);
        }
    }

}

export default UsersController;