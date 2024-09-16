const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    shorturl: {
        type: String,
        required: true,
        unique: true
    },
    totalclicks: {
        type: [{
            timestamp: {
                type: Number
            }
        }]
    },
    createdBy: {
        type: String,
        ref: "user",
    }

}, { timestamps: true });

const urls = mongoose.model("URL", urlSchema);

module.exports = urls;