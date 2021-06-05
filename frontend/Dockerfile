FROM node:latest as angular
WORKDIR /app
COPY ./app/package.json /app
RUN npm install -g npm@6
RUN npm -v
RUN npm install -g @angular/cli
RUN npm install