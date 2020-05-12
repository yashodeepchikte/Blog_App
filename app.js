
// imports
const express = require("express");
const mongoose = require("mongoose");


// connectiong the DATABASE
mongoURI = "mongodb+srv://user:1234@cluster0-qndpg.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI , {useUnifiedTopology: true, useNewUrlParser: true})
    .then(message => console.log("mongo DB connected"));




// initializations
const port = require("./config/key").PORT;
const app = express();


// Middleware
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use("/" , require("./routes/index.js"));

app.use("/articles", require("./routes/articles.js"));




// App listen
app.listen(port, ()=> {
    console.log(`App is running on ${port}` );
})
