FROM node:16
WORKDIR /anime-finder
COPY . .
RUN npm ci
ENTRYPOINT npm run build && npm run start;
