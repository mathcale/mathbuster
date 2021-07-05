FROM node:14.17.1-alpine3.13 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

RUN npm run build

FROM node:14.17.1-alpine3.13 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
