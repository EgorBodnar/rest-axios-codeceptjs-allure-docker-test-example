FROM node:16.0.0-buster-slim

WORKDIR usr/src/test

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "test"]
