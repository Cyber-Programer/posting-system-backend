const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
const { CkTokenValidation } = require("./middle.route");

Router.get("/login", CkTokenValidation, (req, res) => {
  if(req.err){
    return res.render("login",{err:req.err})
  }
  res.render("login", { err: false });
});

// post method
Router.post("/login", CkTokenValidation, async (req, res) => {
  const { username, password } = req.body;
  const userAvailable = await userModel.findOne({ user: username });
  if (!userAvailable) {
    return res.render("login", { err: "user not found" });
  }
});
module.exports = Router;
