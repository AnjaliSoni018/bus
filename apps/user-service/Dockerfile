# =========================
# ===== Build Stage =======
# =========================
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy essential files
COPY package*.json ./
COPY nx.json tsconfig.base.json ./
COPY apps/user-service/package*.json ./apps/user-service/
COPY apps/user-service/tsconfig*.json ./apps/user-service/
COPY apps/user-service/prisma ./apps/user-service/prisma
COPY apps/user-service/src ./apps/user-service/src

# Install dependencies
RUN npm ci --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma

# --- Build the service using Nx ---
RUN npx nx build user-service

# Check build output
RUN echo "Contents of dist folder:" && ls -R dist || echo "dist folder missing!"

# =========================
# ==== Production Stage ===
# =========================
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Copy build output from Nx (whether dist/ or apps/user-service)
COPY --from=build /app/dist ./dist
COPY --from=build /app/apps/user-service/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "\
  echo 'Running Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting app...'; \
  node dist/apps/user-service/main.js \
"]
