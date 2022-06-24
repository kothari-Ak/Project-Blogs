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

// const mid3 = async function (req, res, next) {
//     let token = req.headers["x-api-key"];
//     if (!token) token = req.headers["x-api-key"];

//     let decodedToken = jwt.verify(token, 'aishwarya-anugya-anjali-kimmi')

//     if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })
//     data = req.query
//     if (Object.keys(data).length == 0){
//         return res.status(400).send({status:false, msg:"Body should not be Empty.. "})
//       }

//     let authorid = req.query.authorId;
//     let Category = req.query.category;
//     let Subcategory = req.query.subcategory;
//     let tag = req.query.tags;
//     let unpublished = req.query.isPublished
//     let blogData = await BlogModel.findOne({$or:[{authorId:authorid},{isPublished:unpublished},{category:Category},{tags:tag},{subcategory:Subcategory}]})
//     let authId = blogData.authorId
//     console.log(authId,"hello")
//     let userLoggedIn = decodedToken.authorId
//     console.log(userLoggedIn,"hii")
//     if (authId == userLoggedIn) { 
//         let del=blogData.isDeleted
//         console.log(del)
//     if(del){
//         return res.status(400).send({status:false,msg:"data is already deleted"})
//     }
//     next()
//     } else { return res.status(200).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })}
   
    
// }

// module.exports.mid3 = mid3;
















//     let Authorisation = async function (req, res, next) {
//         try {
//         //     if (!req.query.authorId){
//         //         return res.status(400).send({status:false, msg:"AuthorId should be present. "})
//         //       }  
//           let token = req.headers["x-api-key"];
//          let  authordata = jwt.verify(token, "aishwarya-anugya-anjali-kimmi");  
         
//            let loggedUser= authordata.authorId
//            if(!mongoose.isValidObjectId(req.params.blogId))
//            return res.status(400).send({status:false, msg:"please enter valid blogId"})

//            let blogData = await BlogModel.findById(req.params.blogId)
//            console.log(blogData)
//            if(!blogData) return res.status(404).send({status:false, msg:"please check id"})

//           authorLogin = blogData.authorId.toString()

      
//           if (loggedUser != authorLogin) {
//             return res.status(403).send({ status: false, msg: "AuthorId and BlogId are not matched" });
//           }  //authorisation
      
//           next();
//         } catch (err) {
//           return res.status(500).send({ status: false, err: err.message });
//         }
//       };
      
//       module.exports.Authorisation =  Authorisation ;


// let authrAuth = async function (req, res, next) {
//     try {
//       let token = req.headers["x-api-key"];
//       let authordata = jwt.verify(token, "aishwarya-anugya-anjali-kimmi");
  
//       console.log(authordata);
//       if (!authordata) {
//         return res.status(404).send({ status: true, msg: "token is not valid" });
//       }
      
//       let blogId = req.params.blogId;
//       let requestedAuthorId = req.query.authorId;
  
//       if (blogId) {
//         let validBlog = await BlogModel.findById(blogId);
//         requestedAuthorId = validBlog.authorId;     
//       }
  
//       console.log(requestedAuthorId);
  
//       if (authordata.authorId != requestedAuthorId) {
//         return res.status(403).send({ status: false, msg: "Not Valid Author" });
//       }  //authorisation
  
//       next();
//     } catch (err) {
//       return res.status(500).send({ status: false, err: err.message });
//     }
//   };
  
//   module.exports.authrAuth = authrAuth ;

// ===================================================================
// // Here checked that token is present in header or not
// const authentication = function (req, res, next) {

//     if (!(req.headers["x-api-key"])) {
//         return res.status(401).send({ status: false, msg: "token must be present" })
//     }
 
//     next()

// };
// module.exports.authentication = authentication ;
// // Here checked that which token is present in header, it's valid or not 
// const isVerifyToken = function (req, res, next) {
//     let token = req.headers["x-api-key"];
//       let authordata = jwt.verify(token, "aishwarya-anugya-anjali-kimmi");
  
//       console.log(authordata);
//       if (!authordata) {
//         return res.status(404).send({ status: true, msg: "token is not valid" });
// //       }
// // ------------------
//     // let token = req.headers["x-api-key"]
//     // try {
//     //     let decodedToken = jwt.verify(token, "aishwarya-anugya-anjali-kimmi");
//     //     if (!decodedToken) {
//     //         res.status(401).send({ status: false, msg: "token is invalid" });
//     //     }
//          next()
//     } catch (err) {
//         res.status(401).send({ status: false, msg: "token is invalid" });
//     }
// };
// module.exports.isVerifyToken = isVerifyToken ;

