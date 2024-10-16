# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install -g pnpm && pnpm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy all files
COPY . .

# Build the application
RUN pnpm run develop

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "develop"]
