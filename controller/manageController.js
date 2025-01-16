const db = require("../db/queries");

exports.manageGetAll = async (req, res) => {
  const movies = await db.getAllMovies();
  const tags = await db.getAllTags();

  res.render("manage", {
    title: "CineStock - Inventory",
    movies: movies,
    searched: false,
    movieSearched: "",
    tags: tags,
    selectedTags: tags || [],
  });
};

exports.manageGetMovieByName = async (req, res) => {
  const { title } = req.query;
  const movies = await db.getMovieByName(title);
  const tags = await db.getAllTags();
  res.render("manage", {
    title: "CineStock - Inventory",
    movies: movies,
    searched: !!title,
    movieSearched: title,
    tags: tags,
    selectedTags: tags || [],
  });
};

exports.manageGetFiltered = async (req, res) => {
  const { title, tags } = req.query;

  const movies = await db.getFilteredMovies(title, tags);
  const allTags = await db.getAllTags();

  res.render("manage", {
    title: "CineStock - Inventory",
    movies: movies,
    searched: !!title,
    movieSearched: title || "",
    tags: allTags,
    selectedTags: tags || [],
  });
};
