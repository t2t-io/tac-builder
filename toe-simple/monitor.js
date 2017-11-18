var EchonetLite = require('node-echonet-lite');
var el = new EchonetLite({'lang': 'en', 'type': 'lan'});

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
      console.log('[RECV] from ' + res['device']['address']);
      console.log(createLine('-'));
      console.log(res['message']);
      console.log(res['structure'])
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

