import pool from "./pool.js";

// Fetch all messages, sorted newest first
export async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );
  return rows;
}

// Insert a new message into the database
export async function insertMessage(text, username) {
  const query =
    "INSERT INTO messages (text, username, permanent) VALUES ($1, $2, $3)";
  await pool.query(query, [text, username, false]);
}

// Optional: Replaces your JS pruneOldMessages function using pure SQL
export async function deleteOldMessages() {
  const query = `
    DELETE FROM messages 
    WHERE permanent = FALSE 
    AND added < NOW() - INTERVAL '24 hours'
  `;
  await pool.query(query);
}

// Fetch a single message by its database ID
export async function getMessageById(id) {
  const query = "SELECT * FROM messages WHERE id = $1";
  const { rows } = await pool.query(query, [id]);

  // rows[0] will be the message object if found, or undefined if not found
  return rows[0];
}
