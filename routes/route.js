const express = require('express');
const router = express.Router();
const AuthorController = require("../Controllers/authorControllers")
const BlogController = require("../Controllers/blogController")
const commnMid = require("../Middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", AuthorController.createAuthor)
router.post("/blogs", BlogController.createBlog)
router.get('/blogs', BlogController.getAllBlogs)
router.put("/blogs/:blogId", BlogController.updateBlog)
router.delete("/blogs/:blogId", BlogController.deleteblog)
router.delete("/blogs", BlogController.deleteblogByQuery)


module.exports = router;