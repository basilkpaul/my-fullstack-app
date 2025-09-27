FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm cache clean --force && \
    npm ci --silent

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment for development
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Start the application
CMD ["npm", "start"]