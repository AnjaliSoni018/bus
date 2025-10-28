# =========================
# ===== Build Stage =======
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Copy required files
COPY package*.json ./
COPY nx.json tsconfig.base.json ./

# Copy user-service specific files
COPY apps/user-service/package*.json ./apps/user-service/
COPY apps/user-service/tsconfig*.json ./apps/user-service/
COPY apps/user-service/prisma ./apps/user-service/prisma
COPY apps/user-service/src ./apps/user-service/src

# Install dependencies
RUN npm ci --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma

# Build service using its own build script
WORKDIR /app/apps/user-service
RUN npm run build

# Show build output
RUN echo "Build output structure:" && ls -R dist || echo "dist not found!"

# =========================
# ==== Production Stage ===
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Copy build output from correct path
COPY --from=build /app/apps/user-service/dist ./dist
COPY --from=build /app/apps/user-service/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/user-service/package*.json ./

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  echo 'Running Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting app...'; \
  node dist/main.js \
"]
