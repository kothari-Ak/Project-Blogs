const mongoose = require ("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        reuire:true
    },
    body:{
        type:String,
        require:true
    },
    authorId:{
        type:ObjectId,
        ref:"Project_authors",
        require:true
    },
    tags:{
        type:[String]
    },
    category:{
        type:String,
        require:true
    },
    subCategory:{
        type:[String]
    }, 
    isDeleted:{
        type:Boolean,
        default:false
    },
    isPublished:{ 
        type:Boolean,
        default:false
    },

}, { timestamps: true});
module.exports = mongoose.model('Project_Blogs', blogSchema)