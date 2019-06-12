#force kill whatever is running at the port
fuser -k 3000/tcp
#cd to the directory this file is in
DIRECTORY=$(dirname "$0")
cd "$DIRECTORY"

#Start the node server
nohup nodemon server.js &
