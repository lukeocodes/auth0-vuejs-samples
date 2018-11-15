# Scenario #3 - Calling an External API

This scenario is very similar to Scenario 2, in that it demonstrates making an API call. For this scenario, an additional endpoint has been included that requires the bearer token to be an access token (as provided during the authentication flow), and is validated with the audience set to the identifier of your API as set up in the Auth0 dashboard.

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
