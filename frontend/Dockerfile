# Stage 1
FROM node:latest as angular
WORKDIR /app
COPY ./app/package.json /app
RUN npm install -g npm@6
RUN npm install
COPY ./app .
RUN npm run build --prod

# Stage 2
FROM nginx:latest
COPY --from=angular /app/dist/app /usr/share/nginx/html