# ========== Build Stage ==========
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=development
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Root workspace
COPY package.json package-lock.json nx.json tsconfig.base.json ./
RUN npm install --legacy-peer-deps

# Booking service
COPY apps/booking-service ./apps/booking-service

# ⛔ THIS STEP WAS MISSING IN YOUR MENTAL MODEL
WORKDIR /app/apps/booking-service
RUN npm install --legacy-peer-deps

# Generate Prisma client (now @prisma/client EXISTS)
RUN npx prisma generate

# Build
WORKDIR /app
RUN npx tsc -p apps/booking-service/tsconfig.app.json --outDir dist/apps/booking-service

# ========== Production ==========
FROM node:22-alpine AS prod
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

COPY --from=build /app/dist/apps/booking-service ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/node_modules ./node_modules
COPY --from=build /app/apps/booking-service/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.cjs"]
