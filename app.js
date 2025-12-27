"use strict";

const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const routes = require("./routes");
const aboutRoutes = require("./routes/about");
const blogRoutes = require("./routes/blog");
const departmentRoutes = require("./routes/department");
const docRoutes = require("./routes/doc");
const payRoutes = require("./routes/pay");
const contactRoutes = require("./routes/contact");
const linkRoutes = require("./routes/link");



const { currentUser } = require("./middleware/auth");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://code.jquery.com",
          "https://cdn.jsdelivr.net",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
        ],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
        ],
      },
    },
  })
);
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(currentUser);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/about", aboutRoutes);
app.use("/blog", blogRoutes);
app.use("/department", departmentRoutes);
app.use("/doc", docRoutes);
app.use("/pay", payRoutes);
app.use("/contact", contactRoutes);
app.use("/link", linkRoutes);




app.use((req, res, next) => {
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

