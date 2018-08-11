#!/bin/sh

docker build -f build/Dockerfile -t godsboss/ld-42 ./build
docker run -t --rm -v `pwd`/dist:/root/dist -v `pwd`/src:/root/src godsboss/ld-42
