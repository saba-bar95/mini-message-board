import { Router } from "express";
import { body, validationResult } from "express-validator";
import ValidationError from "../errors/validationError.js";
import * as db from "../db/queries.js";

const indexRouter = Router();

// GET Route: Fetch all messages
indexRouter.get("/", async (req, res, next) => {
  try {
    await db.deleteOldMessages();
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (err) {
    next(err);
  }
});

// Define validation and sanitization rules
const validateMessage = [
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Author must be between 1 and 50 characters")
    // Regex ensuring English alphabet, numbers, spaces, and common safe punctuation
    .matches(/^[A-Za-z0-9\s.,!'-]*$/)
    .withMessage(
      "Author must contain only English letters and standard characters",
    )
    .escape(), // Prevents XSS / script injection

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 300 })
    .withMessage("Message must be between 1 and 300 characters")
    .matches(/^[A-Za-z0-9\s.,!?'"-]*$/)
    .withMessage(
      "Message must contain only English letters and standard characters",
    )
    .custom((value) => {
      // Basic custom bad words filter example
      const badWords = ["badword1", "badword2", "spam"];
      const lowerCaseValue = value.toLowerCase();
      const containsBadWord = badWords.some((word) =>
        lowerCaseValue.includes(word),
      );
      if (containsBadWord) {
        throw new Error("Your message contains inappropriate language.");
      }
      return true;
    })
    .escape(), // Prevents XSS / script injection
];

// POST Route with Validation
indexRouter.post("/new", validateMessage, async (req, res, next) => {
  try {
    // Check if validation yielded any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Pass the validation errors to your custom error handler
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
