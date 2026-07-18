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
# Extract only the packages needed to build the 'web' app
RUN turbo prune web --docker

# =========================================================
# Stage 3: Install dependencies and build
# =========================================================
FROM base AS builder
RUN apk add --no-cache libc6-compat
# Copy only package.json files from the pruned workspace to optimize layer caching
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the source code and build the web app
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter web build

# =========================================================
# Stage 4: Run-time production image
# =========================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root system user for safety
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build outputs (includes minimal node_modules)
COPY --from=builder /app/apps/web/.next/standalone ./
# Copy public static files
COPY --from=builder /app/apps/web/public ./apps/web/public
# Copy compiled CSS/JS static chunks
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

# Run the container under the non-root user
USER nextjs

EXPOSE 3000

# Start nextjs server directly (efficiently resolves OS signals)
CMD ["node", "apps/web/server.js"]