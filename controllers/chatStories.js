const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

let data;

// Request to get the story title and theme
router.get("/api/ChatStories/all", function(req,res) {

const URL =
'https://live-api-stage.yarnapp.co/api/ChatStories?filter=%7B%22include%22:%7B%22relation%22:%22chatStoryTags%22,%22scope%22:%7B%22fields%22:%5B%22name%22%5D%7D%7D%7D';

request({
    method: 'GET',
    uri: URL,
    headers: {
        Authorization: 'd6GqEElL0yRMJsN0ze8FHb5tgmmMEgyCipzRCLtgSMMlEhc7gZEEpPd90LMx723h'
    }
},
    function(err, _, body) {
        console.log(err);
        // console.log(res);
        data = JSON.parse(body);
        var results = getAllStories();
        res.json(results);
});

let allStories = [];
const AllStories = require("../lib/chatStories.js");

// Constructs object to export the story title and display theme
function getAllStories() {

    for (let i = 0; i<10; i++){

        const storiesData = data[i];
        const {title, id} = storiesData;
        allStories.push (new AllStories (title, id));
        console.log("We are in all stories controller!");
        console.log(allStories);

    }
  
    return allStories;
}
});

module.exports = router;