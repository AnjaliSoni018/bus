# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

COPY package*.json nx.json tsconfig.base.json eslint.config.js jest.preset.js ./
COPY apps ./apps

RUN npm install --legacy-peer-deps

# Prisma client
WORKDIR /app/apps/booking-service
RUN npx prisma generate

# Build using Nx (single source of truth)
WORKDIR /app
RUN npx nx build booking-service


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Copy build output
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

# 🔥 CRITICAL FIX — create expected runtime path
RUN mkdir -p dist/apps/booking-service/app \
 && cp -r dist/apps/booking-service/apps/booking-service/src/app/* \
       dist/apps/booking-service/app/

# Optional: migrations at startup (Render-safe)
CMD npx prisma migrate deploy \
 && node dist/apps/booking-service/server.cjs
