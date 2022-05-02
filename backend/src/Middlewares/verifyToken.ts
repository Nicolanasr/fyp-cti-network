import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader: string | undefined = req.headers.authorization;
	const cookieToken = req.headers.cookie?.split("=")[1];

	if (cookieToken || authHeader) {
		let token;
		if (cookieToken) token = cookieToken;
		else if (authHeader) token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.jwtSecret, (err: any, user: any) => {
			if (err) {
				return res.status(403).json({ success: false, message: "Token invalid" });
			}
			req.body.user = user;
			next();
		});
	} else {
		res.status(401).json({ success: false, message: "malformed header" });
	}
};
