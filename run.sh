#!/bin/bash

sudo docker build --no-cache -t anime-finder . && sudo docker run --env-file ./.env -d anime-finder
