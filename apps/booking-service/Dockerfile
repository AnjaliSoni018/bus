# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

# Root files
COPY package*.json nx.json tsconfig.base.json ./
  
# App package files
COPY apps/booking-service/package*.json ./apps/booking-service/

# Install deps
RUN npm install --legacy-peer-deps

# Copy source
COPY apps/booking-service/tsconfig*.json ./apps/booking-service/
COPY apps/booking-service/prisma ./apps/booking-service/prisma
COPY apps/booking-service/src ./apps/booking-service/src

# Prisma client
WORKDIR /app/apps/booking-service
RUN npx prisma generate --schema=prisma/schema.prisma

# Compile
RUN npx tsc -p tsconfig.app.json


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app

# Copy compiled output EXACTLY as Nx produced it
COPY --from=build /app/dist ./dist

# Copy runtime deps
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

ENV NODE_ENV=production
WORKDIR /app

# 🔥 THIS IS THE FIX — correct entrypoint
CMD ["node", "dist/apps/booking-service/server.cjs"]
