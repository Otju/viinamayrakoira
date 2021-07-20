FROM buildkite/puppeteer:10.0.0

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY src ./src