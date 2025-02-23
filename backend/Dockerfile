FROM node:16-alpine
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the application code
COPY . .
# Compile TypeScript to JavaScript (assumes you have a build script)
RUN npm run build
# Expose the port your Node.js app runs on (e.g., 3000)
EXPOSE 3000
# Start the server (adjust the command as needed)
CMD ["npm", "start"]
