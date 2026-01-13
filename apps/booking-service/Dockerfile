# ========== BUILD STAGE ==========
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache openssl libssl3 libcrypto3

COPY package*.json nx.json tsconfig.base.json ./

COPY apps/booking-service/package*.json ./apps/booking-service/
COPY apps/booking-service/tsconfig*.json ./apps/booking-service/
COPY apps/booking-service/prisma ./apps/booking-service/prisma
COPY apps/booking-service/src ./apps/booking-service/src

RUN npm install --legacy-peer-deps

WORKDIR /app/apps/booking-service

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Compile TypeScript (no cp src/generated nonsense)
RUN npx tsc -p tsconfig.app.json

# ========== PRODUCTION STAGE ==========
FROM node:22-alpine AS prod
WORKDIR /app

RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy node_modules
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/node_modules ./apps/booking-service/node_modules

# Copy compiled JS from correct Nx outDir
COPY --from=build /app/dist/out-tsc/apps/booking-service ./apps/booking-service/dist

# Copy prisma & package.json
COPY --from=build /app/apps/booking-service/package*.json ./apps/booking-service/
COPY --from=build /app/apps/booking-service/prisma ./apps/booking-service/prisma

ENV NODE_ENV=production
WORKDIR /app/apps/booking-service

ENTRYPOINT ["sh", "-c", "\
  echo 'Applying Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Starting booking-service...'; \
  node dist/server.js \
"]

