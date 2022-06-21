const authorModel = require("../Models/authorModel")
const BlogModel = require("../Models/blogModel")

const createBlog= async function (req, res) {
    let blog= req.body
    let blogId=blog.authorId
   let a= await authorModel.findById(blogId)
    if(!a)return res.status(400).send({status:false,msg:"author doesn't exist"})
    let savedData= await BlogModel.create(blog)
    res.send({msg: savedData})
   
   
}



module.exports.createBlog= createBlog;