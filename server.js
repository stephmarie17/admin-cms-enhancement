const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");

const PORT          = process.env.PORT || 8080;
const app           = express();



app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(
    bodyParser.json
    ({extended: true}));

app.use(
    bodyParser.urlencoded ({
        extended: true
    })
);

app.use(express.json());
app.use(express.static("public"));



const routes = require("./controllers/preview");

app.use(routes);

// app.get('/api/ChatStories/episode-csv-import', function(req, res){
//     console.log("getting in server!");
//     console.log(req.body);
// })




app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
