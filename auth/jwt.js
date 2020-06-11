const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" }); // (data (userId) + time of creation + validity) * secret
}

function toData(token) {
  return jwt.verify(token, secret); // if token valid => data || if invalid => throw an error.
}

module.exports = { toJWT, toData };
