# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app
RUN apk add --no-cache openssl libssl3 libcrypto3

COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps

RUN npm install --legacy-peer-deps

# ⬅️ USE NX (STOP MANUAL TSC)
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

# ✅ THIS FILE EXISTS — Nx guarantees it
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && node dist/apps/booking-service/server.cjs"]
