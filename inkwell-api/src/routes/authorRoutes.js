import route from "express";

import {
	createAuthor,
	getAllAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
} from "../controllers/authorController.js";

const router = route.Router();

// Grouping routes by same path
router.route("/").post(createAuthor).get(getAllAuthors);

router.route("/:id").get(getAuthorById).put(updateAuthor).delete(deleteAuthor);

export default router;
