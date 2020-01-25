const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

let data;

// Request to get the story title and theme
router.get("/api/ChatStories/all", function(req,res) {

const URL =
'dev-test-URL';

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
        var results = getAllStories();
        res.json(results);
});

let allStories = [];
const AllStories = require("../lib/chatStories.js");

// Constructs object to export the story title and display theme
function getAllStories() {

    for (let i = 0; i<data.length; i++){

        const storiesData = data[i];
        const {title, id} = storiesData;
        allStories.push (new AllStories (title, id));
        

    }
  
    return allStories;
}
});

module.exports = router;