FROM node:carbon
LABEL description="Movie API with CouchDB backend"
LABEL maintainer="Ahmed Sabbour (asabbour@microsoft.com)"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Environment variables you can override
ENV COUCHDB_URL http://127.0.0.1:5984
ENV COUCHDB_NAME movies

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]