import express from "express"
import multer from "multer";
import UsersController from "../controllers/UsersController";

export = (() => {
    const upload = multer();
    const usersController = new UsersController()
    const app = express.Router();

    app.get("/", usersController.fetchUsers);
    app.post("/create-user", upload.none(), usersController.createUser);
    app.delete("/delete-user/:user", usersController.deleteUser);
    app.put("/update-user/:user", upload.none(), usersController.updateUser);
    app.get("/show-user/:user", usersController.showUser);

    return app;
})();
