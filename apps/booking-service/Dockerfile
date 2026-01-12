# ========== BUILD STAGE ==========
FROM node:22-alpine AS build
WORKDIR /app

# Native deps required by Prisma
RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy root workspace files
COPY package*.json nx.json tsconfig.base.json ./

# Copy booking-service specific files
COPY apps/booking-service/package*.json ./apps/booking-service/
COPY apps/booking-service/tsconfig*.json ./apps/booking-service/
COPY apps/booking-service/prisma ./apps/booking-service/prisma
COPY apps/booking-service/src ./apps/booking-service/src

# Install deps (workspace-aware)
RUN npm ci --legacy-peer-deps

# Generate Prisma Client
WORKDIR /app/apps/booking-service
RUN npx prisma generate --schema=prisma/schema.prisma

# Build TS → JS
RUN npm run build


# ========== PRODUCTION STAGE ==========
FROM node:22-alpine AS prod
WORKDIR /app

RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy node_modules (Render expects runtime deps present)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/node_modules ./apps/booking-service/node_modules

# Copy compiled output
COPY --from=build /app/apps/booking-service/dist ./apps/booking-service/dist
COPY --from=build /app/apps/booking-service/package*.json ./apps/booking-service/

# Copy Prisma artifacts
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

ENV NODE_ENV=production
WORKDIR /app/apps/booking-service

# Run migrations then start
ENTRYPOINT ["sh", "-c", "\
  echo 'Applying Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting booking-service...'; \
  node dist/server.js \
"]
