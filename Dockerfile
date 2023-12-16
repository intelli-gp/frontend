FROM node:18.3.0-alpine3.14

WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Build the application
RUN npm run build

EXPOSE 8000

# Serve the application
CMD ["npm", "run", "preview"]
