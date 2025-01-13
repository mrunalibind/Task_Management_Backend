import express from "express";

import { 
    createTask, 
    retrieveTask, 
    updateTask, 
    removeTask 
} from "../controllers/tasksController.js";
import authentication from "../middleware/authentication.js";
import authorization from "../middleware/authorization.js";

let taskRouter = express.Router();

taskRouter.route("/createTask").post(authentication, createTask);
taskRouter.route("/retrieveTask").get(authentication, retrieveTask);
taskRouter.route("/updateTask").patch(authentication, authorization, updateTask);
taskRouter.route("/removeTask").delete(authentication, authorization, removeTask);

export default taskRouter;