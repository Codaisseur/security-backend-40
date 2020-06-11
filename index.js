const express = require("express");
const PORT = 4000;

const app = express();
app.use(express.json()); // bodyParser

app.listen(PORT, () => console.log("server started!"));
