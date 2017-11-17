FROM beevelop/cordova:latest
MAINTAINER Arron Fang <arron@t2t.io>
RUN apt-get update
RUN apt-get install -y nano git
RUN cd ~ && git clone https://github.com/t2t-io/tac-builder.git
RUN cd ~/tac-builder && npm i -g
WORKDIR "/tmp"
