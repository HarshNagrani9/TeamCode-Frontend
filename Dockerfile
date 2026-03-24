FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache curl

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
  CMD sh -c 'curl -fsS http://localhost/health >/dev/null || exit 1'

