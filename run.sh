#!/bin/bash

docker run --rm -it -p 23080:80 -v `pwd`/dist:/usr/share/nginx/html nginx:1.15.2-alpine
