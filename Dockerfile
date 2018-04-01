FROM node:carbon

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY ./app

EXPOSE 6000

CMD [ "npm", "start" ]