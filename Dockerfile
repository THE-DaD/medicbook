# pull base image
FROM node:16.;4.0-buster-slim

RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/react_native_app
WORKDIR /opt/react_native_app
ENV PATH /opt/react_native_app/.bin:$PATH
COPY package.json .
COPY package-lock.json .
COPY yarn.lock .
#COPY ./package-lock.json ./package-lock.json ./
#COPY ./yarn.lock ./
RUN npm install --force

# copy in our source code last, as it changes the most
WORKDIR /opt/react_native_app/app
# for development, we bind mount volumes; comment out for production

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT_NUMBER
ENV PORT $PORT
EXPOSE $PORT

ENTRYPOINT ["npm", "run"]
CMD ["web"]
