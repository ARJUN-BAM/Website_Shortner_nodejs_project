const express = require("express");
const { handleGeneratedurl, redirectUrl, handleClicks, getallUrls } = require("../controller/url");
const router = express.Router();
const { checkAdmin } = require("../middleware/user");


router.route("/").get(checkAdmin, getallUrls)
router.get("/url/:shorturl", checkAdmin, redirectUrl);
router.get("/analytics/:id", checkAdmin, handleClicks);

module.exports = router;