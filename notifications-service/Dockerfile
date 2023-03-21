FROM mhart/alpine-node:16.4.2
WORKDIR /app
COPY ./package.json ./
RUN yarn install --ignore-engines
COPY . .
RUN npm run build
CMD ["yarn", "run", "start:prod"]