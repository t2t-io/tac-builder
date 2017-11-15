// simple template engine to generate SPA for Tac
// arron@t2t.io
// (c) 2017

var YAML = require('yamljs')
var HTML = require('html')
var fs = require('fs')
var process = require('process')
const cheerio = require('cheerio')

var jqmHead = `<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>TAC template</title>
 	<link rel="stylesheet" href="lib/jquery.mobile-1.4.5.min.css">
	<script src="lib/jquery.min.js"></script>
 	<script src="lib/jquery.mobile-1.4.5.min.js"></script>
 	<script src="lib/handlebars.min.js"></script>
</head>`

// var pageTemplate = fs.readFileSync('page_template').toString()
var yamlContent = fs.readFileSync(process.argv[2]).toString()
var pages = YAML.parse(yamlContent)
// console.log('start to process::\n', pages)

// var finalOutput = '';
var $ = cheerio.load("<div id = 'tacHtmlTop'>")

for (var i=0;i<pages.length;i++){
	thePage = pages[i]
	// console.log('processing:\n',thePage)

	if(thePage.hasOwnProperty('id')){
		$("#tacHtmlTop").append($("<div data-role='page' id='"+thePage.id+"'>"))
	}else{
		console.log('Error: page id missing for \n', thePage)
		process.exit()
	}
	if(thePage['header']){
		$("#"+thePage.id).append("<div data-role='header'><h1>"+thePage.header)
	}
	if(thePage['content']){
		$("#"+thePage.id).append("<div role='main' class='ui-content'>")
		for(var j =0;j<thePage.content.length;j++){
			var item = thePage.content[j]
			switch(item['type']){
				case 'button':
					$("#"+thePage.id + " .ui-content").append($("<p><a href='#"+item['link']+"' class='ui-btn ui-shadow ui-corner-all'>" + item['text']))
				break;
				case 'raw':
					$("#"+thePage.id + " .ui-content").append(item['text'])
				break;
			}
		}
	}
	if(thePage['footer']){
		$("#"+thePage.id).append("<div data-role='footer'><h4>"+thePage.footer)
	}
}

var beautify = require('html')
console.log(beautify.prettyPrint($.html()).replace("<head></head>", jqmHead).replace("<html>", "<!DOCTYPE html><html>"))