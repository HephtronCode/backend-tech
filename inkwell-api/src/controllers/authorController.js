import Author from "../models/authorModel.js";

// @desc Create a new author
// @route POST /api/authors
// @access Public
export const createAuthor = async (req, res) => {
	try {
		const { name, bio, twitterHandle } = req.body;

		// Validate required fields
		if (!name) {
			return res.status(400).json({ message: "Author name is required" });
		}

		const author = await Author.create({
			name,
			bio,
			twitterHandle,
		});

		res.status(201).json({
			message: "Author created successfully",
			author,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Creating Error", error: error.message });
	}
};

// @desc Get all authors
// @route GET /api/authors
// @access Public
export const getAllAuthors = async (req, res) => {
	try {
		const allAuthors = await Author.find({});

		res.status(200).json(allAuthors);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
		console.log("Unable to fetch all authors");
	}
};

// @desc Get a single author by Id
// @route Get /api/authors/:id
// @access public
export const getAuthorById = async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);

		if (author) {
			res.status(200).json(author);
		} else {
			res.status(404).json({ message: "Author not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

// @desc Update an Author by Id
// @route PUT /api/authors/:id
// @access Public
export const updateAuthor = async (req, res) => {
	try {
		const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!author) return res.status(404).json({ message: "Author not found" });

		res.status(200).json({
			message: "Author updated successfully",
			author,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Updating Error", error: error.message });
	}
};

// @desc Delete an Author by Id
// @route DELETE /api/authors/:id
// @access Public
export const deleteAuthor = async (req, res) => {
	try {
		const author = await Author.findByIdAndDelete(req.params.id);

		if (!author) return res.status(404).json({ message: "Author not found" });

		res.status(200).json({ message: "Author successfully deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error " });
	}
};
