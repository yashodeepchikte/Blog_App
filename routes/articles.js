const express = require("express");
const router = express.Router();

const Articles = require("../models/articles.model");




router.get("/", (req, res) => {
    res.redirect("/")
})

router.get("/new", (req, res) => {
    res.render("articles/new", {article:new Articles()});
})

router.get("/:slug", (req, res) => {
    const slug = req.params.slug;
    // console.log("sslug: " , slug)
    Articles.findOne({slug:slug}, (err, result) => {
        if (result == null){res.redirect("/")}
        // console.log("result --> " , result)
        res.render("articles/show", {article:result})
    })
})

router.post("/", async (req, res) => {
    let article = new Articles({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    // console.log("req was", req.body);

    try{
        await article.save();

        // console.log("articel", article);
        res.redirect(`articles/${article.slug}`)


    }catch(err){
        // console.log(article);
        res.render("articles/new", {article:article});
    }



});


router.get("/delete/:slug", async (req, res) => {
   const slug = req.params.slug;
   console.log(slug, "Deleted")


   Articles.findOneAndDelete({slug:slug}, (err)=>{
    //    Articles.save();
       res.redirect("/")
   })

})



router.get("/edit/:slug", (req, res) => {
    const slug = req.params.slug;
    // console.log("slug:", slug)
    Articles.findOne({slug:slug}, (e, result) =>
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
    // article.createdAt = Date.now();
    await article.save();
    res.redirect("/")
})


module.exports = router;
