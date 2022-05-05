"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        let token;
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Token invalid" });
            }
            req.body.user = user;
            next();
        });
    }
    else {
        res.status(401).json({ success: false, message: "malformed header" });
    }
};
exports.verifyToken = verifyToken;
