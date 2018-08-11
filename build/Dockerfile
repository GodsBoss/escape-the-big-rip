FROM alpine:3.7

WORKDIR /root

RUN mkdir -p /root/dist
RUN mkdir -p /root/src

RUN apk add --update-cache \
  gimp \
  nodejs \
  nodejs-npm

COPY cmd.sh /root
COPY package.json /root
COPY package-lock.json /root
COPY webpack.config.js /root

RUN npm install

CMD ["/bin/sh", "/root/cmd.sh"]
