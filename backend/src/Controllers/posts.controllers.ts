import { Request, response, Response } from "express";
import { UploadClient } from "@uploadcare/upload-client";

import { Post, IPost } from "../Models/post.model";
import { User } from "../Models/user.model";
import { MulterFile } from "../../types/multerFile";

interface IPostData extends IPost {
	liked_by_user: boolean;
}

interface RequestFile extends Request {
	files: MulterFile[];
}

const client = new UploadClient({ publicKey: "73b34fb69e9fb0ddfed7" });

const addNewPost = async (req: RequestFile, res: Response): Promise<void> => {
	try {
		const post = new Post();
		const author = await User.findById(req.body?.user?._id);
		post.author = author?.id;

		post.text = req.body?.text || "";

		const files = req.files;

		const promises = files.map((fileData) => {
			client.updateSettings({ publicKey: "73b34fb69e9fb0ddfed7", fileName: fileData.originalname });
			return client.uploadFile(fileData.buffer).then((file) => file.cdnUrl);
		});
		const files_urls: (string | null)[] = await Promise.all(promises);
		post.images = (files_urls as string[]) || [];

		let tmp_url: string = "";
		if (post.text) {
			tmp_url = post.text
				.toLowerCase()
				.substring(0, 70)
				.replace(/ /g, "-")
				.replace(/[^\w-]+/g, "");
		} else {
			tmp_url = post._id.toString();
		}

		await Post.findOne({ url: tmp_url })
			.then((res) => {
				if (res !== null) {
					tmp_url = `${tmp_url}-${post._id.toString()}`;
				}
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				res.status(400).json({ success: false, message: errorMessage });
				throw new Error(errorMessage);
			});

		post.url = tmp_url;

		post.save()
			.then(async (saved_post) => {
				const sendPost = await saved_post.populate({
					path: "author",
					select: "-password",
				});
				res.status(201).json({ success: true, message: "Post created successfully", data: sendPost });
			})
			.catch((err) => {
				if (err.code === 11000) {
					res.status(400).json({ success: false, message: `already exist`, data: err.keyValue });
				} else {
					const errorMessage: string = JSON.parse(JSON.stringify(err.message));
					res.status(400).json({ success: false, message: errorMessage });
				}
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

const getLastestPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		let posts: IPostData[] = await Post.find({})
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
				return allPosts.map((post: IPost) => {
					let tmp_post: IPostData = JSON.parse(JSON.stringify(post));
					tmp_post["liked_by_user"] = false;

					post.likes?.forEach((like) => {
						if (like.user_id.toString() === req.body?.user?._id) {
							tmp_post["liked_by_user"] = true;
							return tmp_post;
						}
					});
					return tmp_post;
				});
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				throw new Error(errorMessage);
			});

		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

const likePost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post_id = req.body?.post_id;
		const user_id = req.body?.user?._id;

		Post.findOne({ _id: post_id })
			.then((post_res) => {
				// { $push: { likes: { user_id: user_id } } }
				if (post_res) {
					let unliked: boolean = false;
					post_res.likes?.forEach((like) => {
						if (like.user_id.toString() === user_id.toString()) {
							unliked = true;
							return;
						}
					});
					if (!unliked) {
						post_res.likes?.push({ user_id: user_id });
						post_res.save();
						res.status(200).json({ success: true, message: "Post liked successfully!", data: { total_likes: post_res.likes?.length } });
					} else {
						post_res.likes = post_res.likes?.filter((like) => like.user_id.toString() !== user_id.toString());
						post_res.save();
						res.status(200).json({ success: true, message: "Post unliked successfully!", data: { total_likes: post_res.likes?.length } });
					}
				} else {
					res.status(404).json({ success: false, message: "Post does not exist!" });
				}
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				throw new Error(errorMessage);
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
	try {
		await Post.findOne({ url: req.params.post_slug })
			.populate({
				path: "author",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.then((post) => {
				if (post) {
					let tmp_post: IPostData = JSON.parse(JSON.stringify(post));
					tmp_post["liked_by_user"] = false;

					post.likes?.forEach((like) => {
						if (like.user_id.toString() === req.body?.user?._id) {
							tmp_post["liked_by_user"] = true;
							return tmp_post;
						}
					});
					res.status(200).json({ success: true, data: tmp_post });
				} else {
					res.status(404).json({ success: false, data: "post not found" });
				}
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				throw new Error(errorMessage);
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

const postComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const post_id = req.body?.post_id;
		const user_id = req.body?.user?._id;
		const comment: string = req.body?.comment;

		Post.findById(post_id)
			.populate({
				path: "comments.user",
				select: "-password",
			})
			.then(async (post_res) => {
				if (post_res) {
					post_res.comments?.push({ user: user_id, text: comment, createdAt: new Date() });
					let postWithComment = await post_res.populate({
						path: "comments.user",
						select: "-password",
					});
					const allComments = postWithComment.comments?.sort((a, b) => {
						return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
					});

					post_res.comments = allComments;
					post_res.save();

					res.status(200).json({ success: true, message: "comment posted successfully!", data: allComments });
				} else {
					res.status(404).json({ success: false, message: "Post does not exist!" });
				}
			})
			.catch((err) => {
				const errorMessage: string = JSON.parse(JSON.stringify(err.message));
				throw new Error(errorMessage);
			});
	} catch (err) {
		res.status(500).json({ success: false, message: `server error -- ${err}` });
	}
};

module.exports = {
	addNewPost,
	getLastestPosts,
	likePost,
	getPostBySlug,
	postComment,
};
