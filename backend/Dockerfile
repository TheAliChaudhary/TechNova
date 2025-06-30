FROM node:18

WORKDIR /usr/src/app

# Install bash (Debian/Ubuntu syntax)
RUN apt-get update && apt-get install -y bash

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Use wait-for-it script to wait for MongoDB
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "mongodb:27017", "--", "npm", "run", "start:dev"] 