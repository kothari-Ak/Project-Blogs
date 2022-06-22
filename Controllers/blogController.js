const authorModel = require("../Models/authorModel")
const BlogModel = require("../Models/blogModel")

const createBlog= async function (req, res) {

    let data = req.body
    let AuthorId = data.authorId

    let FindId = await authorModel.findById(AuthorId)
    if(!FindId) return res.status(400).send({status:false,msg: 'Author does not exist'})

    let blogCreated = await BlogModel.create(data)
    res.status(201).send({status: true,data: blogCreated})
}

module.exports.createBlog= createBlog;