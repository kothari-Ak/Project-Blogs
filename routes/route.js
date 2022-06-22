const express = require('express');
const router = express.Router();
const AuthorController = require("../Controllers/authorController")
const BlogController = require("../Controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/BASE_URL/authors", AuthorController.createAuthor)
router.post("/blogs", BlogController.createBlog)

module.exports = router;