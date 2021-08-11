FROM node:16
WORKDIR /anime-finder
COPY . .
ENV BOT_TOKEN=<token>
RUN npm i
ENTRYPOINT npm run build && npm run start;
