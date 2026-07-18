const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// Save a new post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);

    await newPost.save();

    res.status(201).json({
      message: "Post saved successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
