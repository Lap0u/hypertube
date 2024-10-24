FROM node:23-alpine3.20

RUN	npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

RUN	npm install

CMD ["sh", "-c", "npm run start:dev  & npx prisma studio"]