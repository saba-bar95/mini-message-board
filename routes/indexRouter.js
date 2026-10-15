import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Filter } from "bad-words";
import ValidationError from "../errors/validationError.js";
import * as db from "../db/queries.js";

const indexRouter = Router();
const filter = new Filter();

indexRouter.get("/", async (req, res, next) => {
  try {
    await db.deleteOldMessages();
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (err) {
    next(err);
  }
});

const validateMessage = [
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Author must be between 1 and 50 characters")
    .custom((value) => {
      if (filter.isProfane(value)) {
        throw new Error("Author name contains inappropriate language.");
      }
      return true;
    })
    .escape(),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 300 })
    .withMessage("Message must be between 1 and 300 characters")
    .custom((value) => {
      if (filter.isProfane(value)) {
        throw new Error("Your message contains inappropriate language.");
      }
      return true;
    })
    .escape(),
];

indexRouter.post("/new", validateMessage, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // If validation fails, throw our custom ValidationError containing the errors array
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed", errors.array());
    }

    const { author, message } = req.body;
    await db.insertMessage(message, author);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

export default indexRouter;
