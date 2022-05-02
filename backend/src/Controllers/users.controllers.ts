import { Request, Response } from "express";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { verifyToken } from "../Middlewares/verifyToken";

import { User } from "../Models/user.model";

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = new User();
		user.first_name = req.body?.first_name;
		user.last_name = req.body?.last_name;
		user.email = req.body?.email;
		if (req.body?.password?.length < 8) {
			res.status(400).json({ success: false, message: "password must be >= 8 characters" });
			return;
		}
		user.password = await bcrypt.hash(req.body?.password, 10);

		user.save()
			.then(() => {
				res.status(201).json({ success: true, message: "User created successfully" });
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				res.status(400).json({ success: false, message: errorMessage });
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

export const signin = async (req: Request, res: Response): Promise<void> => {
	try {
		const email = req.body?.email;
		const password = req.body?.password;
		if (!email || !password) {
			res.status(400).json({ success: false, message: `email or password missing` });
			return;
		}
		await User.findOne({ email: email })
			.then((existUser) => {
				if (existUser) {
					bcrypt.compare(password, existUser.password, (bErr: any, bRes: any) => {
						if (!bErr && bRes) {
							jwt.sign(
								existUser.toJSON(),
								process.env.jwtSecret,
								{ expiresIn: process.env.tokenExp + "s" },
								(jwtErr: any, jwtToken: any) => {
									if (jwtErr) {
										res.status(500).json({ success: false, message: `jwt error -- ${jwtErr}` });
										return;
									}
									res.cookie("token", jwtToken, {
										expires: new Date(Date.now() + (process.env.tokenExp ? parseInt(process.env.tokenExp) : 604800) * 1000), // time until expiration in ms
										secure: false,
										httpOnly: true,
									});
									res.status(200).json({ success: true, token: jwtToken });
								}
							);
						} else {
							res.status(403).json({ success: false, message: "Password does not match" });
						}
					});
				} else {
					res.status(400).json({ success: false, message: `User not found` });
				}
			})
			.catch((err) => {
				res.status(400).json({ success: false, message: `${err}` });
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

const getUserInfo = (req: Request, res: Response): void => {
	try {
		User.findById(req.params.id)
			.then((user) => {
				if (user) {
					res.status(200).json({ success: true, user: user });
				} else {
					res.status(400).json({ success: false, message: `User not found` });
				}
			})
			.catch((err) => {
				res.status(500).json({ success: false, message: `${err}` });
			});
	} catch (error) {
		res.status(500).json({ success: false, message: `server error -- ${error}` });
	}
};

module.exports = {
	register,
	signin,
	getUserInfo,
};