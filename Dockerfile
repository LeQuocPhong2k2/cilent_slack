FROM node:alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm clean-install

COPY pages pages/
COPY public public/
COPY next.config.js ./
RUN npm run build

FROM node:alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=build /usr/src/app/next.config.js ./
COPY --from=build /usr/src/app/public public/
COPY --from=build /usr/src/app/.next .next/
COPY --from=build /usr/src/app/node_modules node_modules/
COPY --from=build /usr/src/app/package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
