const { getuser } = require("../service/user");

async function handleCookie(req, res, next) {

    const user = getuser(req.cookies.userID);
    if (!user) {
        res.redirect("/home/login")
    }
    else {
        req.user = user;
        next();
    }
}

async function checkAdmin(req, res, next) {
    const user = getuser(req.cookies.userID);
    if (!user) {
        res.redirect("/home/login")
    }
    else {
        console.log(user);
        if (user.role == "Normal") {
            res.json({ error: "unauthorized service" });
        }
        else if (user.role == "Admin") {
            next();
        }
        else {
            res.json({ error: "unauthorized service" });
        }
    }
}
async function userAuth(req, res, next) {
    const userid = req.cookies?.userID;
    const user = getuser(userid);
    req.user = user;
    next();

}
module.exports = {
    handleCookie,
    userAuth,
    checkAdmin,
}