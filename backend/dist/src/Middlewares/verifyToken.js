"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const user_model_1 = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        let token;
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwtSecret, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ success: false, message: "Token invalid" });
            }
            const user_data = yield user_model_1.User.findById(user._id).select("-password");
            if (!user_data) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            console.log(user_data);
            req.body.user = JSON.parse(JSON.stringify(user_data));
            next();
        }));
    }
    else {
        res.status(401).json({ success: false, message: "malformed header" });
    }
};
exports.verifyToken = verifyToken;
