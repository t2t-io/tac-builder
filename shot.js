var page = require('webpage').create();
page.open("test.html", function() {
  page.render('output.jpg');
  phantom.exit();
});
