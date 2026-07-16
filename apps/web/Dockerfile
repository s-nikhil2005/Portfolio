# Base Image
FROM node:22-alpine

# Working directory
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@11.7.0 --activate

# Copy workspace files
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

# Copy web package.json
COPY apps/web/package.json apps/web/

# Copy shared packages
COPY packages packages/

# Install dependencies
RUN pnpm install

# Copy the remaining source code
COPY . .

# Build Next.js
RUN pnpm --filter web build

# Next.js default port
EXPOSE 3000

# Start Next.js
CMD ["pnpm", "--filter", "web", "start"]