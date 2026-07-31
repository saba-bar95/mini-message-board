import { Router } from "express";
import EmptyFields from "../errors/emptyFields.js";

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: messages, title: "Mini Messageboard" });
});

indexRouter.post("/new", (req, res) => {
  const { author, message } = req.body;

  if (!author?.trim() || !message?.trim()) {
    throw new EmptyFields();
  }

  messages.push({ text: message.trim(), user: author.trim(), added: new Date() });
  res.redirect("/");
});

export default indexRouter;
export { messages };
