#!/bin/bash
# Currently tac-builder image is not on public repo yet.  It's to be loaded with `docker load -i tac-builder.gz`
alias tac-spa='docker run -it --rm -v "$PWD":/tmp tac-builder tac-spa'
alias tac-gen='docker run -it --rm -v "$PWD":/tmp tac-builder tac-gen'
alias tac-build='docker run -it --rm -v "$PWD":/tmp tac-builder tac-build'
