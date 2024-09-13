FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY vite.config.ts tsconfig.json tsconfig.node.json tsconfig.app.json tailwind.config.js ./

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
