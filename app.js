require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const homeRouter = require("./routes/homeRouter");
const manageRouter = require("./routes/manageRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", homeRouter);

app.use("/manage", manageRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
