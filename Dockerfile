# ---------- Builder ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (don't run lifecycle scripts)
RUN npm ci --ignore-scripts

# Copy the entire project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build


# ---------- Production ----------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies (don't run lifecycle scripts)
RUN npm ci --omit=dev --ignore-scripts

# Copy the application from the builder
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]