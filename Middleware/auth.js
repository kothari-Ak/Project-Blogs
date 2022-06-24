const jwt = require("jsonwebtoken");
// const { isValidObjectId } = require("mongoose");
const BlogModel = require("../Models/blogModel")
const mongoose = require("mongoose")

 //  Authentication
 
const Authentication = function (req, res, next) {
    try {
    token = req.headers["x-api-key"];
  
    jwt.verify(token, "aishwarya-anugya-anjali-kimmi",function(err,data){
        if(err) return res.status(400).send({status:false, msg:err.message})
    
    else {req.authordata=data}
    console.log(data)
    next()
    })

    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
};
module.exports.Authentication = Authentication

// This is a Authorisation Middleware
const Authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "token must be present " })
        let decodedToken = jwt.verify(token, "aishwarya-anugya-anjali-kimmi")
        
        let authorToBeModified = req.params.blogId
       
        let blogData = await BlogModel.findById(authorToBeModified)
       
        if(!blogData) return res.status(401).send({ status: false, msg: "Invalid Blog Id" })
      
        let authorLogin = decodedToken.authorId
    
        // convert objectId to String
       let authorId = blogData.authorId.toString()
        if ( authorId!= authorLogin)
            return res.status(403).send({ status: false, msg: 'AuthorId and BlogId are not matched' })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }

    next()
};
module.exports.Authorisation = Authorisation ;