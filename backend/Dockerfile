FROM node:22-alpine

WORKDIR '/app'

COPY ./package.json ./package-lock.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

EXPOSE 3001
# run node directly: keeps npm (and its vulnerable bundled deps) out of the container runtime
CMD ["node", "index.js"]
