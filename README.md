
# TODO-LIST APPLICATION
Runs in Nodejs for server and React native for client

## Setting up the server
### Install nodejs 18.13.0

If using node version manager, execute this command:
```
nvm install 18.13.0
nvm use 18
```
If not using node version manager, download using this [link](https://nodejs.org/en/download/releases/)

### Install mysql database
You can download mysql in this [link](https://www.mysql.com/downloads/)

** Dont forget to create a database for this application

### Install yarn and install dependencies

To install yarn - package manager
```
npm install -g yarn
```
To install project dependencies
```
cd <path-to-project>
yarn install
```

### Update environment variable setup
Edit .env file and update the app settings, mysql settings and security settings

### Run the server
To run the server
```
    npm run start
```
To check for lint errors, and auto-fix if possible
```
    npm run lintfix
```
To run test scripts
```
    npm run test
```

## Setting up the react-native client

In a new terminal go to the client folder
```
cd <path-to-project>/client
```

### Install dependencies
Install expo
```
npm install -g expo-cli
```
To install project dependencies
```
yarn install
```

### Update config
Update the config file in `client/app/config/settings`
Set the baseUrl to the url of the nodejs application

### Run the client application

To run on web
```
npm run web
```

To run on ios simulator
```
npm run ios
```

To run on android simulator
```
npm run android
```

If you encounter digital-envelope error you may need to set back to legacy

For windows
```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```
For linux/mac
```
export NODE_OPTIONS=--openssl-legacy-provider
```