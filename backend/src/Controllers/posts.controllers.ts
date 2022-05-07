import { Request, response, Response } from "express";

import { Post, IPost } from "../Models/post.model";

interface IPostData extends IPost {
	liked_by_user: boolean;
}

const addNewPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = new Post();
		// post.author_id = req.body?.user?._id;
		post.author = {
			_id: req.body?.user?._id,
			avatar: req.body?.user?.avatar || "",
			first_name: req.body?.user?.first_name,
			last_name: req.body?.user?.last_name,
			username: req.body?.user?.username,
		};
		post.text = req.body?.text || "";
		post.images = req.body?.images || [];

		let tmp_url: string;
		if (post.text) {
			tmp_url = post.text
				.toLowerCase()
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
			.then(() => {
				res.status(201).json({ success: true, message: "Post created successfully", data: post });
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
			.sort({ created_at: -1 })
			.limit(20)
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

module.exports = {
	addNewPost,
	getLastestPosts,
	likePost,
};
