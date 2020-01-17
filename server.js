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



const routes = require("./controllers/preview");

app.use(routes);


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
        console.log(data[0].chatStoryPeople);
        getCharacterStyles();

    });


//dummy data returned from csv file
let characters = ["Khloe", "Kim", "Kylie"];
//array that will hold the styling information for each character selected in the csv
let characterStyles = [];

function getCharacterStyles() {
    console.log("getCharacterStyles function is working!");


    // characters.forEach(element  => { if (element === data[0].chatStoryPeople[i].title) {
    //     const {title, nameColor, bubbleColor, textColor, alignment} = data[0].chatStoryPeople[i]

    //     characterStyles.push( new CharacterStyle (title, nameColor, bubbleColor, textColor, alignment))

    // }});

    
    //loops through characters in the array containing the csv characters and compares it to characters in database
    for (let i = 0; i< characters.length; i++ ) {
       const compC = data[0].chatStoryPeople.find(function(x){return x.title === characters[i]});

        if (compC) {
            const {title, nameColor, bubbleColor, textColor, alignment} = compC;

            //only pushes up the new character to the characterStyles array when the csv character matches the database character
            characterStyles.push( new CharacterStyle (title, nameColor, bubbleColor, textColor, alignment));
        } else {
            console.log ("don't match");
            console.log(characters[i], data[0].chatStoryPeople[i].title);
        }    



    }

    console.log(characterStyles);

}

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
