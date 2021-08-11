FROM node:16
WORKDIR /anime-finder
COPY . .
RUN npm i
ENTRYPOINT npm run build && npm run start;
