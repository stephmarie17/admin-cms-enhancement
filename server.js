const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const request       = require("request");

const PORT          = process.env.PORT || 8080;
const app           = express();

//used for getCharacterStyles()
const CharacterStyle = require("./lib/characterStyle.js");
let data;

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());
app.use(express.static("public"));


request({
    method: 'GET',
    uri: 'https://live-api-stage.yarnapp.co/api/ChatStories?filter=%7B%22where%22:%7B%22id%22:2%7D,%22include%22:%22chatStoryPeople%22%7D',
    headers: {
        Authorization: 'ocKE1WN6EE3aSi3olODQxhP1qPUByw3oksOSOvKrjF0I0EofhYCkKAgWe6b1ivaH'
    }
},
    function(err, res, body) {
    let data = JSON.parse(body);
    console.log(data[0].chatStoryPeople);
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });


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
    function(err, res, body) {
        console.log(err);
        // console.log(res);
        data = JSON.parse(body);
        // console.log(data);
        // console.log(data[0].chatStoryPeople[1].title);
        getCharacterStyles();

    });


//dummy data returned from csv file
let characters = ["Khloe", "Kim", "Kylie"];
//array that will hold the styling information for each character selected in the csv
let characterStyles = [];

function getCharacterStyles() {
    console.log("getCharacterStyles function is working!");

    //loops through characters in the array containing the csv characters and compares it to characters in database
    for (let i = 0; i < characters.length; i++ ) {
        if (characters[i] = data[0].chatStoryPeople[i].title ) {
           
            //only pushes up the new character to the characterStyles array when the csv character matches the database character
            characterStyles.push( new CharacterStyle (data[0].chatStoryPeople[i].title, data[0].chatStoryPeople[i].nameColor, data[0].chatStoryPeople[i].bubbleColor, data[0].chatStoryPeople[i].textColor, data[0].chatStoryPeople[i].alignment));
        }    

    }

    console.log(characterStyles[0].title);

}

