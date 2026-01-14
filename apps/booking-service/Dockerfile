# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Prisma needs OpenSSL on Alpine
RUN apk add --no-cache openssl

# Root config
COPY package*.json nx.json tsconfig.base.json eslint.config.js jest.preset.js ./

# Apps
COPY apps ./apps

# Install deps
RUN npm install --legacy-peer-deps

# Generate Prisma client
WORKDIR /app/apps/booking-service
RUN npx prisma generate

# Build booking-service
WORKDIR /app
RUN npx nx build booking-service


# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
RUN apk add --no-cache openssl

# Copy runtime artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

ENV NODE_ENV=production

# Run migrations THEN start app
CMD sh -c "npx prisma migrate deploy --schema=apps/booking-service/prisma/schema.prisma && node dist/apps/booking-service/apps/booking-service/src/server.cjs"
