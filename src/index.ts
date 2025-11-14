import express from "express";
// import userRoutes from "./routes/users.routes.js";

import { createUser, getUsers, getUserById, updateUser } from "./controllers/user.controller";
import morgan from "morgan";
const app = express();

// Middlewares (order matters)
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.post("/api/users", createUser);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.put("/api/users/:id", updateUser);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
