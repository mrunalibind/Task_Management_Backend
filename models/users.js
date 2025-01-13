import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name."],
    },
    team: {
        type: String,
        required: [true, "Please enter team name."],
    },
    role: { 
        type: String, 
        default: "User", 
        enum: ["User", "Admin"] 
    },
    email: { 
        type: String, 
        unique: true, 
        required: [true, "Please enter email."],
    },
    password: { 
        type: String, 
        required: [true, "Please enter password."], 
    }
}, { timestamps: true });

let User = mongoose.model("user", userSchema);
export default User;