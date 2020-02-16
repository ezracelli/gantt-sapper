FROM 'alpine' as build
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN apk add --update --no-cache \
    jq \
    nodejs \
    yarn && \
  yarn install

COPY . .

RUN yarn build && \
  yarn remove $(cat package.json | jq -r '.devDependencies | keys | join(" ")') && \
  yarn cache clean && \
  apk del --no-cache \
    jq \
    yarn && \
  find . -maxdepth 1 \
    ! -name "__sapper__" \
    ! -name "node_modules" \
    ! -name "static" \
    -name "*[a-z]*" \
    -exec rm -rf {} +

FROM 'alpine'
WORKDIR /usr/src/app

RUN apk add --update --no-cache nodejs && \
  touch .env
COPY --from=build /usr/src/app .

ENV NODE_ENV=production
CMD [ "node", "__sapper__/build" ]
