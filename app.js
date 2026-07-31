import express from "express";
import path from "path";
import indexRouter from "./routes/indexRouter.js";
import newRouter from "./routes/newRouter.js";
import messageRouter from "./routes/messageRouter.js";
import PageNotFound from "./errors/pageNotFound.js";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();
const viewsPath = path.join(__dirname, "views");

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newRouter);
app.use("/message", messageRouter);

// Catch unknown routes and forward to the error handler
app.use((req, res, next) => {
  next(new PageNotFound(req.originalUrl));
});

// Must have 4 args — Express treats this as the error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).render("error", {
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
