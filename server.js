const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const fs            = require("file-system");
const PORT          = process.env.PORT || 8080;
const app           = express();

// Authentication - actual repo contains real credentials, this is the dev-test version
app.use((req, res, next) => {
  const auth = { login: 'dev-test', password: 'dev_test01' };
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next();
  }
  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
  res.status(401).send('Authentication required.'); // custom message
});

// Data parsing
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

const previewRoute = require("./controllers/preview");
const storyRoute = require("./controllers/storytemplate");
const AllStories = require("./controllers/chatStories");

app.use(previewRoute);
app.use(storyRoute);
app.use(AllStories);

app.get("/", function(req, res) {
  res.json(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
