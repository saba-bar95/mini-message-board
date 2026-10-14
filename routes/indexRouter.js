import { Router } from "express";
import EmptyFields from "../errors/emptyFields.js";
import * as db from "../db/queries.js";

const indexRouter = Router();

// GET Route: Fetch all messages from the database and render
indexRouter.get("/", async (req, res, next) => {
  try {
    // Optional: If you want to delete old non-permanent messages before fetching
    await db.deleteOldMessages();

    const messages = await db.getAllMessages();
    res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (err) {
    next(err);
  }
});

// POST Route: Validate and insert the new message into the database
indexRouter.post("/new", async (req, res, next) => {
  try {
    const { author, message } = req.body;

    if (!author?.trim() || !message?.trim()) {
      throw new EmptyFields();
    }

    // Insert into PostgreSQL instead of pushing to an array
    await db.insertMessage(message.trim(), author.trim());

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

export default indexRouter;
