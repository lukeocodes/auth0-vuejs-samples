const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const app = express();

if (!process.env.VUE_APP_AUTH0_DOMAIN || !process.env.VUE_APP_AUTH0_CLIENTID) {
  throw "Make sure you have VUE_APP_AUTH0_DOMAIN and VUE_APP_AUTH0_CLIENTID in your .env file";
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.VUE_APP_AUTH0_CLIENTID,
  issuer: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/`,
  algorithm: ["RS256"]
});

app.get("/api/private", checkJwt, (req, res) => {
  res.send({
    msg: "Your ID token was successfully validated!"
  });
});

module.exports = app;
