#!/bin/sh

docker build -f build/Dockerfile -t godsboss/ld-42 ./build
docker run -t --rm -v `pwd`:/root godsboss/ld-42
