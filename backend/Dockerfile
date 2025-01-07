FROM node:23-alpine3.20

RUN apk update && \
    apk add ffmpeg && \
    mkdir /tmp/mkv_to_mp4_file

RUN	npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

RUN	npm install

# ENTRYPOINT ["sh", "-c", "npx prisma generate && npm run start:prod"]
ENTRYPOINT ["sh", "-c", "npx prisma generate && npm run start:migrate:dev & npx prisma studio"]