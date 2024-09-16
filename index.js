const express = require("express");
const path = require("path");
const app = express();
const urlRoute = require("./routes/url");
const { connecttoDB } = require("./connection");
const homeRoute = require("./routes/home");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));  




connecttoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", urlRoute);
app.use("/home", homeRoute);

app.listen(8002, (err) => {
    if (err) {
        console.log("server not responding!!");
    }
    console.log("server has started!!");
})