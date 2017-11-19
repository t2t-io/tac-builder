var bonjour = require('bonjour')()

// browse for all http services
bonjour.find({ type: 'toe' }, function (service) {
  console.log('Found an HTTP server:', service)
})
