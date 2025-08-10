import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Author name is required"],
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
		},
		twitterHandle: {
			type: String,
			unique: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
