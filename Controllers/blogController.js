const authorModel = require("../Models/authorModel")
const BlogModel = require("../Models/blogModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let AuthorId = data.authorId

        let FindId = await authorModel.findById(AuthorId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'Author does not exist' })

        let blogCreated = await BlogModel.create(data)
        res.status(201).send({ status: true, data: blogCreated })
    }
    catch (err) {
        console.log("This is the error:", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

// const getAllBlogs = async function (req, res) {      
//     try {
//       let authorId = req.query.authorId
//       let category = req.query.category
//       let tags = req.query.tags
//       let subcategory = req.query.subcategory
// let getBlogs = await BlogModel.find(
//           { $and: [

//            { $and: [ { isDeleted: false }, { isPublished: true } ] },

//           { $or: [
//                   { authorId: authorId },
//                   { category: { $in: [category] } },
//                   { tags: { $in: [tags] } },
//                   { subcategory: { $in: [subcategory] } } 
//               ]
//               }
//           ]
//           }
//       )
// if (getBlogs.length == 0) return res.status(404).send({ status: true, msg: "No such blog exist" });
//       res.status(200).send({ status: true, data: getBlogs })
  
// } catch (err) {
//   res.status(500).send({msg: err.message})
// }
// }

const getAllBlogs = async function (req, res) {
    try {
      let data = req.query.authorId
      console.log(data)
      let allBlogs = await BlogModel.find(data,
        { isDeleted: false },
        { isPublished: true }
      );

      if (Object.keys(allBlogs).length!==0) {
        return res.status(400).send({status:false ,msg: 'No document present' });
      
      }
      if (Object.keys(allBlogs).length==0) {
        return res.status(404).send({status:false ,msg: 'please enter valid blogs' });
      }
      res.status(200).send(allBlogs);
    } catch (err) {
      res.status(500).send({ msg: 'Error', error: err.message });
    }
  };

const updateBlog = async function (req, res) {
    try {
        let data = req.body;
        let blogId = req.params.blogId;

        const { title, body, tags, subCategory, category } = data;
        if (!title) return res.status(400).send({ status: false, msg: "Title should be present" })
        if (!body) return res.status(400).send({ status: false, msg: "Body is not present" })
        if (!tags) return res.status(400).send({ status: false, msg: "Tags not present" })
        if (!subCategory) return res.status(400).send({ status: false, msg: "Subcategory should present" })

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

        if (await BlogModel.findByIdAndUpdate(blog, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true }));

        res.status(200).send();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }

}

const deleteblogByQuery = async function (req, res) {
    try {
        const query = req.query

        let fetchdata = await BlogModel.find(query)


        if (!fetchdata) {
            return res.status(404).send({ status: false, msg: " Blog document doesn't exist " })
        }

        let deletedtedUser = await BlogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });

        res.status(200).send({ status: true, msg: "done", data: deletedtedUser });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
module.exports.deleteblog = deleteblog;
module.exports.getAllBlogs = getAllBlogs
module.exports.deleteblogByQuery = deleteblogByQuery
module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;