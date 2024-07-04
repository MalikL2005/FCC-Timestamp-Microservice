// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res)=>{
  //empty
  if (typeof req.params.date === 'undefined') res.json({unix: Date.now(), utc: new Date(Date.now()).toUTCString()});
  //date-format
  else if (req.params.date.match("[0-9]{4}-[0-9]{2}-[0-9]{2}")|| req.params.date.includes(" ")){
    var d = new Date(req.params.date);
    res.json({unix: d.getTime(), utc: d.toUTCString()});
  } 
  //unix-format
  else {
    try {
      var unix_num = Number(req.params.date);
      if (new Date(unix_num) == "Invalid Date") throw new Error('invalid input');
      res.json({unix: unix_num, utc: new Date(unix_num).toUTCString()});
    } 
    //invalid
    catch (err) { res.json({ error : "Invalid Date" });}
  }
  });

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
