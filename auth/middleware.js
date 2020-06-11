const { toData } = require("./jwt");
const User = require("../models").user;

const authMiddleware = async (req, res, next) => {
  try {
    // check if there is an authorization header.
    // cut the token out of there, somehow.
    const authHeader =
      req.headers.authorization && req.headers.authorization.split(" ");

    if (authHeader && authHeader[0] === "Bearer" && authHeader[1]) {
      // happy path

      const data = toData(authHeader[1]);
      console.log("decrypted token", data);

      const user = await User.findByPk(data.userId);

      req.user = user;

      next();
    } else {
      res.status(401).send("Wrong credentials or missing auth header");
    }

    // console.log("auth", authHeader);
  } catch (e) {
    console.log(e.message);
    res.status(401).send(e.message);
  }
};

module.exports = authMiddleware;
