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

//Connection to API
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