import mongoose from "mongoose";

let notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title."],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    task: {
        type: mongoose.Schema.ObjectId,
        ref: "Task",
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    view: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

let Notification = mongoose.model("notification", notificationSchema);
export default Notification;