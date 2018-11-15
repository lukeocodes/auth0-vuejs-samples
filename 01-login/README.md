# Scenario #2 - Calling a Backend API

This scenario demonstrates calling a backend API using the ID token provided during the authenticated flow. In this scenario, an [Express](https://expressjs.com/) server is started when running the project using `npm run dev`, and provides an API endpoint.

The endpoint requires an ID token to be provided in the `Authorization` header to be successful. In this case, the token is validated with the audience set to the Client ID of the Auth0 application, and an API entity is not required to exist for this to work.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and serves the Vue app, and starts the backend API server on port 3001

```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
