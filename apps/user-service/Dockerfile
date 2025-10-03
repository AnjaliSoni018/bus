# apps/user-service/Dockerfile

# ========== Build Stage ==========
FROM node:22-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files from user-service
COPY apps/user-service/package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy TypeScript config files
COPY apps/user-service/tsconfig*.json ./
COPY tsconfig.base.json ../../tsconfig.base.json

# Copy Prisma and source code
COPY apps/user-service/prisma ./prisma
COPY apps/user-service/src ./src

# Generate Prisma client
RUN npx prisma generate

# Transpile TypeScript to JavaScript
RUN npm run build

# ========== Production Stage ==========
FROM node:22-alpine AS prod

# Set working directory
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Expose port and start app
EXPOSE 3000
CMD ["node", "dist/main.js"]
