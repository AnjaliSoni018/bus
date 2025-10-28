# ========== Build Stage ==========
FROM node:22-alpine AS build
WORKDIR /app

# Environment to avoid Nx postinstall crash + memory issues
ENV NX_SKIP_POSTINSTALL=1
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV npm_config_cache=/tmp/.npm

# Copy root configs
COPY package*.json ./
COPY nx.json tsconfig.base.json ./

# Copy service files
COPY apps/user-service/package*.json ./apps/user-service/
COPY apps/user-service/tsconfig*.json ./apps/user-service/
COPY apps/user-service/prisma ./apps/user-service/prisma
COPY apps/user-service/src ./apps/user-service/src

# Install root + service dependencies (with reduced memory footprint)
RUN npm install --omit=dev --legacy-peer-deps
WORKDIR /app/apps/user-service
RUN npm install --omit=dev --legacy-peer-deps

# Generate Prisma client safely
WORKDIR /app
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma

# Build service
WORKDIR /app/apps/user-service
RUN npm run build

# ========== Production Stage ==========
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV NX_SKIP_POSTINSTALL=1

# Copy built files
COPY --from=build /app/apps/user-service/dist ./dist
COPY --from=build /app/apps/user-service/prisma ./prisma
COPY --from=build /app/apps/user-service/package*.json ./
COPY --from=build /app/apps/user-service/node_modules ./node_modules

# Rebuild Prisma client for production (ensures binary compatibility)
RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  echo 'Running Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting app...'; \
  node dist/main.js \
"]
