require("dotenv").config();
const { Client } = require("pg");

const SQL = `
  INSERT INTO tags (name)
  VALUES 
('mystery'),
('adventure'),
('romantic-comedy'),
('psychological'),
('historical'),
('experimental'),
('coming-of-age'),
('feel-good'),
('biographical'),
('noir');



`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Typically needed for cloud databases like Heroku
    },
  });

  try {
    // Connecting to the database
    await client.connect();

    // Execute the SQL query
    await client.query(SQL);

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Ensure the connection is closed regardless of success or failure
    await client.end();
  }
}

main();
