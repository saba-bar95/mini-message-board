import { Router } from "express";
import { messages, pruneOldMessages } from "./indexRouter.js";
import MessageNotFound from "../errors/messageNotFound.js";

const messageRouter = Router();

messageRouter.get("/:id", (req, res) => {
  pruneOldMessages();
  const { id } = req.params;
  const message = messages[id - 1];

  if (!message) {
    throw new MessageNotFound(id);
  }
  res.render("message", { message, title: "Message Details" });
});

export default messageRouter;
