# =========================
# BUILD STAGE
# =========================
FROM node:22-slim AS build

WORKDIR /app

# Required system deps
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Root configs required by Nx
COPY package*.json nx.json tsconfig.base.json eslint.config.js jest.preset.js ./

# Apps
COPY apps ./apps

# Install deps (Nx postinstall will NOT crash here)
RUN npm install --legacy-peer-deps

# Prisma    
WORKDIR /app/apps/booking-service
RUN npx prisma generate --schema=prisma/schema.prisma

# Build booking-service only
WORKDIR /app
RUN npx nx build booking-service

# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-slim AS prod

WORKDIR /app
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

# Copy runtime artifacts only
COPY --from=build /app/dist/apps/booking-service ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./prisma

WORKDIR /app/dist

CMD ["node", "dist/server.cjs"]
