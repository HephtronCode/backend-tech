import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Post title is required"],
			trim: true,
		},
		content: {
			type: String,
			required: [true, "Post content can not be empty"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "Author",
			required: [true, "Post must have an author"],
		},
		tags: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
