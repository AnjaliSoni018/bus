# ========== Build Stage ==========
FROM node:22-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy root-level package files and Nx/TS configs (important for monorepos)
COPY package*.json ./
COPY nx.json tsconfig.base.json ./

# Copy only user-service specific files
COPY apps/user-service/package*.json ./apps/user-service/
COPY apps/user-service/tsconfig*.json ./apps/user-service/
COPY apps/user-service/prisma ./apps/user-service/prisma
COPY apps/user-service/src ./apps/user-service/src

# Copy shared libraries (if any, optional)
# COPY libs ./libs

# Install dependencies from root
RUN npm ci --include=dev --legacy-peer-deps

# Generate Prisma client for the service
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma

# Build the specific service
RUN npx nx build user-service

# ========== Production Stage ==========
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Copy only the build output and necessary files
COPY --from=build /app/dist/apps/user-service ./dist
COPY --from=build /app/apps/user-service/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3000

# Run Prisma migrations before starting app
ENTRYPOINT ["sh", "-c", "\
  echo 'Running Prisma migrations...'; \
  npx prisma migrate deploy --schema=./prisma/schema.prisma && \
  echo 'Migrations applied successfully! Starting app...'; \
  node dist/main.js \
"]
