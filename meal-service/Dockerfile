FROM node:16-alpine

WORKDIR /home/node/app

COPY package.json ./

COPY . .

RUN npm install && npm cache clean --force


CMD ["npm", "start"]
