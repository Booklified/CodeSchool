# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install

RUN npm install -g typescript

# Copy all project files
COPY . .
COPY .env .env

# Build the application
RUN pnpm run develop:client

# Expose the port used by the client
EXPOSE 8000

# Start the application in development mode
CMD ["pnpm", "run", "develop"]


