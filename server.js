const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const request       = require("request");

const PORT          = process.env.PORT || 8080;
const app           = express();

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

