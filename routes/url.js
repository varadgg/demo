const express = require('express');
const { generateNewShortUrl, noofclicks } = require("../controller/url")


const router = express()

router.post("/",generateNewShortUrl)

router.get("/analytics/:sid",noofclicks)

module.exports = router;