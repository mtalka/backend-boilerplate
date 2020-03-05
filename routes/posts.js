const express = require("express");
const router = express.Router();

const Post = require("../models/post");

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single post
router.get("/:id", getPost, (req, res) => {
    res.send(res.post);
});

// Create post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        city: req.body.city,
        line: req.body.line
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Update post
router.patch("/:id", getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    if (req.body.text != null) {
        res.post.text = req.body.text;
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Delete post
router.delete("/:id", getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: "Post deleted" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Find an entry by Id middleware
async function getPost(req, res, next) {
    let post;

    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: "Cannot find post" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.post = post;
    next();
}

module.exports = router;
