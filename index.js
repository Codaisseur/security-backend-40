const express = require("express");
const authRouter = require("./auth/router");
const authMiddleware = require("./auth/middleware");
const User = require("./models").user;
const PORT = 4000;

const app = express();
app.use(express.json()); // bodyParser

app.use("/auth", authRouter);

app.get("/users", authMiddleware, async (req, res, next) => {
  try {
    console.log("WHOS MAKING THE REQUEST?", req.user);
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log("server started!"));
