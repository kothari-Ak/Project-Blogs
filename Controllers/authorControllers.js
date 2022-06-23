
const authorModel=require('../Models/authorModel')
const validator=require('email-validator');





const createAuthor = async function (req, res) {
  try {
    let data = req.body
    if(!data.fname) return res.status(400).send({status: false, msg: "First name is required"} );
    if(!data.lname) return res.status(400).send({status: false, msg: "Last name is required"} );
    if(!data.title) return res.status(400).send({status: false, msg: "Title is required"} );
    if(!data.email) return res.status(400).send({status: false, msg: "Email is required"} );
    if(!data.password) return res.status(400).send({status: false, msg: "Password is required"} );


    
    console.log(data)
    if ( Object.keys(data).length != 0) {
        let email=data.email
const validEmail = validator.validate(email)
if (validEmail==false){
  return res.status(400).send({status:false, msg:"email is not valid"})
}
    let validemail=await authorModel.find({email:email})
    if(validemail.length==0){
        let savedData= await authorModel.create(data)
        res.status(201).send({msg: savedData})   
    }
  else {res.status(400).send({msg:"email is already in use"})}

}
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch(err){
  console.log("This is the error:", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}

};



module.exports.createAuthor = createAuthor

