# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# FROM node:20-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/dist ./dist
# COPY package.json package-lock.json ./
# RUN npm ci --production
# EXPOSE 3333
# CMD ["node", "dist/main.js"]
