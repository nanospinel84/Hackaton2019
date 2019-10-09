FROM mhart/alpine-node:8.12.0

# Create app directory
WORKDIR ./
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./blockchainmanager/package.json ./
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source

COPY . .
EXPOSE 7020
CMD npm start