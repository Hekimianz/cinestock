const { Router } = require("express");
const movieRouter = Router();
const movieController = require("../controller/movieController.js");

movieRouter.get("/id/:id", movieController.getMovie);

module.exports = movieRouter;
