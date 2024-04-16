FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

# RUN yarn install

# COPY . .

# CMD ["yarn", "dev"]

RUN npm install

RUN npm run build
# remove dev dependencies
RUN npm prune --production

EXPOSE 3000

CMD [ "npm", "start" ]
