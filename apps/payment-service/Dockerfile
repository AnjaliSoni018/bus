# ========== Build Stage ==========
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=development
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Root workspace
COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm install --legacy-peer-deps

# Payment service
COPY apps/payment-service ./apps/payment-service

# 🔴 REQUIRED: install app-level deps
WORKDIR /app/apps/payment-service
RUN npm install --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate

# Build
WORKDIR /app
RUN npx tsc -p apps/payment-service/tsconfig.app.json --outDir dist/apps/payment-service

# ========== Production Stage ==========
FROM node:22-alpine AS prod
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Copy build output
COPY --from=build /app/dist/apps/payment-service ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/payment-service/node_modules ./node_modules
COPY --from=build /app/apps/payment-service/prisma ./prisma

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  echo 'Applying Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting server...'; \
  node dist/main.js \
"]
