FROM node:22-alpine as react-build
WORKDIR '/app'
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
