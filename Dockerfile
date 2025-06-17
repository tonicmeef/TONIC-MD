FROM node:lts-buster

# Clone your GitHub repository into /root/tonic
RUN git clone https://github.com/tonicmeef/TONIC-MD /root/tonic

# Set working directory
WORKDIR /root/tonic

# Install dependencies and pm2 globally
RUN npm install && npm install -g pm2

# Expose the port your app listens on
EXPOSE 9090

# Start the app
CMD ["npm", "start"]
