const authorModel = require("../Models/authorModel")
const BlogModel = require("../Models/blogModel")

// ========================[CreateBlog]==================================
const isValid = function (value) {
    // if( typeof value === 'undefined' || value === null ) {
    //   // console.log("1")
    //     return false
    // }
    if( typeof value == 'string' && value.trim().length == 0 ) {
      console.log("2")
        return false
    }
    if ( typeof value == 'string' && value.length !== value.trim().length ) {
      // console.log("4")
        return false
    }
    if ( typeof value == 'number' ) {
      // console.log("5")
        return false
    }
    return true
  }
  
const createBlog = async function (req, res) {
    try {
        let data = req.body
        
        const { title, body, authorId,tags, category,subCategory  } = data;
        let inValid = ' '
        if ( !isValid ( title ) ) inValid = inValid + "title "
        if ( !isValid ( body ) ) inValid = inValid + 'body '
        if ( !isValid ( authorId ) ) inValid = inValid + "authorId "
        if ( !isValid ( tags ) ) inValid = inValid + "tags "
        if ( !isValid ( category ) ) inValid = inValid + "category "
        if ( !isValid ( subCategory ) ) inValid = inValid + "subCategory "
        if ( !isValid(title) || !isValid(body) ||!isValid(authorId) || !isValid(tags) || !isValid(category) || !isValid(subCategory) ) {
            return res.status(400).send({ status: false, msg: `Enter valid details in following field(s): ${inValid}` })
        }
   
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should  be not Empty.. " })
        }
        let AuthorId = data.authorId
        let FindId = await authorModel.findById(AuthorId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'AuthorId does not exist' })

        let blogCreated = await BlogModel.create(data)
        res.status(201).send({ status: true, data: blogCreated })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}
// ========================[getAllBlogs]==================================

const getAllBlogs = async function (req, res) {
    try {
        let q = req.query;
        let filter = {
            ...q,
            isDeleted: false,
            isPublished: true,
        };

        const data = await BlogModel.find(filter);
        // console.log(data)
        if (data.length == 0) return res.status(404).send({ status: false, msg: "No blog is found" });

        res.status(200).send({ status: true, data: data })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};
// ========================[updateBlog]==================================

const updateBlog = async function (req, res) {
    try {
        let data = req.body;
        let blogId = req.params.blogId;
        // let authorToBeModified = req.query.authorId
        const { title, body, tags, subCategory, category } = data;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }

        let blog = await BlogModel.findOne({_id : blogId, authorId:req.query.authorId});
        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        if (blog.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Blog already deleted" })
        }
        let updatedblog = await BlogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subCategory: subCategory }, $set: { title: title, body: body, category: category, isPublished: true, publishedAt: Date.now() } }, { new: true });

        res.status(200).send({ status: true, msg: "done", data: updatedblog });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
// ========================[deleteblog]==================================

const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;

        let blog = await BlogModel.findOne({_id : blogId, authorId : req.query.authorId});
        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        if (blog.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Already Deleted " })
        }

        if (await BlogModel.findByIdAndUpdate({_id : blogId}, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true }));

        res.status(200).send();
    }

    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
// ========================[deleteblogByQuery]==================================

const deleteblogByQuery = async function (req, res) {
    try {
        const data = req.query;
        
        const { authorId, category, subCategory, tags } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }

        if (category) {
            let verifyCategory = await BlogModel.findOne({ category: category })
            if (!verifyCategory) return res.status(400).send({ status: false, msg: 'No blogs in this category exist' });
        }
        
        if (tags) {
            let verifytags = await BlogModel.findOne({ tags: tags })
            if (!verifytags) return res.status(400).send({ status: false, msg: 'No blog with this tags exist' });
        }
        
        if (subCategory) {
            let verifysubcategory = await BlogModel.findOne({ subCategory: subCategory })
            if (!verifysubcategory) return res.status(400).send({ status: false, msg: 'No blog with this subcategory exist' });
        }
        
        if (authorId) {
            let verifyauthorId = await BlogModel.findOne({ authorId: authorId })
            if (!verifyauthorId) return res.status(400).send({ status: false, msg: 'No blog with this authorId exist' });
        }
        
        data.isDeleted = false
        data.isPublished = false
        let blogs = await BlogModel.find(data)
        if(blogs.length === 0) return res.status(400).send({status:false, msg:"Either already deleted or no blog found as per the provided data"})

        const deleteByQuery = await BlogModel.updateMany(data, { isDeleted: true, deletedAt: new Date() }, { new: true });
            return res.status(200).send({status:true, msg:"Your blogs have been deleted",data:deleteByQuery})
        
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}

module.exports.createBlog = createBlog;
module.exports.getAllBlogs = getAllBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteblog = deleteblog;
module.exports.deleteblogByQuery = deleteblogByQuery;