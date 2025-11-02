# -----------------------------
# 🏗️ BUILDER STAGE
# -----------------------------
FROM node:18.20.0-slim AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies (including dev for build)
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the Vite app (output goes to /dist)
RUN npm run build


# -----------------------------
# 🚀 RUNNER STAGE (Nginx)
# -----------------------------
FROM nginx:alpine AS runner

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy your build
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy a custom nginx.conf (for SPA routing or caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
