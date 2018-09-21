FROM node:10.9.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN npm install serve

# Bundle app source
COPY . /usr/src/app
RUN npm run build

EXPOSE 9000
CMD [ "npm", "run", "serve" ]