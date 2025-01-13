import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title."],
    },
    description: {
        type: String,
        required: [true, "Please enter description."],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
}, { timestamps: true });

taskSchema.plugin(mongoosePaginate);

let Task = mongoose.model("task", taskSchema);
export default Task ;