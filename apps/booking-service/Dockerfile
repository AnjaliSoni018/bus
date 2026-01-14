# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps

RUN npm install --legacy-peer-deps

WORKDIR /app/apps/booking-service
RUN npx prisma generate

WORKDIR /app
RUN npx nx build booking-service


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

# 🔥 CRITICAL FIX — make Node resolve ./app
RUN ln -s \
  /app/dist/apps/booking-service/apps/booking-service/src/app.cjs \
  /app/dist/apps/booking-service/apps/booking-service/src/app.js

ENV NODE_ENV=production

CMD ["node", "dist/apps/booking-service/apps/booking-service/src/server.cjs"]
