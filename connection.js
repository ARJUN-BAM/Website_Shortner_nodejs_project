const mongoose = require("mongoose");

async function connecttoDB() {

    return mongoose.connect("mongodb://localhost:27017/url_database2").then(() => {
        console.log("database connected!!");
    }).catch(err => console.log("cannot connected to the database!!"));
}

module.exports = {
    connecttoDB,
}