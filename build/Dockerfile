FROM alpine:3.7

WORKDIR /root

RUN apk add --update-cache \
  gimp

COPY cmd.sh /usr/local/bin

CMD ["/bin/sh", "/usr/local/bin/cmd.sh"]
