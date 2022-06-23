const jwt = require("jsonwebtoken")

let decodedToken
//  Authentication
const Authentication = async function(req,res,next){
    try{
    let token = req.headers["X-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    
    //If no token is present in the request header return error
    if (!token) { 
        return res.status(401).send({ status: false, msg: "token must be present" });
    } else {
       jwt.verify(token, 'aishwarya-anugya-anjali-kimmi',function(err,decoded){
       if(err) return res.status(400).send({status: false, msg:"token is not valid"})

       next()
    })
    }
}catch(err){
    res.status(500).send({ msg: "Error", error: err.message })
}
}  

module.exports.Authentication = Authentication 


   //    let userLoggedIn = decoded.userId; 
    //    req["userId"] = userLoggedIn; 
    //    console.log(userLoggedIn)