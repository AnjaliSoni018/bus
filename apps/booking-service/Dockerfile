# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

# Root config
COPY package*.json nx.json tsconfig.base.json ./

# App package.json
COPY apps/booking-service/package*.json ./apps/booking-service/

# Install deps once
RUN npm install --legacy-peer-deps

# Copy app source
COPY apps/booking-service ./apps/booking-service

# Generate Prisma client + build
WORKDIR /app/apps/booking-service
RUN npx prisma generate
RUN npx tsc -p tsconfig.app.json


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy compiled output
COPY --from=build /app/dist/booking-service ./dist

# Copy runtime deps
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./prisma

ENV NODE_ENV=production

# ✅ MIGRATIONS + START (CORRECT PLACE)
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
