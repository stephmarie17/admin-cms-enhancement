const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

let data;

// Request to get the story title and theme
router.get("/api/ChatStories/story-template-theme", function(req,res) {

const URL =
'https://live-api-stage.yarnapp.co/api/ChatStories?filter=%7B%22where%22:%7B%22id%22:2%7D,%22include%22:%22chatStoryPeople%22%7D';

request({
    method: 'GET',
    uri: URL,
    headers: {
        Authorization: 'ocKE1WN6EE3aSi3olODQxhP1qPUByw3oksOSOvKrjF0I0EofhYCkKAgWe6b1ivaH'
    }
},
    function(err, _, body) {
        console.log(err);
        // console.log(res);
        data = JSON.parse(body);
        console.log("Story", data);
        // console.log(data[0].chatStoryPeople);
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