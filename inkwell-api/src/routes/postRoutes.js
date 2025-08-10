import route from "express";

import {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
} from "../controllers/postController.js";

const router = route.Router();

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;
