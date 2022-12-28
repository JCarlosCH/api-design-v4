import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createNewUser, signIn } from "./handlers/user";

import { protect } from "./modules/auth";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.status(200)
        .json({ message: "Hello" })
        .end();
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
    console.error(err);
    switch (err.type) {
        case "auth":
            var status = 401;
            var message = "Unauthorized";
            break;
        case "input":
            var status = 400;
            var message = "Invalid input";
            break;
        default:
            var status = 500;
            var message = "Server error";
            break;
    }
    res.status(status)
        .json({ message });
});

export default app;
