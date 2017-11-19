const express = require('express')
const app = express()
var bonjour = require('bonjour')()
bonjour.publish({name: 'tictactoe', type: 'toe',  port: 3000})

var scanReport = [
  {
    "address": "172.16.0.108",
    "classgroup": "Air conditioner-related device class group",
    "class": "Home air conditioner class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Housing/facility-related device class group",
    "class": "General lighting class class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Housing/facility-related device class group",
    "class": "Electrically operated blind/shade class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Sensor-related device class group",
    "class": "Temperature sensor class",
    "instance": 1
  }
]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.json(scanReport))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
