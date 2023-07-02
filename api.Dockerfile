FROM node:19-alpine

WORKDIR /app/api

COPY ./dist/apps/api .

COPY /dist/apps/api/package.json package.json

COPY pnpm-lock.yaml pnpm-lock.yaml

COPY .env .env

RUN npm i -g pnpm

RUN pnpm install

CMD ["node", "main.js"]
