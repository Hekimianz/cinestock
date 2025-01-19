const { Router } = require("express");
const movieRouter = Router();
const movieController = require("../controller/movieController.js");

movieRouter.get("/id/:id", movieController.getMovie);
movieRouter.post("/edit/id/:id", movieController.renderUpdateMovie);
movieRouter.post("/delete/id/:id", movieController.deleteMovie);
movieRouter.post("/update/:id", movieController.updateMovie);
movieRouter.get("/new", movieController.newMovieRender);
movieRouter.post("/new", movieController.newMoviePost);

module.exports = movieRouter;
