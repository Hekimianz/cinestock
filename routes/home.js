const { Router } = require("express");
const homeRouter = Router();

homeRouter.get("/", (req, res) => res.render("home", { title: "CineStock" }));

module.exports = homeRouter;
