# base image
FROM node:10.16.2

# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Deploy the Smart Contract to Ropsten
CMD ["truffle", "deploy", "--network", "ropsten"]
# Run the app when the container launches
CMD ["npm", "start"]
