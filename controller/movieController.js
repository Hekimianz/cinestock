const db = require("../db/queries");

exports.getMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await db.getMovieById(id);
  console.log(movie);
  res.render("movie", { title: movie[0].title, movie: movie[0] });
};
