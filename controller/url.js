const shortid = require("shortid");
const urls = require("../models/url");


async function getallUrls(req, res) {
    const Urls = await urls.find({});

    const html = ` <ul>
        ${Urls.map((user) => `<li>${user.url}</li>
        <li> ${user.shorturl}</li>`).join("")}
    </ul>`
    return res.send(html);
}

async function handleGeneratedurl(req, res) {
    const body = req.body;
    if (!body.url) {
        res.redirect("/home")
    }
    else {
        const shortID = shortid();
        if (body.url) {
            await urls.create(
                {
                    url: body.url,
                    shorturl: shortID,
                    totalclicks: [],
                    createdBy: req.user.email,
                }
            );
        }

        res.redirect("/home");
    }

}

async function handleClicks(req, res) {
    const shorturl = req.params.id;
    const result = await urls.findOne({ shorturl });
    return res.json({
        clicks: result.totalclicks.length,
        analytics: result.totalclicks,
    })
}

async function redirectUrl(req, res) {
    const shorturl = req.params.shorturl;
    const result = await urls.findOneAndUpdate({ shorturl, }, {
        $push: {
            totalclicks: {
                timestamp: Date.now(),
            }
        }
    });
    if (!result.url) {
        res.end("couldn't get the shorturl in the database!!!try again");
    }
    else {
        res.redirect(result.url);
    }

}



module.exports = {
    handleGeneratedurl,
    redirectUrl,
    handleClicks,
    getallUrls
}