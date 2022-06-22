const authorModel = require("../Models/authorModel")
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


const updateBlog = async function (req, res) {
    try {
        let data = req.body;
        let blogId = req.params.blogId;
        
        const { title, body, tags, subCategory, category} = data;
        if(!title) return res.status(400).send({status:false, msg: "Title should be present"})
        if(!body) return res.status(400).send({status:false, msg: "Body is not present"})
        if(!tags) return res.status(400).send({status:false, msg: "Tags not present"})
        if(!subCategory) return res.status(400).send({status:false, msg: "Subcategory should present"})

        let blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({status: false, msg:"No such blog exists"});
        }
        if (blog.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Blog not found, may be deleted" })
        }
        let updatedblog = await BlogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subCategory: subCategory }, $set: { title: title, body: body, category: category, isPublished:true, publishedAt: Date.now() } }, { new: true });

        res.status(200).send({status: true, msg: "done", data: updatedblog });
    }
     catch (err) {
        res.status(500).send({status: false, msg: "Error", error: err.message })
    }
}
                

module.exports.createBlog= createBlog;
module.exports.updateBlog= updateBlog;