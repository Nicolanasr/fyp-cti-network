import mongoose, { Schema, model } from "mongoose";

import { IUser } from "./user.model";

interface Author extends IUser {
	_id: mongoose.Schema.Types.ObjectId;
}

export interface IPost {
	author?: Author;
	created_at?: Date;
	text?: string;
	images?: string[];
	url?: string;
	likes?: { user_id: mongoose.Schema.Types.ObjectId }[];
	comments?: { user_id: mongoose.Schema.Types.ObjectId; text: String; created_at: Date }[];
}

const postSchema = new Schema<IPost>({
	author: { type: {}, required: "Author is required" },
	created_at: { type: Date, required: true, default: Date.now },
	text: { type: String, trim: true, default: "" },
	images: { type: [String], default: [] },
	url: { type: String, required: true, trim: true, unique: true },
	likes: { type: [{ user_id: mongoose.Schema.Types.ObjectId }], default: [] },
	comments: { type: [{ user_id: mongoose.Schema.Types.ObjectId, text: String, created_at: Date }], default: [] },
});

export const Post = model<IPost>("Post", postSchema);