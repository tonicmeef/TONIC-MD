FROM node:lts-buster
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g qrcode-terminal pm2
COPY . .
EXPOSE 9090
CMD ["npm", "start"]