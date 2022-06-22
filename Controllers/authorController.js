const AuthorModel=require('../Models/authorModel')



const createAuthor= async function (req, res) {
    try{
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.status(201).send({msg: savedData})
    }
    catch(err){
        console.log(err)
        res.status(500).send({msg:err.message})
    }
}


module.exports.createAuthor = createAuthor
