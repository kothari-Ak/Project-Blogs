const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    fname:{
    type :String,
    require:true,
    },
    lname:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        enum:["Mr", "Mrs", "Miss"],
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Project_authors", authorSchema);