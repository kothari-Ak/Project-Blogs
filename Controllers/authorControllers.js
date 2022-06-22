const AuthorModel=require('../Models/authorModel')



const createAuthor= async function (req, res) {
    try{
    let data= req.body
    console.log(data)
    let {fname, lname, title, email, password}= data
    if(!fname) {return res.stauts(400).send({status:false, msg: "fname must be present"})}
    if ( Object.keys(data).length != 0) {
    let savedData= await AuthorModel.create(data)
    res.status(201).send({msg: savedData})
}
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch(err){
  console.log("This is the error:", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}
};



module.exports.createAuthor = createAuthor

