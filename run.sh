#!/bin/bash

if [ ! -f package-lock.json ]; then
  npm i
fi

sudo docker build --no-cache -t anime-finder .
sudo docker run --env-file ./.env -d anime-finder
