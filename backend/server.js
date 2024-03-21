const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const { logger } = require("./middleware/logger");
dotenv.config();
const port = process.env.PORT;

app.use(logger);
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Message: "Error Page Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});


app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
