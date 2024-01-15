# import node
FROM node:12.18.3-alpine3.12

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy app source code

COPY . .

# expose port 3000

EXPOSE 3000

# start app

CMD ["npm", "run","start"]