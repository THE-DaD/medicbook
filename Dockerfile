FROM node:14-alpine AS development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .

# Copy app files
COPY . .

RUN yarn install



# Expose port
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]
