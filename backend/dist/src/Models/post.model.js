"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const postSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User" },
    created_at: { type: Date, required: true, default: Date.now },
    text: { type: String, trim: true, default: "" },
    images: { type: [String], default: [] },
    url: { type: String, required: true, trim: true, unique: true },
    likes: { type: [{ user_id: mongoose_1.default.Schema.Types.ObjectId }], default: [] },
    comments: { type: [{ user_id: mongoose_1.default.Schema.Types.ObjectId, text: String, created_at: Date }], default: [] },
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("Post", postSchema);
