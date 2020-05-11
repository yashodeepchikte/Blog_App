const express = require("express")
const router = express.Router();
const Articles = require("../models/articles.model");



router.get('/', async (req, res) => {
    const articles = await Articles.find().sort({createdAt : "desc"});
    res.render("articles/index", {articles:articles})

    
})


module.exports = router;


