# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl

# Root configs REQUIRED by Nx
COPY package*.json nx.json tsconfig.base.json eslint.config.js jest.preset.js ./

# Apps
COPY apps ./apps

# Install deps
RUN npm install --legacy-peer-deps

# Prisma (explicit schema path — no guessing)
WORKDIR /app/apps/booking-service
RUN npx prisma generate --schema=prisma/schema.prisma

# Build ONLY booking-service
WORKDIR /app
RUN npx nx build booking-service

# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Copy runtime artifacts
COPY --from=build /app/dist/apps/booking-service ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./prisma

# ✅ THIS FILE EXISTS — you verified it
CMD ["node", "dist/server.cjs"]
