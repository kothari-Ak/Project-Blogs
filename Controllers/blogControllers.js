const BlogModel = require("../Models/blogModel")

const createBlog= async function (req, res) {
    let blog = req.body
    let blogid = blog.authorId
    console.log(blogid)
    if(!blogid) return res.status(400).send({status:false, msg:"author id is not exist"})
    let blogCreated = await BlogModel.create(blog)
    res.status(201).send({stauts:true, data: blogCreated})
}


module.exports.createBlog= createBlog;