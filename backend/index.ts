import express, { Express, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const cors = require("cors");

// import { verifyToken } from "./src/Middlewares/verifyToken";

const app: Express = express();

dotenv.config();
const port = process.env.PORT;
const db = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var usersRouter = require("./src/Routes/users.routes");
var postsRouter = require("./src/Routes/posts.routes");

app.use("/user", usersRouter);
app.use("/post", postsRouter);

// catch 404 and forward to error handler
app.use(function (_, res: Response, next) {
	res.status(404).json({
		message: "No such route exists",
	});
});

app.listen(port, () => {
	console.info(`[server]: Server is running at https://localhost:${port}`);
});

mongoose
	.connect(db!)
	.then(() => {
		console.log("[server] Connected to MongoDB");
	})
	.catch((err) => {
		console.log("[server] Error in connecting to MongoDB");
		console.log(err);
	});
