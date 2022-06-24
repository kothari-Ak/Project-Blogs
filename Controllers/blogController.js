const mongoose = require('mongoose')
const authorModel = require("../Models/authorModel")
const BlogModel = require("../Models/blogModel")


const createBlog= async function (req, res) {
 try{
    let data = req.body
    console.log(data)
    // console.log(Object.keys(data))
    const { title, body, tags, subCategory, category} = data;
    if(!title) return res.status(400).send({status:false, msg: "Title should be present"})
    if(!body) return res.status(400).send({status:false, msg: "Body is not present"})
    if(!tags) return res.status(400).send({status:false, msg: "Tags not present"})
    if(!subCategory) return res.status(400).send({status:false, msg: "Subcategory should present"})
    if(!category) return res.status(400).send({status:false, msg: "Category should present"})

    if (Object.keys(data).length == 0){
      return res.status(400).send({status:false, msg:"Body should  be not Empty.. "})
    }
    let AuthorId = data.authorId
    let FindId = await authorModel.findById(AuthorId)
    if(!FindId) return res.status(400).send({status:false,msg: 'Author does not exist'})
 
    let blogCreated = await BlogModel.create(data)
    res.status(201).send({status: true,data: blogCreated})
}
catch(err){
  res.status(500).send({ msg: "Error", error: err.message })
}
}

const getAllBlogs = async function (req, res) {
  try{
    let q = req.query;
    let filter = {
        ...q,
        isDeleted: false,
        isPublished: true,
        
    };

    const data = await BlogModel.find(filter);
    if(data.length == 0) return res.status(404).send({status:false, msg: "No blog is found"});

    res.status(200).send({status: true, data: data})
}catch(err){
    res.status(500).send({status: false, msg: err.message});
}
};


const updateBlog = async function (req, res) {
  try {
      let data = req.body;
      let blogId = req.params.blogId;
    
      const { title, body, tags, subCategory, category} = data;
      if (Object.keys(data).length == 0){
        return res.status(400).send({status:false, msg:"Body should not be Empty.. "})
      }

        if (!title) return res.status(400).send({ status: false, msg: "Title should be present" })
        if (!body) return res.status(400).send({ status: false, msg: "Body is not present" })
        if (!tags) return res.status(400).send({ status: false, msg: "Tags not present" })
        if (!subCategory) return res.status(400).send({ status: false, msg: "Subcategory should present" })
        if (!isValidObjectId(blogId)) { return res.status(400).send({ msg: 'blogId is not valid' }) }
        let blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        if (blog.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Blog not found, may be deleted" })
        }
        let updatedblog = await BlogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subCategory: subCategory }, $set: { title: title, body: body, category: category, isPublished: true, publishedAt: Date.now() } }, { new: true });

        res.status(200).send({ status: true, msg: "done", data: updatedblog });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}

const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        if (blog.isDeleted == true) {
          return res.status(400).send({ status: false, msg: "Already Deleted " })
      }

        if(await BlogModel.findByIdAndUpdate(blog, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true }));
    
            res.status(200).send();
        }

    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}



const deleteblogByQuery = async function (req, res) {
            try {
          const data = req.query;
          data.isDeleted = false
      
          const { authorId, category, subCategory, tags } = data
          
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
              if (!verifysubcategory) return res.status(400).send({ status: false, msg: 'No blog with this subcategory exist'});
          }
          
          if (authorId) {
            let verifysubcategory = await BlogModel.findOne({ authorId: authorId })
            if (!verifysubcategory) return res.status(400).send({ status: false, msg: 'no blog with this authorId exist' });
        }


        const deleteByQuery = await BlogModel.updateMany(data, { isDeleted: true, deletedAt: new Date() }, { new: true });

        if (!deleteByQuery) {
            return res.status(404).send({ status: false, msg: "Not data found", })

        }
        res.status(200).send({ status: true, msg: "deleted by query" })
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

