import { Router } from "express";
import EmptyFields from "../errors/emptyFields.js";

const indexRouter = Router();

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    permanent: true,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    permanent: true,
  },
];

function pruneOldMessages() {
  const cutoff = Date.now() - MAX_AGE_MS;
  messages.splice(
    0,
    messages.length,
    ...messages.filter(
      (message) => message.permanent || message.added.getTime() >= cutoff,
    ),
  );
}

indexRouter.get("/", (req, res) => {
  pruneOldMessages();
  res.render("index", { messages: messages, title: "Mini Messageboard" });
});

indexRouter.post("/new", (req, res) => {
  const { author, message } = req.body;

  if (!author?.trim() || !message?.trim()) {
    throw new EmptyFields();
  }

  pruneOldMessages();
  messages.push({ text: message.trim(), user: author.trim(), added: new Date() });
  res.redirect("/");
});

export default indexRouter;
export { messages, pruneOldMessages };
