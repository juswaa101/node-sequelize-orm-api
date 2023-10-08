import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import UsersRoute from "./routes/UsersRoute";
import ResponseHelper from "./helpers/ResponseHelper";

dotenv.config();

const port = process.env?.PORT;
const app: Express = express();
const response = new ResponseHelper();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

app.use(UsersRoute);

app.use((req: Request, res: Response) => {
    response.error(res, 'Not Found', 404);
});

