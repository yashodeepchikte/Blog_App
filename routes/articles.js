const express = require("express");
const router = express.Router();

const Articles = require("../models/articles.model");




router.get("/", (req, res) => {
    res.redirect("/")
})

router.get("/new", (req, res) => {
    res.render("articles/new", {article:new Articles()});
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Articles.findById(id, (err, result) => {
        if (result == null){res.redirect("/")}
        res.render("articles/show", {article:result})   
    })
})

router.post("/", async (req, res) => {
    let article = new Articles({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })

    try{
        await article.save();
        // console.log("articel", article);
        res.redirect(`articles/${article._id}`)
        

    }catch(err){
        // console.log(article);
        res.render("articles/new", {article:article});
    }
    

    
});


router.post("/delete", async (req, res) => {
   const id = req.body.id;
   
   Articles.findOneAndDelete({_id:id}, (err)=>{
    //    Articles.save();
       res.redirect("/")
   })

})



router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    Articles.findById(id, (e, result) =>
    {
        res.render("articles/edit", {article:result})
    })
})

router.post("/edit", async (req, res) => {
    const id = req.body.id;

    var article =  await  Articles.findOne({_id:id})
    article.title=req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.save();
    res.redirect("/")
})


module.exports = router;