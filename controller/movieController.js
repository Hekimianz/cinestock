const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUpdate = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer or zero"),
];

exports.getMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await db.getMovieById(id);
  console.log(movie);
  res.render("movie", {
    title: movie[0].title,
    movie: movie[0],
    errors: [],
    errorMsg: "",
  });
};

exports.renderUpdateMovie = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => value === process.env.ADMIN_PASS)
    .withMessage("Incorrect password"),

  async (req, res) => {
    const errors = validationResult(req);

    const { id } = req.params;
    const movie = await db.getMovieById(id);

    if (!errors.isEmpty()) {
      return res.render("movie", {
        title: movie[0].title,
        movie: movie[0],
        errors: errors.array(),
        errorMsg: errors.array()[0].msg,
      });
    }
    const genres = await db.getAllGenres();
    const sections = await db.getAllSections();
    const suppliers = await db.getAllSuppliers();
    res.render("update", {
      title: "Update - " + movie[0].title,
      movie: movie[0],
      genres: genres,
      sections: sections,
      suppliers: suppliers,
      errorMsg: "",
    });
  },
];

exports.deleteMovie = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => value === process.env.ADMIN_PASS)
    .withMessage("Incorrect password"),

  async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const movie = await db.getMovieById(id);

    if (!errors.isEmpty()) {
      return res.render("movie", {
        title: movie[0].title,
        movie: movie[0],
        errors: errors.array(),
        errorMsg: errors.array()[0].msg,
      });
    }
    await db.deleteMovie(id);
    res.redirect("/manage");
  },
];

exports.updateMovie = [
  validateUpdate,
  async (req, res) => {
    const errors = validationResult(req);

    const movieId = req.params.id;
    const movieData = req.body;
    const movie = await db.getMovieById(movieId);
    const genres = await db.getAllGenres();
    const sections = await db.getAllSections();
    const suppliers = await db.getAllSuppliers();
    if (!errors.isEmpty()) {
      return res.render("update", {
        title: "Update - " + movie[0].title,
        movie: movie[0],
        genres: genres,
        sections: sections,
        suppliers: suppliers,
        errors: errors.array(),
        errorMsg: errors.array()[0].msg,
      });
    }

    try {
      await db.updateMovie(movieId, movieData);
      return res.redirect("/movie/id/" + movieId);
    } catch (err) {
      console.error("Failed to update movie", err);
      return res.render("update", {
        title: "Update - " + movie[0].title,
        movie: movie[0],
        genres: genres,
        sections: sections,
        suppliers: suppliers,
        errors: [{ msg: "Failed to update movie. Please try again." }],
      });
    }
  },
];

exports.newMovieRender = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    const sections = await db.getAllSections();
    const suppliers = await db.getAllSuppliers();
    const tags = await db.getAllTags();
    console.log(tags);
    res.render("new", {
      title: "New Movie",
      genres: genres,
      sections: sections,
      suppliers: suppliers,
      tags: tags,
    });
  } catch (err) {
    console.error("Error fetching details:", err);
  }
};

exports.newMoviePost = async (req, res) => {
  try {
    const movieData = req.body;
    console.log(req.body);
    const tags = Object.keys(movieData)
      .filter((key) => movieData[key] === "on")
      .map(Number);
    movieData.tags = tags;
    const result = await db.addMovie(movieData);
    res.redirect(`/movie/id/${result.id}`);
  } catch (err) {
    console.error("Failed to add movie:", err);
    res.status(500).send("Failed to add movie");
  }
};
