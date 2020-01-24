const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
let data;



// Get data from CSV import to compare to API results
router.post("/api/ChatStories/episode-csv-import", function(req,res) {
    // from API get request 
  
    const storyData = req.body;
    // console.log(req.body);
    let characters = storyData.characters;
    let id = storyData.id;
    

        let templateURLOne = `https://live-api-stage.yarnapp.co/api/ChatStories?filter=`;
        let templateURLTwo = `{"where":{"id":${id}},"include":"chatStoryPeople"}`
        let encodedURL = encodeURIComponent(templateURLTwo);
        let finalURL = templateURLOne + encodedURL; 


   


// Template url to get story info and chatstory people
// const chatStoryId = id
// const templateURL = `https://live-api-stage.yarnapp.co/api/ChatStories?filter={"where":{"id":${chatStoryId}},"include":"chatStoryPeople"}`
// const enocdedURL = encodeURIComponent(templateURL);

//Connection to API
// const URL =
// 'https://live-api-stage.yarnapp.co/api/ChatStories?filter=%7B%22where%22:%7B%22id%22:2%7D,%22include%22:%22chatStoryPeople%22%7D';

request({
    method: 'GET',
    uri: finalURL,
    headers: {
        Authorization: 'ocKE1WN6EE3aSi3olODQxhP1qPUByw3oksOSOvKrjF0I0EofhYCkKAgWe6b1ivaH'
    }
},
    function(err, _, body) {
        console.log(err);
        // console.log(res);
        data = JSON.parse(body);
        // console.log(data);
        // console.log(data[0].chatStoryPeople);
        var results = getCharacterStyles();
        res.json(results);
});


//Array that will hold the styling information for each character selected in the csv
let characterStyles = [];
// Array that will hold any characters in the CSV that do not exist yet in the ChatStory
let missingChar = [];

//Used for getCharacterStyles()
const CharacterStyle = require("../lib/characterStyle.js");
const SystemStyle = require("../lib/systemStyle.js");


// Gets character data from database
function getCharacterStyles() {
    //Loops through characters in the array containing the csv characters and compares it to characters in database
    for (let i = 0; i< characters.length; i++ ) {
       const compC = data[0].chatStoryPeople.find(function(x){return x.title === characters[i]});

       if (compC === undefined && characters[i] !== "System" && characters[i] !== "") {
            missingChar.push(characters[i]);
       } else if (compC) {
            const {title, nameColor, bubbleColor, textColor, alignment} = compC;

            //only pushes up the new character to the characterStyles array when the csv character matches the database character
            characterStyles.push( new CharacterStyle (title, nameColor, bubbleColor, textColor, alignment));
        } else if (characters[i] === "System") {
            // console.log(characters[i], data[0].chatStoryPeople[i].title);
            const fgColor = data[0].fgColor;
            characterStyles.push(new SystemStyle ("", fgColor));

        } else {
            console.log ("Neither a character or the system!");
        }
        

    }

    // console.log(characterStyles);
    // return missingChar;
    if (missingChar.length > 0 ) {
        return missingChar;
    } else {
        return characterStyles;
    }
}

});



module.exports = router;