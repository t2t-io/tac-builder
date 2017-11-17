#!/bin/bash
# this script updates tac-builder project inside the container and commit to teh image t2t/tac-builder
docker run -it t2t/tac-builder npm i -g git+https://github.com/t2t-io/tac-builder.git
docker commit `docker ps -lq` t2t/tac-builder
docker rm `docker ps -lq`
