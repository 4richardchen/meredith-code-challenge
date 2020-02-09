FROM node
MAINTAINER Richard Chen <richard@richardchen.com>
WORKDIR /home
COPY . .
RUN npm install
EXPOSE 8000
