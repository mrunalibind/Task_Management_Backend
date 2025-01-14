import jwt from "jsonwebtoken";
import Task from "../models/tasks.js";

let authorization = async (req, res, next) => {
        let token = req.cookies.token || req.headers.authorization.split(" ")[1];
        let { taskID } = req.query;
        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if (decoded) {
                // console.log(decoded.role)
                if (decoded.role == "Admin") {
                    next();
                }
                else if (decoded.role == "User") {
                    let task = await Task.findOne({ _id: taskID });
                    // console.log(task.userId, decoded.id)
                    if (task.userId == decoded.id) {
                        next();
                    }
                    else {
                        res.status(500).send({ msg: "You can't delete and update others Tasks" })
                    }
                }
            }
        });
}

export default authorization;