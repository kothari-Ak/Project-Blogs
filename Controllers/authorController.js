const AuthorModel=require('../Models/authorModel')



const creatAuthor= async function (req, res) {
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}


module.exports.creatAuthor = creatAuthor


