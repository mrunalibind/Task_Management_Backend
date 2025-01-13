import { io } from "../app.js";
import Notification from "../models/notifications.js";
import Task from "../models/tasks.js";

export const createTask = async (req, res) => {
    let { title, description } = req.body;
    try {
        if(!title || !description) 
            return res.status(401).json({ msg: "title and description both are required"});

        let task = new Task({ title, description, userId: req.user._id, team: req.user.team });
        await task.save();

        let notification = new Notification({ title: `${req.user.name} created task: ${title}`, user: req.user.id, task: task._id, team: req.user.team });

        await notification.save();
        // console.log(notification, "notification created");

        // Emit Notification
        try {
            io.emit("newNotification", notification);
            // console.log("Notification emitted:", notification);
        } catch (err) {
            console.error("Failed to emit notification:", err);
        }
        

        res.status(200).json({
            msg: "Task created Successfull",
            task
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const retrieveTask = async (req, res) => {
    try {
        let { page, perPage } = req.query;
        page = parseInt(page, 10) || 1;
        perPage = parseInt(perPage, 10) || 10;

        const options = {
            page,
            limit: perPage,
            sort: { createdAt: -1 },
        };

        const tasks = await Task.paginate({ team: req.user.team }, options);
        
        res.status(200).json({
            tasks,   
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    let { taskID } = req.query;
    let { title, description } = req.body;
    try {
        if(!taskID) return res.status(401).json({ msg: "taskID is required" });

        if(!title && !description) 
            return res.status(401).json({ msg: "Provide atleast one from title or description"});

        let task = await Task.findById(taskID);

        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        // Update only provided fields
        if (title) task.title = title;
        if (description) task.description = description;

        await task.save();

        let notification = new Notification({ title: `${req.user.name} updated task: ${task.title}`, user: req.user.id, task: task._id, team: req.user.team });
        await notification.save();

        io.emit("newNotification", notification);


        return res.status(200).json({
            msg: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const removeTask = async (req, res) => {
    let { taskID } = req.query;
    try {
        if(!taskID) return res.status(401).json({ msg: "taskID is required" });
        
        let task = await Task.findByIdAndDelete(taskID);

        let notification = new Notification({ title: `${req.user.name} completed task: ${task.title}`, user: req.user.id, task: task._id, team: req.user.team });
        await notification.save();

        io.emit("newNotification", notification);

        res.status(200).json({
            msg: "Task Completed Successfull"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
