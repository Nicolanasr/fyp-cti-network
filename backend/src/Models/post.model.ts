import mongoose, { Schema, model } from "mongoose";

import { IUser } from "./user.model";

interface Author extends IUser {
	_id: mongoose.Schema.Types.ObjectId;
}

export interface IPost {
	author?: mongoose.Schema.Types.ObjectId;
	created_at?: Date;
	text?: string;
	images?: string[];
	url?: string;
	likes?: { user_id: mongoose.Schema.Types.ObjectId }[];
	comments?: { user: mongoose.Schema.Types.ObjectId; text: String; createdAt: Date }[];
}

const postSchema = new Schema<IPost>(
	{
		author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		created_at: { type: Date, required: true, default: Date.now },
		text: { type: String, trim: true, default: "" },
		images: { type: [String], default: [] },
		url: { type: String, required: true, trim: true, unique: true },
		likes: { type: [{ user_id: mongoose.Schema.Types.ObjectId }], default: [] },
		comments: {
			type: [
				{
					user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
					text: String,
					createdAt: { type: Date, default: Date.now, required: false },
				},
				{ timestamps: true },
			],
			default: [],
		},
	},
	{ timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
