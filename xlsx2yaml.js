// convert xlsx input sheet into yaml format
// arron@t2t.io
// (c) 2017

var process = require('process')
XSLX = require('js-xlsx')
YAML = require('yamljs')
var workbook = XSLX.readFile(process.argv[2])
var sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]]
var src = XSLX.utils.sheet_to_json(sheet)
// console.log(src)
var lastIdx
var result = []
function addContent(lst, obj){
	if(obj['type'] == 'button'){
		lst.push({'type':'button', 'link':obj['arg1'], 'text':obj['arg2']})
	}else if(obj['type'] == 'raw'){
		lst.push({'type':'raw', 'text':obj['arg1']})
	}
}
for (var i = 0;i<src.length;i++){
	var row = src[i];
	if(row['id']){
		lastIdx = result.push({'id':row['id'], 'header': row['header'], 'footer':row['footer']}) -1
		result[lastIdx]['content'] = []
	}
	addContent(result[lastIdx]['content'],row)
}

console.log(YAML.stringify(result))
