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

# Create uploads directory with proper permissions
RUN mkdir -p public/uploads

# Copy package files
COPY package*.json ./

# Install production dependencies (don't run lifecycle scripts)
RUN npm ci --omit=dev --ignore-scripts

# Copy only necessary files from builder (avoid overwriting node_modules)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "start"]