FROM node:12-alpine

# Install build tools
# Needed by npm install
RUN apk update && apk upgrade
RUN apk --no-cache add --no-cache dumb-init curl make gcc g++ udev git\
 ttf-freefont python linux-headers binutils-gold gnupg libstdc++ nss\
  freetype freetype-dev harfbuzz chromium

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v5.2.1 works with Chromium 85.
RUN yarn global add puppeteer@5.2.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . /app

RUN yarn build
