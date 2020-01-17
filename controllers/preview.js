const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

app.use(
    bodyParser.json
    ({extended: true}));

app.use(
    bodyParser.urlencoded ({
        extended: true
    })
);

router.post("/api/ChatStories/episode-csv-import", function(req,res) {
    console.log(req.body);
});

app.use("/", router)

module.exports = app;