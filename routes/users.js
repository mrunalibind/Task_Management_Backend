import express from "express";

import { 
    register, 
    login, 
    logout 
} from "../controllers/usersController.js";

let userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").patch(logout);

export default userRouter;