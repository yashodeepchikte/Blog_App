const mongoose = require("mongoose");
const slugify =  require("slugify");

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

    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})

// theis function will run every time before validation
articelSchema.pre('validate', async function (next, data){
  // console.log("inside validation")
  // console.log(data);
  // console.log(next);
  // console.log(this);
  // console.log("---");
  if (this.title){

    // console.log(this.title)
    this.slug = await slugify(this.title, {});
    // console.log("slug success", this.slug);
  }
  else{
  console.log("slugify didnt work");
}
  next()
})
const Article = mongoose.model("article", articelSchema)

module.exports = Article
