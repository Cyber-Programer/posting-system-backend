const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");

async function CkTokenValidation(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    req.msg = "token not found";
    return next();
  }

  try {
    const decode = jwt.verify(token, "999");
    const userFound = await userModel.findOne({ _id: decode.token });

    return res.redirect("/profile");
  } catch (error) {
    req.err = error;
    return next();
  }
}

module.exports = { CkTokenValidation };
