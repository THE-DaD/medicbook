# pull base image
FROM node:16.10.0-buster-slim


# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG 19006
ENV PORT ${PORT_NUMBER}
ENV HOST 0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME 0.0.0.0
EXPOSE 19006 19000 19001 19002

RUN mkdir /opt/app
WORKDIR /opt/app
ENV PATH /opt/app/.bin:$PATH

COPY . .

RUN ls
RUN pwd

RUN ls res/assets/Trivia
RUN du -sh res/assets/Trivia/xButton.png


RUN npm install -g npm@8.5.2 --unsafe-perm --allow-root expo-cli@latest yarn --force

RUN npx expo-cli init react_native_app --npm --template bare-minimum
RUN yarn install

ENTRYPOINT ["npm", "run"]
CMD ["web"]
