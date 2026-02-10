# ========== BUILD STAGE ==========
FROM node:22-alpine AS build
WORKDIR /app

# Install needed libs
RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy root files
COPY package*.json nx.json tsconfig.base.json ./

# Copy service files
COPY apps/bus-service/package*.json ./apps/bus-service/
COPY apps/bus-service/tsconfig*.json ./apps/bus-service/
COPY apps/bus-service/prisma ./apps/bus-service/prisma
COPY apps/bus-service/src ./apps/bus-service/src

ENV NX_SKIP_NATIVE=true

# Install ALL deps (including dev deps)
RUN npm ci --legacy-peer-deps

# Generate Prisma Client
WORKDIR /app/apps/bus-service
RUN npx prisma generate --schema=prisma/schema.prisma

# Build TypeScript
RUN npm run build
  

# ========== PRODUCTION STAGE ==========
FROM node:22-alpine AS prod
WORKDIR /app
 
RUN apk add --no-cache openssl libssl3 libcrypto3

# Copy only production deps
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/bus-service/node_modules ./apps/bus-service/node_modules

# Copy built code
COPY --from=build /app/apps/bus-service/dist ./apps/bus-service/dist
COPY --from=build /app/apps/bus-service/package*.json ./apps/bus-service/

# Copy prisma files
COPY --from=build /app/apps/bus-service/prisma ./apps/bus-service/prisma

ENV NODE_ENV=production
WORKDIR /app/apps/bus-service

# Add migrations execution
ENTRYPOINT ["sh", "-c", "\
  echo 'Applying Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting server...'; \
  node dist/server.js \
"]
