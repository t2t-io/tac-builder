#!/bin/bash
alias tac-spa='docker run -it --rm -v "$PWD":/tmp t2t/tac-builder tac-spa'
alias tac-gen='docker run -it --rm -v "$PWD":/tmp t2t/tac-builder tac-gen'
alias tac-build='docker run -it --rm -v "$PWD":/tmp t2t/tac-builder tac-build'
function tac-spa-update(){
	fullname=$1
	pname=${fullname%.*}
	tac-spa "$fullname" && 
	cp "$pname.html" "$pname/www/index.html"
}