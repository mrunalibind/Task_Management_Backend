import express from "express";

import {
    retrieveNotification,
    viewNotification
} from "../controllers/notificationsController.js";
import authentication from "../middleware/authentication.js";

let notificationRouter = express.Router();

notificationRouter.route("/retrieveNotification").get(authentication, retrieveNotification);
notificationRouter.route("/viewNotification").patch(authentication, viewNotification);

export default notificationRouter;