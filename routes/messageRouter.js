import { Router } from "express";
import MessageNotFound from "../errors/messageNotFound.js";
import * as db from "../db/queries.js";

const messageRouter = Router();

messageRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Fetch the specific message from PostgreSQL by its ID
    const message = await db.getMessageById(id);

    if (!message) {
      throw new MessageNotFound(id);
    }

    res.render("message", { message, title: "Message Details" });
  } catch (err) {
    next(err);
  }
});

export default messageRouter;
