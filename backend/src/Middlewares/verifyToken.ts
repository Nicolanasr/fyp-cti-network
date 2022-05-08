import { Request, Response, NextFunction } from "express";

import { User } from "../Models/user.model";

const jwt = require("jsonwebtoken");

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader: string | undefined = req.headers.authorization;

	if (authHeader) {
		let token;
		token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.jwtSecret, async (err: any, user: any) => {
			if (err) {
				return res.status(403).json({ success: false, message: "Token invalid" });
			}
			const user_data = await User.findById(user._id).select("-password");
			if (!user_data) {
				return res.status(404).json({ success: false, message: "User not found" });
			}
			console.log(user_data);
			req.body.user = JSON.parse(JSON.stringify(user_data));
			next();
		});
	} else {
		res.status(401).json({ success: false, message: "malformed header" });
	}
};
