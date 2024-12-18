const shortid = require("shortid");

const URL = require("../models/url")

async function generateNewShortUrl(req,res) {
    const body = req.body;
    if (!body) return res.status(400).json({err : "URL is required"})

    const shortUrl = shortid(8)

    await URL.create({
        sid : shortUrl,
        redirectUrl : body.url,
        visitHistory :[]
    });
    return res.json({id : shortUrl})
}

async function noofclicks(req,res) {
    const sid = req.params.sid;
    const result = await URL.findOne({ sid })
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}


module.exports={
    generateNewShortUrl,
    noofclicks
}