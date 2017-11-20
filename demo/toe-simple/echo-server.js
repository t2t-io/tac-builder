const express = require('express')
const app = express()
var bonjour = require('bonjour')()
bonjour.publish({name: 'tictactoe', type: 'toe',  port: 3000})

var EchonetLite = require('node-echonet-lite');
var el = new EchonetLite({'lang': 'en', 'type': 'lan'});

var scanReport = []

el.init((err) => {
  if(err) {
    console.log('[ERROR] '+ err.toString());
    process.exit();
  } else {
    el.startDiscovery((err, res) => {
      el.stopDiscovery();
      if(err) {
        console.log('[ERROR] '+ err.toString());
        process.exit();
      } else {
        // Do something
      }
    });
    el.on('data', (res) => {
      
      console.log(createLine('='));
      var addr = res['device']['address']
      console.log('[RECV] from ' + addr);
      console.log(createLine('-'));
      console.log(res['message']);
      console.log(res['structure'])

      // iterate through the list is not an efficient way to parse the packet
      // given the knowledge of packet format, we should check the binary array direclty

      var struct = res['structure']
      if(struct[6].hex[0]=='72'){ //desc: 'Property value read response (Get_Res)' 
        scanReport = []
        struct[10].structure.forEach((o)=>{
          if(o.key === 'EOJ'){
            scanReport.push({
              'address': addr,
              'classgroup': o.structure[0].desc,
              'class': o.structure[1].desc,
              'instance': o.structure[2].value,
              'hex': o.hex,
              'time': new Date().getTime()
            })
          }
        })
        console.log(scanReport)
      }
      console.log('');
    });
    el.on('sent', (res) => {
      console.log(createLine('='));
      console.log('[SENT] to ' + res['device']['address']);
      console.log(createLine('-'));
      console.log(res['formatted']);
      console.log('');
    });
  }
});

function createLine(char) {
  var len = process.stdout.columns - 1;
  var line = '';
  for(var i=0; i<len; i++) {
    line += char;
  }
  return line;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.json(scanReport))
app.listen(3000, () => console.log('Example app listening on port 3000!'))