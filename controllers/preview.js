const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
// from API get request 
let data;


router.post("/api/ChatStories/episode-csv-import", function(req,res) {
    const csvData = req.body;
    console.log("posting from controller");
    // console.log(req.body);
    let characters = csvData.characters;


//connection to API
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
        // console.log(data);
        // console.log(data[0].chatStoryPeople);
        var results = getCharacterStyles();
        res.json(results);
});


//dummy data returned from csv file
// let characters = ["Khloe", "Kim", "Kylie"];
//array that will hold the styling information for each character selected in the csv
let characterStyles = [];

let missingChar = [];

//used for getCharacterStyles()
const CharacterStyle = require("../lib/characterStyle.js");
const SystemStyle = require("../lib/systemStyle.js");



function getCharacterStyles() {
    console.log("getCharacterStyles function is working!");
    
    //loops through characters in the array containing the csv characters and compares it to characters in database
    for (let i = 0; i< characters.length; i++ ) {
       const compC = data[0].chatStoryPeople.find(function(x){return x.title === characters[i]});

       if (compC === undefined && characters[i] !== "System" && characters[i] !== "") {
            missingChar.push(characters[i]);
            console.log("missing characters in controller!");
            console.log (missingChar);
       } else if (compC) {
            const {title, nameColor, bubbleColor, textColor, alignment} = compC;

            //only pushes up the new character to the characterStyles array when the csv character matches the database character
            characterStyles.push( new CharacterStyle (title, nameColor, bubbleColor, textColor, alignment));
        } else if (characters[i] === "System") {
            console.log ("don't match");
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