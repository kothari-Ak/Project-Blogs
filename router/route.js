const express = require('express');
const router = express.Router();

const BlogController = require("../Controllers/blogControllers")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/blogs", AuthorController.createBlog)
router.post("/blogs", BlogController.createBlog)
module.exports = router;