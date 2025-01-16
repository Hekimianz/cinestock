const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

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

exports.updateMovie = [
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

    res.redirect(`/manage`);
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
    console.log("Deleted movie");
    res.redirect("/manage");
  },
];
