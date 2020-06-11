const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("./jwt");
const User = require("../models").user;
const router = new Router();

router.post("/signup", async (req, res, next) => {
  try {
    // expect some params
    // validate if they are there
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send("Missing parameters for sign up");
    } else {
      // hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      console.log("passwords", password, hashedPassword);
      // create user.
      const user = await User.create({ name, email, password: hashedPassword });

      res.send(user);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // get credentials and i have to look for the user
    const { email, password } = req.body;
    // check if we get the params

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).send("User not found");
    } else {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log("passwords match?", passwordMatch);

      if (passwordMatch) {
        const token = toJWT({ userId: user.id });
        res.send({ token });
      } else {
        res.status(401).send("Wrong password");
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
