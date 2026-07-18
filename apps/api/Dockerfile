# =========================================================
# Stage 1: Build base & dependencies
# =========================================================
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.7.0 --activate

# =========================================================
# Stage 2: Prune the workspace using Turbo CLI
# =========================================================
FROM base AS pruner
RUN npm install -g turbo
COPY . .
# Extract only the packages needed to build the 'api' app
RUN turbo prune api --docker

# =========================================================
# Stage 3: Install dependencies and build
# =========================================================
FROM base AS builder
RUN apk add --no-cache libc6-compat
# Copy pruned package.jsons for layer caching
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build the api app
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter api build

# Deploy production dependencies for api (prunes devDependencies and extracts workspace packages)
RUN pnpm --filter api --prod deploy --legacy /app/deployed-api

# =========================================================
# Stage 4: Clean runner runtime image
# =========================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create a non-root system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy the deployed production bundle
COPY --from=builder /app/deployed-api ./
# Copy compiled files from builder stage
COPY --from=builder /app/apps/api/dist ./dist

# Run as non-root user
USER expressjs

EXPOSE 3001

# Run directly using node
CMD ["node", "dist/index.js"]