const authorModel = require("../Models/authorModel")
// const blogModel = require("../Models/blogModel")
const BlogModel = require("../Models/blogModel")

const createBlog= async function (req, res) {
 try{
    let data = req.body
    let AuthorId = data.authorId

    let FindId = await authorModel.findById(AuthorId)
    if(!FindId) return res.status(400).send({status:false,msg: 'Author does not exist'})
 
    let blogCreated = await BlogModel.create(data)
    res.status(201).send({status: true,data: blogCreated})
}
catch(err){
    console.log("This is the error:", err.message)
  res.status(500).send({ msg: "Error", error: err.message })

}
}

const getBlogs = async function(res,req){
  try{

    let blogs = await BlogModel.find({isDeleted:false, isPublished:true})

    if(blogs.length === 0){
      return res.status(404).send({status:false, msg:"No data found."})
    }else{
      return res.status(200).send({status:true, data:blogs})
    }
  } catch(err){
    res.status(500).send({msg: err.message})
  }
}

module.exports.getBlogs = getBlogs












module.exports.createBlog= createBlog;
