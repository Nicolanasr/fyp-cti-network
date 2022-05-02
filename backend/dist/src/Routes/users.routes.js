"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers = require("../Controllers/users.controllers");
const router = express_1.default.Router();
router.get("/", (_, res) => {
    res.send("User");
});
router.post("/register", userControllers.register);
router.post("/signin", userControllers.signin);
router.get("/:id", userControllers.getUserInfo);
module.exports = router;
