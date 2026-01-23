import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all blog posts (public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message
    });
  }
});

// Get user's own blog posts (protected - must be before /:id route)
router.get("/user/my", protect, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your blogs",
      error: error.message
    });
  }
});

// Get single blog post by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message
    });
  }
});

// Create a blog post (protected)
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id
    });

    const populatedBlog = await Blog.findById(blog._id).populate("author", "username");

    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message
    });
  }
});

// Update blog post (only author)
router.put("/:id", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    const populatedBlog = await Blog.findById(blog._id).populate("author", "username");

    res.status(200).json(populatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog",
      error: error.message
    });
  }
});

// Delete blog post (only author)
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message
    });
  }
});

export default router;

