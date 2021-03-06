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
const upload_client_1 = require("@uploadcare/upload-client");
const post_model_1 = require("../Models/post.model");
const user_model_1 = require("../Models/user.model");
const client = new upload_client_1.UploadClient({ publicKey: "73b34fb69e9fb0ddfed7" });
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const post = new post_model_1.Post();
        const author = yield user_model_1.User.findById((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id);
        post.author = author === null || author === void 0 ? void 0 : author.id;
        post.text = ((_c = req.body) === null || _c === void 0 ? void 0 : _c.text) || "";
        const files = req.files;
        const promises = files.map((fileData) => {
            client.updateSettings({ publicKey: "73b34fb69e9fb0ddfed7", fileName: fileData.originalname });
            return client.uploadFile(fileData.buffer).then((file) => file.cdnUrl);
        });
        const files_urls = yield Promise.all(promises);
        post.images = files_urls || [];
        let tmp_url = "";
        if (post.text) {
            tmp_url = post.text
                .toLowerCase()
                .substring(0, 70)
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
        }
        else {
            tmp_url = post._id.toString();
        }
        yield post_model_1.Post.findOne({ url: tmp_url })
            .then((res) => {
            if (res !== null) {
                tmp_url = `${tmp_url}-${post._id.toString()}`;
            }
        })
            .catch((err) => {
            const errorMessage = JSON.parse(JSON.stringify(err.message));
            res.status(400).json({ success: false, message: errorMessage });
            throw new Error(errorMessage);
        });
        post.url = tmp_url;
        post.save()
            .then((saved_post) => __awaiter(void 0, void 0, void 0, function* () {
            const sendPost = yield saved_post.populate({
                path: "author",
                select: "-password",
            });
            res.status(201).json({ success: true, message: "Post created successfully", data: sendPost });
        }))
            .catch((err) => {
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
const getLastestPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts = yield post_model_1.Post.find({})
            .populate({
            path: "author",
            select: "-password",
        })
            .populate({
            path: "comments.user",
            select: "-password",
        })
            .limit(20)
            .sort({ createdAt: -1 })
            .then((allPosts) => {
            return allPosts.map((post) => {
                var _a;
                let tmp_post = JSON.parse(JSON.stringify(post));
                tmp_post["liked_by_user"] = false;
                (_a = post.likes) === null || _a === void 0 ? void 0 : _a.forEach((like) => {
                    var _a, _b;
                    if (like.user_id.toString() === ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                        tmp_post["liked_by_user"] = true;
                        return tmp_post;
                    }
                });
                return tmp_post;
            });
        })
            .catch((err) => {
            const errorMessage = JSON.parse(JSON.stringify(err.message));
            throw new Error(errorMessage);
        });
        res.status(200).json({ success: true, data: posts });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const post_id = (_d = req.body) === null || _d === void 0 ? void 0 : _d.post_id;
        const user_id = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f._id;
        post_model_1.Post.findOne({ _id: post_id })
            .then((post_res) => {
            var _a, _b, _c, _d, _e;
            // { $push: { likes: { user_id: user_id } } }
            if (post_res) {
                let unliked = false;
                (_a = post_res.likes) === null || _a === void 0 ? void 0 : _a.forEach((like) => {
                    if (like.user_id.toString() === user_id.toString()) {
                        unliked = true;
                        return;
                    }
                });
                if (!unliked) {
                    (_b = post_res.likes) === null || _b === void 0 ? void 0 : _b.push({ user_id: user_id });
                    post_res.save();
                    res.status(200).json({ success: true, message: "Post liked successfully!", data: { total_likes: (_c = post_res.likes) === null || _c === void 0 ? void 0 : _c.length } });
                }
                else {
                    post_res.likes = (_d = post_res.likes) === null || _d === void 0 ? void 0 : _d.filter((like) => like.user_id.toString() !== user_id.toString());
                    post_res.save();
                    res.status(200).json({ success: true, message: "Post unliked successfully!", data: { total_likes: (_e = post_res.likes) === null || _e === void 0 ? void 0 : _e.length } });
                }
            }
            else {
                res.status(404).json({ success: false, message: "Post does not exist!" });
            }
        })
            .catch((err) => {
            const errorMessage = JSON.parse(JSON.stringify(err.message));
            throw new Error(errorMessage);
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
const getPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield post_model_1.Post.findOne({ url: req.params.post_slug })
            .populate({
            path: "author",
            select: "-password",
        })
            .populate({
            path: "comments.user",
            select: "-password",
        })
            .then((post) => {
            var _a;
            if (post) {
                let tmp_post = JSON.parse(JSON.stringify(post));
                tmp_post["liked_by_user"] = false;
                (_a = post.likes) === null || _a === void 0 ? void 0 : _a.forEach((like) => {
                    var _a, _b;
                    if (like.user_id.toString() === ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                        tmp_post["liked_by_user"] = true;
                        return tmp_post;
                    }
                });
                res.status(200).json({ success: true, data: tmp_post });
            }
            else {
                res.status(404).json({ success: false, data: "post not found" });
            }
        })
            .catch((err) => {
            const errorMessage = JSON.parse(JSON.stringify(err.message));
            throw new Error(errorMessage);
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k;
    try {
        const post_id = (_g = req.body) === null || _g === void 0 ? void 0 : _g.post_id;
        const user_id = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.user) === null || _j === void 0 ? void 0 : _j._id;
        const comment = (_k = req.body) === null || _k === void 0 ? void 0 : _k.comment;
        post_model_1.Post.findById(post_id)
            .populate({
            path: "comments.user",
            select: "-password",
        })
            .then((post_res) => __awaiter(void 0, void 0, void 0, function* () {
            var _l, _m;
            if (post_res) {
                (_l = post_res.comments) === null || _l === void 0 ? void 0 : _l.push({ user: user_id, text: comment, createdAt: new Date() });
                let postWithComment = yield post_res.populate({
                    path: "comments.user",
                    select: "-password",
                });
                const allComments = (_m = postWithComment.comments) === null || _m === void 0 ? void 0 : _m.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                post_res.comments = allComments;
                post_res.save();
                res.status(200).json({ success: true, message: "comment posted successfully!", data: allComments });
            }
            else {
                res.status(404).json({ success: false, message: "Post does not exist!" });
            }
        }))
            .catch((err) => {
            const errorMessage = JSON.parse(JSON.stringify(err.message));
            throw new Error(errorMessage);
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: `server error -- ${err}` });
    }
});
module.exports = {
    addNewPost,
    getLastestPosts,
    likePost,
    getPostBySlug,
    postComment,
};
