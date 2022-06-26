const express = require('express');
const router = express.Router();
const AuthorController = require("../Controllers/authorControllers")
const BlogController = require("../Controllers/blogController")
const commnMid = require("../Middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!") 
})
<<<<<<< HEAD

router.post("/authors", AuthorController.createAuthor)
router.post("/blogs", commnMid.Authentication, BlogController.createBlog)
router.get('/blogs', commnMid.Authentication, BlogController.getAllBlogs)
router.put("/blogs/:blogId", commnMid.Authentication, commnMid.Authorisation, BlogController.updateBlog)
router.delete("/blogs/:blogId", commnMid.Authentication, commnMid.Authorisation, BlogController.deleteblog)
router.delete("/blogs", commnMid.Authentication, commnMid.Authorisation, BlogController.deleteblogByQuery)

router.post("/login", AuthorController.loginAuthor)
module.exports = router;
=======
 
router.post("/authors", AuthorController.createAuthor)  

router.post("/login",AuthorController.loginAuthor) 

router.post("/blogs",commnMid.Authentication,BlogController.createBlog)

router.get('/blogs',commnMid.Authentication,BlogController.getAllBlogs)

router.put("/blogs/:blogId",commnMid.Authentication,commnMid.Authorisation, BlogController.updateBlog)

router.delete("/blogs/:blogId",commnMid.Authentication,commnMid.Authorisation, BlogController.deleteblog)

router.delete("/blogs",commnMid.Authentication,commnMid.Authorisation,BlogController.deleteblogByQuery)  


module.exports = router; 
>>>>>>> a22403ba2f88fac2f305b939501a87b9a1235b91
