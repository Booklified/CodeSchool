# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# Copy all files
COPY . .

# Build the client
RUN pnpm run develop

# Expose port 8000
EXPOSE 8000

# Start the client
CMD ["pnpm", "run", "develop"]
