const { Router } = require("express");
const movieRouter = Router();
const movieController = require("../controller/movieController.js");

movieRouter.get("/id/:id", movieController.getMovie);
movieRouter.post("/update/id/:id", movieController.updateMovie);
movieRouter.post("/delete/id/:id", movieController.deleteMovie);

module.exports = movieRouter;
