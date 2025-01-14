require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        stock INT NOT NULL,
        image_url VARCHAR(255),
        genre_id INT REFERENCES genres(id),
        section_id INT REFERENCES sections(id),
        supplier_id INT REFERENCES suppliers(id)
    );

    CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS movie_tags (
        movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
        tag_id INT REFERENCES tags(id) ON DELETE CASCADE
    );

    INSERT INTO genres (name)
    VALUES 
    ('Drama'),
    ('Action'),
    ('Sci-Fi'),
    ('Crime'),
    ('Feel Good'),
    ('Thriller'),
    ('Animation');

    INSERT INTO sections (name)
    VALUES 
    ('Classics'),
    ('Blockbusters'),
    ('Feel Good'),
    ('New Releases'),
    ('International'),
    ('Family');

    INSERT INTO suppliers (name)
    VALUES 
    ('Classic Films Ltd.'),
    ('Blockbuster Studios'),
    ('Dreamscape Distribution'),
    ('Tarantino Productions'),
    ('Mafia Films Co.'),
    ('Feel Good Films'),
    ('Cyber Films Ltd.'),
    ('Cosmic Studios'),
    ('Seoul Cinema Distribution'),
    ('Disney Films');

    INSERT INTO tags (name)
    VALUES 
    ('inspirational'),
    ('prison'),
    ('drama'),
    ('superhero'),
    ('action'),
    ('crime'),
    ('mind-bending'),
    ('sci-fi'),
    ('thriller'),
    ('nonlinear'),
    ('dark humor'),
    ('mafia'),
    ('family'),
    ('comedy-drama'),
    ('romance'),
    ('dystopian'),
    ('space'),
    ('emotional'),
    ('social commentary'),
    ('dark comedy'),
    ('animation'),
    ('musical');

    INSERT INTO movies (title, image_url, stock, genre_id, section_id, supplier_id)
    VALUES
    (
        'The Shawshank Redemption',
        'https://m.media-amazon.com/images/I/71715eBi1sL._AC_UF894,1000_QL80_.jpg',
        15,
        (SELECT id FROM genres WHERE name = 'Drama'),
        (SELECT id FROM sections WHERE name = 'Classics'),
        (SELECT id FROM suppliers WHERE name = 'Classic Films Ltd.')
    ),
    (
        'The Dark Knight',
        'https://m.media-amazon.com/images/I/81IfoBox2TL.jpg',
        8,
        (SELECT id FROM genres WHERE name = 'Action'),
        (SELECT id FROM sections WHERE name = 'Blockbusters'),
        (SELECT id FROM suppliers WHERE name = 'Blockbuster Studios')
    ),
    (
        'Inception',
        'https://m.media-amazon.com/images/I/71RotCbGTML._AC_UF894,1000_QL80_.jpg',
        12,
        (SELECT id FROM genres WHERE name = 'Sci-Fi'),
        (SELECT id FROM sections WHERE name = 'Blockbusters'),
        (SELECT id FROM suppliers WHERE name = 'Dreamscape Distribution')
    ),
    (
        'Pulp Fiction',
        'https://moviepostermexico.com/cdn/shop/products/pulp_fiction_ver2_xxlg_1995x.jpg?v=1579934456',
        5,
        (SELECT id FROM genres WHERE name = 'Crime'),
        (SELECT id FROM sections WHERE name = 'Classics'),
        (SELECT id FROM suppliers WHERE name = 'Tarantino Productions')
    ),
    (
        'The Godfather',
        'https://m.media-amazon.com/images/I/510L5ypQBdL._AC_UF894,1000_QL80_.jpg',
        7,
        (SELECT id FROM genres WHERE name = 'Crime'),
        (SELECT id FROM sections WHERE name = 'Classics'),
        (SELECT id FROM suppliers WHERE name = 'Mafia Films Co.')
    ),
    (
        'Forrest Gump',
        'https://moviepostermexico.com/cdn/shop/products/Forrest-Gump-movie_2445x.jpg?v=1594649732',
        10,
        (SELECT id FROM genres WHERE name = 'Drama'),
        (SELECT id FROM sections WHERE name = 'Feel Good'),
        (SELECT id FROM suppliers WHERE name = 'Feel Good Films')
    ),
    (
        'The Matrix',
        'https://moviepostermexico.com/cdn/shop/products/NEU_-_Matrix_2100x.jpg?v=1632238741',
        20,
        (SELECT id FROM genres WHERE name = 'Sci-Fi'),
        (SELECT id FROM sections WHERE name = 'Blockbusters'),
        (SELECT id FROM suppliers WHERE name = 'Cyber Films Ltd.')
    ),
    (
        'Interstellar',
        'https://moviepostermexico.com/cdn/shop/products/interstellar_ver5_xxlg_1920x.jpg?v=1571092130',
        9,
        (SELECT id FROM genres WHERE name = 'Sci-Fi'),
        (SELECT id FROM sections WHERE name = 'New Releases'),
        (SELECT id FROM suppliers WHERE name = 'Cosmic Studios')
    ),
    (
        'Parasite',
        'https://moviepostermexico.com/cdn/shop/products/parasite_xxlg_1024x1024@2x.jpg?v=1583159976',
        6,
        (SELECT id FROM genres WHERE name = 'Thriller'),
        (SELECT id FROM sections WHERE name = 'International'),
        (SELECT id FROM suppliers WHERE name = 'Seoul Cinema Distribution')
    ),
    (
        'The Lion King',
        'https://m.media-amazon.com/images/I/51dLLKYoQQL._AC_UF894,1000_QL80_.jpg',
        25,
        (SELECT id FROM genres WHERE name = 'Animation'),
        (SELECT id FROM sections WHERE name = 'Family'),
        (SELECT id FROM suppliers WHERE name = 'Disney Films')
    );

    -- The Shawshank Redemption
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'The Shawshank Redemption'),
        id
    FROM tags
    WHERE name IN ('inspirational', 'prison', 'drama');

    -- The Dark Knight
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'The Dark Knight'),
        id
    FROM tags
    WHERE name IN ('superhero', 'action', 'crime');

    -- Inception
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'Inception'),
        id
    FROM tags
    WHERE name IN ('mind-bending', 'sci-fi', 'thriller');

    -- Pulp Fiction
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
        id
    FROM tags
    WHERE name IN ('crime', 'nonlinear', 'dark humor');

    -- The Godfather
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'The Godfather'),
        id
    FROM tags
    WHERE name IN ('mafia', 'crime', 'family');

    -- Forrest Gump
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'Forrest Gump'),
        id
    FROM tags
    WHERE name IN ('inspirational', 'comedy-drama', 'romance');

    -- The Matrix
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'The Matrix'),
        id
    FROM tags
    WHERE name IN ('sci-fi', 'action', 'dystopian');

    -- Interstellar
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'Interstellar'),
        id
    FROM tags
    WHERE name IN ('sci-fi', 'space', 'emotional');

    -- Parasite
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'Parasite'),
        id
    FROM tags
    WHERE name IN ('thriller', 'social commentary', 'dark comedy');

    -- The Lion King
    INSERT INTO movie_tags (movie_id, tag_id)
    SELECT 
        (SELECT id FROM movies WHERE title = 'The Lion King'),
        id
    FROM tags
    WHERE name IN ('family', 'animation', 'musical');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    try {
        await client.connect();
        await client.query(SQL);
        console.log("done");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await client.end();
    }
}

main();
