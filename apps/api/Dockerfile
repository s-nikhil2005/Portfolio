# Use Node.js 22 on Alpine Linux
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Enable pnpm through Corepack
RUN corepack enable && corepack prepare pnpm@11.7.0 --activate

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY apps/api/package.json apps/api/
COPY packages packages/



# Install all workspace dependencies
RUN pnpm install

# Copy the entire monorepo
COPY . .

# Build only the API package
RUN pnpm --filter api build

# The API listens on port 5000
EXPOSE 3001

# Start the API
CMD ["pnpm", "--filter", "api", "start"]