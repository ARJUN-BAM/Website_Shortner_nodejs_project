const express = require("express");
const { handleGeneratedurl } = require("../controller/url");
const { handleSignup, handleLogin } = require("../controller/user");
const homeRouter = express.Router();
const { handleCookie, userAuth } = require("../middleware/user");
const urls = require("../models/url");

homeRouter.route("/").get(userAuth, async (req, res) => {
    if (req.user) {
        const urlls = await urls.find({ createdBy: req.user.email })
        if (urlls.length === 0) {
            res.render("home", {
                urls: urlls,
                error: `welcome ${req.user.name}`,
                index: 0,
            });
        }
        else {
            res.render("home", {
                urls: urlls,
                index: 0,
                error: `welcome ${req.user.name}`,
                shorturl: urlls[urlls.length - 1].shorturl,
            });
        }


    }
    else {
        const urlls = [];
        res.render("home", {
            urls: urlls,
            error: "",
            index: 0
        });
    }

})
    .post(handleCookie, handleGeneratedurl);


homeRouter.route("/signup").get((req, res) => {
    res.render("signup");
})
    .post(handleSignup);

homeRouter.route("/login").get((req, res) => {
    res.render("login");
})
    .post(handleLogin);

module.exports = homeRouter;