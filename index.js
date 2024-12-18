const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/url')
const {connection} = require('./connection')
const URL = require("./models/url")
const path = require("path")
const staticRoute = require("./routes/staticRouter")

const app = express();
const PORT = 3000


connection('mongodb://localhost:27017/shorten-url')
.then(() => console.log("MongoDB Connected")
)

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use("/url",urlRouter)
app.use("/",staticRoute)


app.get("/app/test", async (req,res)=>{
    const allUrl = await URL.find({});
    return res.render('index',{
        url : allUrl
    })
})


// 2 request to show the redirected link

app.get("/:sid", async (req,res)=>{
    const sid = req.params.sid;
    const entry = await URL.findOneAndUpdate({
        sid
    },{ $push :{
        visitHistory :{
            timestamp : Date.now()
        }
    } })

    res.redirect(entry.redirectUrl);
})

app.listen(PORT ,()=> console.log(`Server Started ${PORT}`));









// const express = require('express');
// const mongoose = require('mongoose');
// const urlRouter = require('./routes/url');
// const { connection } = require('./connection');
// const URL = require("./models/url");

// const app = express();
// const PORT = 3000;

// // Connect to MongoDB
// connection('mongodb://localhost:27017/shorten-url')
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error("MongoDB Connection Error:", err));

// app.use(express.json());

// // Define URL routes
// app.use("/url", urlRouter);

// // Handle redirection for short URLs
// app.get("/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;

//     try {
//         // Find and update visit history
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             { $push: { visitHistory: { timestamp: Date.now() } } },
//             { new: true } // Return the updated document
//         );

//         // Handle case where the shortId is not found
//         if (!entry) {
//             return res.status(404).send("Short URL not found");
//         }

//         // Redirect to the original URL
//         res.redirect(entry.redirectUrl);
//     } catch (error) {
//         console.error("Error handling short URL:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Start the server
// app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
