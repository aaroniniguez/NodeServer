# Node express server for quick website/web application setup (serves both api endpoints and client js)

1. Contains REST API Example 
2. Has a catch all requests to point to the client bundle js file created from a bundle (webpack)

```
app.use(express.static(__dirname+"/../public"));
```

To Install Node on a AWS Linux 2 AMI
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
```
To Install:
npm install

To Run
npm run start

## WARNING
exposes .env for demonstration so be sure to gitignore when developing
