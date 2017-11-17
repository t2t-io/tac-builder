FROM beevelop/cordova:latest
MAINTAINER Arron Fang <arron@t2t.io>
WORKDIR "/tmp"
RUN apt-get update
RUN apt-get install -y nano git
RUN cd /tmp && git clone https://github.com/t2t-io/tac-builder.git
RUN cd /tmp/tac-builder && npm i -g && rm -rf /tmp/tac-builder
