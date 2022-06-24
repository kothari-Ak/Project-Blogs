const jwt = require("jsonwebtoken");
// const { isValidObjectId } = require("mongoose");
const BlogModel = require("../Models/blogModel")
const mongoose = require("mongoose")

let decodedToken
//  Authentication
const Authentication = async function(req,res,next){
    try{
    let token = req.headers["X-api-key"];
    if (!token) token = req.headers["x-api-key"];
    
    //If no token is present in the request header return error
    if (!token) { 
        return res.status(401).send({ status: false, msg: "token must be present" });
    } else {
       jwt.verify(token, 'aishwarya-anugya-anjali-kimmi',function(err,decoded){
       if(err) return res.status(400).send({status: false, msg:"token is not valid"})
    //    const decodedToken = jwt.verify(token,"functionup-radon")
    //    if (!decodedToken) return res.send({status : false , msg:"token is not valid"});
       next()
    })

    }}
     catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
};

module.exports.Authentication = Authentication


// const authorise = function(req, res, next) {
//     try{
//      let token = req.headers["x-Auth-token"];
//      if (!token) token = req.headers["x-auth-token"];
//      const decodedToken = jwt.verify(token,"functionup-radon")
//      let userToBeModified = req.params.userId
    
//      let userLoggedIn = decodedToken.userId
 
 
//      if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
//      if(userToBeModified != userLoggedIn) return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
//      next();
//  }
//  catch(err){
//      console.log("This is the error:", err.message)
//      res.status(500).send({ msg: "Error", error: err.message })
//  }
//  }

// module.exports.Authentication = Authentication 
// module.exports.authorise=authorise

   //    let userLoggedIn = decoded.userId; 
    //    req["userId"] = userLoggedIn; 
    //    console.log(userLoggedIn)
    // const jwt = require("jsonwebtoken");

// let authentication = async function(req, res, next){
//     try{
//         let token = req.headers[`x-api-key`]
//         if(!token) return res.status(400).send({status: false, msg:"Token must be present in Headers"});
//         next();
//     }
//     catch(err){
//         res.status(500).send({status: false, msg: err.message})
//     }
// }

const authorization = async function (req, res, next){
    try{
        let token = req.headers[`x-api-key`];
        let decodedToken = jwt.verify(token, "aishwarya-anugya-anjali-kimmi");
        let headersData = req.headers;
        let authorIdFromHeader = headersData[`authorId`];
        if(!authorIdFromHeader) authorIdFromHeader = headersData[`authorid`];
        let userLoggedIn = decodedToken.userId;
        let userToBeModified = req.body.authorId || req.params.authorId || req.query.authorId || authorIdFromHeader;
        if(userLoggedIn !== userToBeModified) return res.status(403).send({status: false, msg: "You are not authorised to do this"});
        next();
    }
    catch(err){
        res.status(500).send({status: false, msg: err.message});
    }
}

module.exports.authorisation=authorization
