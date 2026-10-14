#! /usr/bin/env node
import dotenv from "dotenv";
import path from "path";
import { Client } from "pg";

// Tell dotenv to look one level up (../) for the .env file
dotenv.config({ path: path.join(import.meta.dirname, "../.env") });
const connectionString = process.env.DATABASE_URL;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  permanent BOOLEAN DEFAULT FALSE
);

INSERT INTO messages (text, username, permanent) 
VALUES 
  ('Hi there!', 'Amando', TRUE),
  ('Hello World!', 'Charles', TRUE);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
