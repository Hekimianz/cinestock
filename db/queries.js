const pool = require("./pool");

async function getAllMovies() {
  try {
    const { rows } = await pool.query(
      `SELECT movies.title, movies.image_url, movies.stock, suppliers.name AS supplier FROM movies
       INNER JOIN suppliers ON movies.supplier_id = suppliers.id;
      `
    );
    return rows;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
}

async function getMovieByName(name) {
  try {
    const { rows } = await pool.query(
      `SELECT movies.title, movies.image_url, movies.stock, suppliers.name AS supplier FROM movies
       INNER JOIN suppliers ON movies.supplier_id = suppliers.id
       WHERE movies.title ILIKE '%' || $1 || '%';
      `,
      [name]
    );
    return rows;
  } catch (err) {
    console.error("Error fetching movie:", err);
    return [];
  }
}

async function getAllTags() {
  try {
    const { rows } = await pool.query("SELECT name FROM tags ORDER BY name;");
    return rows;
  } catch (err) {
    console.error("Error fetching tag types:", err);
    return [];
  }
}
async function getFilteredMovies(title, tags) {
  try {
    let query = `
      SELECT DISTINCT movies.title, movies.image_url, movies.stock, suppliers.name AS supplier
      FROM movies
      INNER JOIN suppliers ON movies.supplier_id = suppliers.id
      LEFT JOIN movie_tags ON movies.id = movie_tags.movie_id
      LEFT JOIN tags ON movie_tags.tag_id = tags.id
    `;

    const conditions = [];
    const queryParams = [];

    if (title) {
      conditions.push("movies.title ILIKE $1");
      queryParams.push(`%${title}%`);
    }

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      conditions.push("tags.name = ANY($" + (queryParams.length + 1) + ")");
      queryParams.push(tagsArray);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const { rows } = await pool.query(query, queryParams);
    return rows;
  } catch (err) {
    console.error("Error fetching filtered movies.", err);
    return [];
  }
}

module.exports = {
  getAllMovies,
  getMovieByName,
  getAllTags,
  getFilteredMovies,
};
