#Official Node.js runtime image
FROM node:12

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]