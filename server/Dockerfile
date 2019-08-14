FROM python:3

# Set the working directory to /server
WORKDIR /server
# copy everything into the container at /server
COPY . .
# Make port 5000 available to the world outside this container
EXPOSE 5000
# install dependencies
RUN pip3 install -r requirements.txt
# Run the app when the container launches
CMD [ "python3", "./server.py" ]