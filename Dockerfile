# syntax=docker/dockerfile:1

FROM node:24-alpine3.21

# Set destination for COPY
WORKDIR /home/puppeteer

# Copy container source code
COPY container_src/index.js ./
COPY container_src/package.json ./

# Install dependencies
RUN npm install

EXPOSE 8080

# Run
CMD ["node", "index.js"]