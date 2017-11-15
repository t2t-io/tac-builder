var bonjour = require('bonjour')()
bonjour.publish({name: 'tictactoe', type: 'toe',  port: 3000})
