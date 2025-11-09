"use strict";

module.exports = {
  index(req, res) {
    res.render("home", {
      title: "Init Project",
      user: res.locals.user || null,
    });
  },
};

