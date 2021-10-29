FROM node:lts-alpine

ENV PROJECT_PATH=/opt/anime-finder/

RUN apk add --update \
    curl \
    bash \
    && rm -rf /var/cache/apk/*

RUN mkdir $PROJECT_PATH
WORKDIR $PROJECT_PATH

COPY ./*.json $PROJECT_PATH
COPY ./src $PROJECT_PATH/src

RUN if [ ! -f "$PROJECT_PATH/package-lock.json" ]; then \
    npm i ; \
 else \
    npm ci ; \
 fi


ENTRYPOINT npm run build && npm run start;
