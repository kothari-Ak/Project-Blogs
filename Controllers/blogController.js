const BlogModel = require("../Models/blogModel")

const createBlog= async function (req, res) {

    let data = req.body
    let AuthorId = data.authorId
    console.log(AuthorId)
    if(!AuthorId) return res.status(404).send({status:false,msg: 'Author does not exist'})

    let blogCreated = await BlogModel.create(data)
    res.status(201).send({status: true,data: blogCreated})
}

module.exports.createBlog= createBlog;