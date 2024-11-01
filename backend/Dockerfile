FROM node:23-alpine3.20

RUN	npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

RUN	npm install

ENTRYPOINT ["sh", "-c", "npx prisma generate && npm run start:migrate:dev & npx prisma studio"]