var bonjour = require('bonjour')()
bonjour.publish({name: 'toe web server', type: 'http',  port: 3000})
