const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const fs            = require("file-system");
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

// const controllers = fs.readdirSync(path.join(__dirname, 'controllers'))
// controllers.forEach(controller => {
//   app.use(`/${controller}`, require(`./controllers/${controller}`))
// })
const previewRoute = require("./controllers/preview");
const storyRoute = require("./controllers/storytemplate");

app.use(previewRoute);
app.use(storyRoute);


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
