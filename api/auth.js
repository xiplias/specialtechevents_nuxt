const express = require("express");
const app = express();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://borre.eu.auth0.com/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://borre.eu.auth0.com/`,
  algorithms: ["RS256"]
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = {
  path: "/api/auth",
  handler: app
};
