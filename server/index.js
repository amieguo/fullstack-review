const express = require('express');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const getGithub = require('../helpers/github.js');
const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getGithub.getReposByUsername(req.body.term, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      // console.log(result)
      db.save(result)
    } // result is the repo for a user info from github API. Once we get the data back, 
    // need to do another callback here that calls db.save() which saves the data into the database
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.selectTop( (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
      // console.log('ajflksjklfjskdlfjdkf:', result)
    }
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

