# ========== Build Stage ==========
FROM node:22-alpine AS build
WORKDIR /app

# Copy root configs
COPY package*.json ./
COPY nx.json tsconfig.base.json ./

# Copy service files
COPY apps/user-service/package*.json ./apps/user-service/
COPY apps/user-service/tsconfig*.json ./apps/user-service/
COPY apps/user-service/prisma ./apps/user-service/prisma
COPY apps/user-service/src ./apps/user-service/src

# Install root + service dependencies
RUN npm install --legacy-peer-deps
WORKDIR /app/apps/user-service
RUN npm install --legacy-peer-deps

# Generate Prisma client
WORKDIR /app
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma

# Build service
WORKDIR /app/apps/user-service
RUN npm run build

# ========== Production Stage ==========
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Copy built files
COPY --from=build /app/apps/user-service/dist ./dist
COPY --from=build /app/apps/user-service/prisma ./prisma
COPY --from=build /app/apps/user-service/package*.json ./

# Install only production dependencies (fixes depd issue)
RUN npm install --omit=dev --legacy-peer-deps

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  echo 'Running Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting app...'; \
  node dist/main.js \
"]
