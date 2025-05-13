FROM node:22.15-alpine AS deps

# cd /app
WORKDIR /app

# copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files to the working directory
COPY . ./

# build the application
RUN npm run build

FROM node:22.15-alpine AS runner

# cd /app
WORKDIR /app

# copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# install only production dependencies
RUN npm install --prod

# copy all files from the build stage to the working directory
COPY --from=deps /app/dist /app/dist

# cd /app/dist/src
WORKDIR /app/dist/src

# open port 3000
EXPOSE 3000

# set environment variable
ENV PROD=true

# run the application
CMD [ "node", "index.js" ]