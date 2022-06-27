const jwt = require("jsonwebtoken");


 //==================== [Authentication Middleware]===============================

const Authentication = function (req, res, next) {
    try {
    token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present " })
  
    jwt.verify(token, "aishwarya-anugya-anjali-kimmi",function(err,data){
        if(err) return res.status(401).send({status:false, msg:"token is not valid"})
    
    else {req.authordata=data}
    // console.log(data) 
    next()
    })
    } catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
module.exports.Authentication = Authentication

//=================[Authorisation Middleware]============================

const Authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, msg: "token must be present " })
        let decodedToken = jwt.verify(token, "aishwarya-anugya-anjali-kimmi")
        
        let authorToBeModified = req.query.authorId
      
        let authorLogin = decodedToken.authorId
    
        if ( authorToBeModified != authorLogin)
            return res.status(403).send({ status: false, msg: 'You are not authorized.' })
        next()
    }
     
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
};
module.exports.Authorisation = Authorisation ;
