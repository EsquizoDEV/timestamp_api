// server.js
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

const week = {
  1:"Mon",
  2:"Tues",
  3:"Wed",
  4:"Thur",
  5:"Fri",
  6:"Sat",
  7:"Sun"
}
const months = {
  0:"Jan",
  2:"feb",
  2:"Mar",
  3:"Apr",
  4:"May",
  5:"Jun",
  6:"Jul",
  7:"Aug",
  8:"Sep",
  9:"Oct",
  10:"Nov",
  11:"Dec"
}

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let reqDate = req.params.date

  const unix = parseInt(reqDate)
  const unixDate = new Date(unix)
  
  if(unix == reqDate) {
    const date =  new Date(reqDate)
    
    const unixTime = unixDate.getTime()
    const day = unixDate.getUTCDay()
    const month = unixDate.getUTCMonth()
    const number = unixDate.getUTCDate()
    const year = unixDate.getUTCFullYear()
    const hour = unixDate.getUTCHours()
    const minutes = unixDate.getUTCMinutes()
    const seconds = unixDate.getUTCMilliseconds()
    
    res.json({"unix":`${unixTime}`, "utc":`${week[day]}, ${number} ${months[month]} ${year} ${hour}0:${minutes}0:${seconds}0 GMT`})

  } else if(reqDate.includes('-')) {
    
    const date =  new Date(reqDate)
    
  
    const unixTime = date.getTime()
    const day = date.getUTCDay()
    const month = date.getUTCMonth()
    const number = date.getUTCDate()
    const year = date.getUTCFullYear()
    const hour = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCMilliseconds()
    
    res.json({"unix":`${unixTime}`, "utc":`${week[day]}, ${number} ${months[month]} ${year} ${hour}0:${minutes}0:${seconds}0 GMT`})
  } else {
    res.json({error: "Invalid Date"})
  }

  
  
});

app.get("/api/", (req,res)=>{
  const date = new Date()
  console.log(date)
  const day = date.getDay()
  const date2 = date.getUTCDate()
  const month = date.getMonth()
  const year = date.getUTCFullYear()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  
  res.json({"unix":1451001600000, "utc":`${week[day]}, ${date2} ${months[month]} ${year} ${h===0?h + '0' : h}:${m===0? m + '0' : m}:${s===0 ? s + '0' : s} GMT`})
  
})

// listen for requests :)
var listener = app.listen(4500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
