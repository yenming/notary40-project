"use strict";

const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const routes = require("./routes");
const { currentUser } = require("./middleware/auth");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

app.use(helmet());
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(currentUser);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.render("error/404", { title: "Page Not Found" });
  }
  if (req.accepts("json")) {
    return res.json({ error: "Not Found" });
  }
  return res.type("txt").send("Not Found");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);

  res.status(status);
  if (req.accepts("html")) {
    return res.render("error/500", {
      title: "Server Error",
      message,
    });
  }
  if (req.accepts("json")) {
    return res.json({ error: message });
  }
  return res.type("txt").send(message);
});

module.exports = app;

