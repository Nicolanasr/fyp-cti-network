"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../Middlewares/verifyToken");
var multer = require("multer");
var upload = multer();
const postControllers = require("../Controllers/posts.controllers");
const router = express_1.default.Router();
router.post("/new", [upload.array("files[]", 10), verifyToken_1.verifyToken], postControllers.addNewPost);
router.get("/get_latest", verifyToken_1.verifyToken, postControllers.getLastestPosts);
router.get("/:post_slug", verifyToken_1.verifyToken, postControllers.getPostBySlug);
router.post("/like", verifyToken_1.verifyToken, postControllers.likePost);
router.post("/comment", verifyToken_1.verifyToken, postControllers.postComment);
module.exports = router;
