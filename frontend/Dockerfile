# Stage 1: Build
FROM node:16-alpine AS build
WORKDIR /app
# Copy dependency definitions
COPY package.json ./
# Install dependencies
RUN npm install
# Copy the rest of your app code
COPY . .
# Build the app for production
RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:stable-alpine
# # Remove default Nginx static assets
# RUN rm -rf /usr/share/nginx/html/*
# # Copy built assets from previous stage
# COPY --from=build /app/build /usr/share/nginx/html
# # Expose port 80 to the outside
# EXPOSE 80
# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Stage 2: Development Mode (No Nginx)
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app /app
# Expose port 3000 (or whatever port your development server uses)
EXPOSE 8080
CMD ["npm", "start"]