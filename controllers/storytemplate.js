const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

let data;

// Request to get the story title and theme
router.get("/api/ChatStories/story-template-theme", function(req,res) {

const URL =
'dev-test-url'

request({
    method: 'GET',
    uri: URL,
    headers: {
        Authorization: 'dev-test-header'
    }
},
    function(err, _, body) {
        console.log(err);
        // console.log(res);
        data = JSON.parse(body);
        var results = getStoryInfo();
        res.json(results);
});

let storyInfo = {};
const StoryInfo = require("../lib/storyInfo.js");

// Constructs object to export the story title and display theme
function getStoryInfo() {
    const storyData = data[0];
    const {title, bgColor, fgColor} = storyData;
    storyInfo = new StoryInfo (title, bgColor, fgColor);
    return storyInfo;
}
});

module.exports = router;