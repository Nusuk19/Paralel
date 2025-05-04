FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
EXPOSE 4002  
CMD ["node", "server.js"]
