# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

# 🔑 COPY ROOT CONFIGS (YOU WERE MISSING THESE)
COPY package*.json nx.json tsconfig.base.json eslint.config.js jest.preset.js ./

# Copy apps
COPY apps ./apps

# Install deps
RUN npm install --legacy-peer-deps

# Build via Nx
RUN npx nx build booking-service


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

ENV NODE_ENV=production

# ✅ Migrations + run
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy --schema=apps/booking-service/prisma/schema.prisma && node dist/apps/booking-service/server.cjs"]
