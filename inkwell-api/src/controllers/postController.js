import Post from "../models/postModel.js";
import Author from "../models/authorModel.js";

// @desc Create a new post
// @route POST /api/posts
export const createPost = async (req, res) => {
	try {
		const { title, content, authorId, tags } = req.body;

		// validate the submission
		if (!title || !content || !authorId) {
			return res
				.status(400)
				.json({ message: "title, content, and author are required" });
		}

		// Validate author exists
		const existingAuthor = await Author.findById(authorId);

		if (!existingAuthor) {
			return res.status(404).json({ message: "Author not found" });
		}

		const post = await Post.create({
			title,
			content,
			author: authorId,
			tags,
		});

		res.status(201).json({
			message: "Post created successfully",
			post,
		});
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// @desc Get all posts
// @route Get /api/posts
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find({}).populate("author", "name bio");

		res.status(200).json({ message: "All posts", posts });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

// @desc Get post by Id
export const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate(
			"author",
			"name twitterHandle"
		);

		if (!post) {
			return res.status(400).json({ message: "Post does not exist" });
		}

		res.status(200).json({ message: "Post by Id", post });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

// @desc PUT update post by Id
export const updatePost = async (req, res) => {
	try {
		const { author, ...updateData } = req.body;
		const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!post) {
			return res.status(400).json({ message: "Post not found" });
		}
		res.status(200).json({ message: "Post updated", post });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

// @desc DELETE post by Id
export const deletePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).json({ message: "Post deleted", post });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};
