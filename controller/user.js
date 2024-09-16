const users = require("../models/user");
const { v4: uuid } = require("uuid");
const { setuser } = require("../service/user");
async function handleSignup(req, res) {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        res.render("signup", {
            error: "not enough Data!!",
        })
    }
    const user = await users.create({
        name: body.name,
        email: body.email,
        password: body.password,
    });
    res.redirect("/home/login");
}


async function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.render("login", {
            error: "User email and password required!!",
        })
    }
    else {
        const user = await users.findOne({
            email, password
        })
        if (!user) {
            res.render("login", {
                error: "Invalid username or password!!!"
            })
        }
        else {
            console.log(user);
            const token = setuser(user);
            res.cookie('userID', token);
            res.redirect("/home");
        }
    }



}
module.exports = {
    handleSignup,
    handleLogin,
}