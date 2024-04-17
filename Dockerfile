FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

# FROM node:16-alpine AS BUILD_IMAGE
# RUN mkdir -p /usr/app/
# WORKDIR /usr/app
# COPY ./ ./

# ARG NEXT_PUBLIC_BASE_URL

# ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# RUN npm install

# RUN npm run build

# EXPOSE 3000

# CMD [ "npm", "start" ]