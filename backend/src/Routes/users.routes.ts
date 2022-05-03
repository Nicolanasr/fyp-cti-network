import express, { Response } from "express";

const userControllers = require("../Controllers/users.controllers");
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.get("/", (_, res: Response) => {
	res.send("User");
});

router.post("/register", userControllers.register);
router.post("/signin", userControllers.signin);
router.get("/logout", userControllers.logout);
router.get("/verify_token", verifyToken, userControllers.isTokenValid);
router.get("/:id", userControllers.getUserInfo);

module.exports = router;
