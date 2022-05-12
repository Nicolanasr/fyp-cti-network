import express from "express";
import { verifyToken } from "../Middlewares/verifyToken";

var multer = require("multer");
var upload = multer();

const postControllers = require("../Controllers/posts.controllers");

const router = express.Router();

router.post("/new", [upload.array("files[]", 10), verifyToken], postControllers.addNewPost);
router.get("/get_latest", verifyToken, postControllers.getLastestPosts);
router.get("/:post_slug", verifyToken, postControllers.getPostBySlug);
router.post("/like", verifyToken, postControllers.likePost);
router.post("/comment", verifyToken, postControllers.postComment);

module.exports = router;
