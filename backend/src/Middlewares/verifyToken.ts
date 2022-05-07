import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader: string | undefined = req.headers.authorization;

	if (authHeader) {
		let token;
		token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.jwtSecret, (err: any, user: any) => {
			if (err) {
				return res.status(403).json({ success: false, message: "Token invalid" });
			}
			const user_data = JSON.parse(JSON.stringify(user));
			user_data["password"] = undefined;
			user_data["created_at"] = undefined;
			req.body.user = user_data;
			next();
		});
	} else {
		res.status(401).json({ success: false, message: "malformed header" });
	}
};
