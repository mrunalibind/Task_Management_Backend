import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    let { name, team, role, email, password } = req.body;

    try {
        role = role || "User";
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: "User is already exist"
            });
        }
        let isTeamPresent = await User.findOne({ team });
        
        if (role == "User" && isTeamPresent == null) {
            return res.status(400).json({
                msg: "Admin is not created these Team"
            });
        }
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                return res.status(401).json({
                    msg: err
                });
            }
            let user = new User({ name, team, role, email, password: hash });
            await user.save();
            res.status(200).json({
                msg: "Register Successfull"
            });
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: "User is not exist" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Set token in cookie
        res.cookie("token", token, {
            // httpOnly: true,  // Prevents client-side access to cookie
            // secure: false,   // Set to true in production with HTTPS
            // sameSite: 'none', // Required for cross-origin requests
            maxAge: 3600000, // 1 hour
        });
        // console.log("Login backend", req.cookies.token)
        
        return res.status(200).json({ 
            msg: "Login successful",
            userID: user._id
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        
        return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
