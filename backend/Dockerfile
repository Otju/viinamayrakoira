FROM node:14-alpine

WORKDIR /usr/src/app

COPY package* ./
COPY src ./src
#COPY .env .env

RUN npm install

CMD [ "npm", "run", "docker"]gcl