const mongoose = require("mongoose");

const articelSchema = new mongoose.Schema({
    title:{type:String,
            required:true,
            default: () => ""
        },
    description:{
        type:String,
        required:true,
        default: () => ""
    },
    markdown: {
        type:String,
        required:true,
        default: () => ""
    },
    createdAt:{
        type:Date,
        default : Date.now

    }  
})

const Article = mongoose.model("article", articelSchema)

module.exports = Article