const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
const { CkTokenValidation } = require("./middle.route");

Router.get("/login", CkTokenValidation, (req, res) => {
  if (req.err) {
    return res.render("login", { err: req.err });
  }
  res.render("login", { err: false });
});

// post method
Router.post("/login", CkTokenValidation, async (req, res) => {
  const { user, password } = req.body;
  console.log(user, password);
  const userAvailable = await userModel.findOne({ user: user });
  if (!userAvailable) {
    return res.render("login", { err: "user not found" });
  } else {
    const decodePassword = await bcrypt.compare(
      password,
      userAvailable.password
    );
    if (!decodePassword) {
      return res.render("login", { err: "user not found" });
    }else{
      const token = jwt.sign({
        data: {
          email: userAvailable.email,
          user: userAvailable.user,
        }
      },process.env.JWT_KEY);
      res.cookie("token",token)
      res.redirect('/create/post')
    }
  }
});
module.exports = Router;
