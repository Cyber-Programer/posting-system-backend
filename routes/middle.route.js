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
    const decode = jwt.verify(token, process.env.JWT_KEY);
    // const userFound = await userModel.findOne({ _id: decode.token });
    const userFound = await userModel.findOne({user:decode.data.user})
    // console.log(userFound)
    if(!userFound){
      req.err = 'you need to login again'
      return next()
      // return res.redirect('/login',{err:"you need to login"})
    }
    return res.redirect("/profile");
  } catch (error) {
    req.err = error;
    return next();
  }
}

module.exports = { CkTokenValidation };
