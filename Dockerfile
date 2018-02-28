FROM node
LABEL description="Movie API with CouchDB backend"
LABEL maintainer="Ahmed Sabbour (asabbour@microsoft.com)"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]