import express from "express";
import cors from "cors";
const app = express();
import cookie from "cookie-parser";
app.use(cookie());
app.use(cors(
    {
        origin: 'http://localhost:5173', // Your frontend URL
        credentials: true,  // Allow cookies to be sent
    }
));
import http from "http";
import { Server } from "socket.io";
let server = http.createServer(app);

app.use(express.json());
import dotenv from "dotenv";
import connection from "./config/database.js";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";
import notificationRouter from "./routes/notifications.js";
dotenv.config({ path: "./config/config.env" });

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/notification", notificationRouter);

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Working Properly"
    });
});

server.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port", process.env.PORT);
});

export const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend URL
        credentials: true,
      },
    }
);
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("joinTeam", (teamName) => {
        socket.join(teamName); // Join the team-specific room
        console.log(`User joined team: ${teamName}`);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

