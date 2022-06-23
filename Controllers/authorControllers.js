const authorModel = require('../Models/authorModel')
const validator = require('email-validator');
const jwt = require("jsonwebtoken");


const createAuthor = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length != 0) { 

    if (!data.fname) return res.status(400).send({ status: false, msg: "First name is required" });
    if (!data.lname) return res.status(400).send({ status: false, msg: "Last name is required" });
    if (!data.title) return res.status(400).send({ status: false, msg: "Title is required" });
    if (!data.email) return res.status(400).send({ status: false, msg: "Email is required" });
   
      let email = data.email
      const validEmail = validator.validate(email)
      if (validEmail == false) {
        return res.status(400).send({ status: false, msg: "email is not valid" })
      }
      let validemail = await authorModel.find({ email: email })
      if (validemail.length == 0) {
        let savedData = await authorModel.create(data)
        res.status(201).send({ msg: savedData })
      }
      else { res.status(400).send({ msg: "email is already in use" }) }

    }
    if (!data.password) return res.status(400).send({ status: false, msg: "Password is required" });

    else res.status(400).send({ msg: "BAD REQUEST" })  
  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
};

module.exports.createAuthor = createAuthor


const loginAuthor = async function (req, res) {
  try {
    let emailId = req.body.email;
    let password = req.body.password;

    let author = await authorModel.findOne({ email: emailId, password: password });
    if (!author)
      return res.status(400).send({
        status: false, msg: "email or the password is not correct",
      });

    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "radon",
        organisation: "FunctionUp",
      },
      "aishwarya-anugya-anjali-kimmi" 
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, token: token });

  }
  catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

module.exports.loginAuthor = loginAuthor
