"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require("cors");
const verifyToken_1 = require("./src/Middlewares/verifyToken");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
const db = process.env.MONGO_URI;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
var usersRouter = require("./src/Routes/users.routes");
app.use("/user", usersRouter);
app.use("/", verifyToken_1.verifyToken, (req, res) => {
    res.send("hello wolrd");
});
// catch 404 and forward to error handler
app.use(function (_, res, next) {
    res.status(404).json({
        message: "No such route exists",
    });
});
app.listen(port, () => {
    console.info(`[server]: Server is running at https://localhost:${port}`);
});
mongoose_1.default
    .connect(db)
    .then(() => {
    console.log("[server] Connected to MongoDB");
})
    .catch((err) => {
    console.log("[server] Error in connecting to MongoDB");
    console.log(err);
});
