FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN rm -f package-lock.json && npm install
COPY . /usr/src/app

EXPOSE 3000
