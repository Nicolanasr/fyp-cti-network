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
exports.signin = exports.register = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_model_1 = require("../Models/user.model");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const user = new user_model_1.User();
        user.first_name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.first_name;
        user.last_name = (_b = req.body) === null || _b === void 0 ? void 0 : _b.last_name;
        user.email = (_c = req.body) === null || _c === void 0 ? void 0 : _c.email;
        user.username = (_d = req.body) === null || _d === void 0 ? void 0 : _d.username;
        if (((_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.password) === null || _f === void 0 ? void 0 : _f.length) < 8) {
            res.status(400).json({ success: false, message: "password must be >= 8 characters" });
            return;
        }
        user.password = yield bcrypt.hash((_g = req.body) === null || _g === void 0 ? void 0 : _g.password, 10);
        user.save()
            .then(() => {
            res.status(201).json({ success: true, message: "User created successfully" });
        })
            .catch((err) => {
            console.log(err);
            console.log(err.keyValue);
            if (err.code === 11000) {
                res.status(400).json({ success: false, message: `already exist`, data: err.keyValue });
            }
            else {
                const errorMessage = JSON.parse(JSON.stringify(err.message));
                res.status(400).json({ success: false, message: errorMessage });
            }
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
exports.register = register;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const email = (_h = req.body) === null || _h === void 0 ? void 0 : _h.email;
        const password = (_j = req.body) === null || _j === void 0 ? void 0 : _j.password;
        if (!email || !password) {
            res.status(400).json({ success: false, message: `email or password missing` });
            return;
        }
        yield user_model_1.User.findOne({ email: email })
            .then((existUser) => {
            if (existUser) {
                bcrypt.compare(password, existUser.password, (bErr, bRes) => {
                    if (!bErr && bRes) {
                        jwt.sign(existUser.toJSON(), process.env.jwtSecret, { expiresIn: process.env.tokenExp + "s" }, (jwtErr, jwtToken) => {
                            if (jwtErr) {
                                res.status(500).json({ success: false, message: `jwt error -- ${jwtErr}` });
                                return;
                            }
                            res.cookie("token", jwtToken, {
                                expires: new Date(Date.now() + (process.env.tokenExp ? parseInt(process.env.tokenExp) : 604800) * 1000),
                                secure: true,
                                // httpOnly: true,
                                sameSite: "none",
                                path: "/",
                            });
                            res.status(200).json({ success: true, data: existUser });
                        });
                    }
                    else {
                        res.status(403).json({ success: false, message: "Password does not match" });
                    }
                });
            }
            else {
                res.status(400).json({ success: false, message: `User not found` });
            }
        })
            .catch((err) => {
            res.status(400).json({ success: false, message: `${err}` });
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
exports.signin = signin;
const logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(0), secure: true, httpOnly: true, sameSite: "none", path: "/" });
    res.status(200).json({ success: true, message: "Successfully logged out" });
};
const isTokenValid = (req, res) => {
    res.status(200).json({ success: true, message: "Token Valid", data: req.body.user });
};
const getUserInfo = (req, res) => {
    try {
        user_model_1.User.findById(req.params.id)
            .then((user) => {
            if (user) {
                res.status(200).json({ success: true, user: user });
            }
            else {
                res.status(400).json({ success: false, message: `User not found` });
            }
        })
            .catch((err) => {
            res.status(500).json({ success: false, message: `${err}` });
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: `server error -- ${error}` });
    }
};
module.exports = {
    register: exports.register,
    signin: exports.signin,
    logout,
    getUserInfo,
    isTokenValid,
};
