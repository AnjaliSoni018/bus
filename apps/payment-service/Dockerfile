# ========== Build Stage ==========
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

ENV NX_SKIP_NATIVE=true
ENV NODE_ENV=development
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm install --legacy-peer-deps

COPY apps/payment-service ./apps/payment-service

WORKDIR /app/apps/payment-service
RUN npm install --legacy-peer-deps
RUN npx prisma generate

WORKDIR /app
RUN npx tsc -p apps/payment-service/tsconfig.app.json --outDir dist/apps/payment-service


# ========== Production Stage ==========
FROM node:22-alpine AS prod
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
ENV NX_SKIP_NATIVE=true
ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# App
COPY --from=build /app/dist/apps/payment-service ./dist

# Prisma client → WHERE NODE EXPECTS IT
COPY --from=build /app/apps/payment-service/src/generated ./dist/generated

# Deps
COPY --from=build /app/node_modules ./node_modules

# Prisma schema
COPY --from=build /app/apps/payment-service/prisma ./prisma

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  node dist/main.js \
"]
