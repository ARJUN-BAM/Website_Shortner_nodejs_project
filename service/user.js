const jwt = require("jsonwebtoken");
const screat = "server@@shortner";
function setuser(user) {
    return jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role,
    }, screat);
}
function getuser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, screat);
    } catch (error) {
        return null;
    }

}
module.exports = {
    setuser, getuser,
}