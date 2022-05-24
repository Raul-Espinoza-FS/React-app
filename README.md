# React App
Web Frontend. Posts and Administration UI

# How to Develop

Install node 16
Copy .env.example to .env

Install node dependencies.
```$ npm install ```

Start the development server
```$ npm start ```

By default the app is listening in the 3000 port.

### Using docker

Build the dist folder
```$npm run build [-- --dev](for development)```

Fire up a container with composer.
```$ docker-compose up ```

By default the dockerized app is listening in the 8082 port.

# Features

### Routes
https://github.com/Raul-Espinoza-FS/React-app/blob/master/src/routes.js

### Guards
https://github.com/Raul-Espinoza-FS/React-app/blob/master/src/api/PrivateRoute.js

### API Calls
https://github.com/Raul-Espinoza-FS/React-app/blob/master/src/api/APIBase.js

### Views
https://github.com/Raul-Espinoza-FS/React-app/tree/master/src/views

### Layouts
https://github.com/Raul-Espinoza-FS/React-app/tree/master/src/layout

### Permissions Management
https://github.com/Raul-Espinoza-FS/React-app/blob/master/src/api/Settings.js

### Navigation
https://github.com/Raul-Espinoza-FS/React-app/blob/master/src/_nav.js