import express from "express";
import { verifyToken } from "../Middlewares/verifyToken";

var multer = require("multer");
var upload = multer();

const postControllers = require("../Controllers/posts.controllers");

const router = express.Router();

router.post("/new", [upload.array("files[]", 10), verifyToken], postControllers.addNewPost);
router.get("/get_latest", verifyToken, postControllers.getLastestPosts);
router.post("/like", verifyToken, postControllers.likePost);

module.exports = router;
