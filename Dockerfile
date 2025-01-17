# FROM node:20.15.1-alpine3.19 as build

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "start" ]


FROM node:22-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]