import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authorRoutes from "./src/routes/authorRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Mounting the author route
app.use("/api/authors", authorRoutes);
app.use("/api/posts", postRoutes);

// Define a simple route
app.get("/", (req, res) => {
	res.send("Welcome to the Inkwell API!");
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
	console.log(
		`Server is now running in ${
			process.env.NODE_ENV || "development"
		} mode on ${PORT}`
	);
});
