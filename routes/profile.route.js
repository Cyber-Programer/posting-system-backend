const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
// const postModel = require("../models/postmodel");

async function ckToken(req, res, next) {
  const token = req.cookies?.token;
  try {
      const data = jwt.verify(token, process.env.JWT_KEY).data;
      const userAvailable = await userModel.findOne({
        email: data.email,
        user: data.user,
      });
      if (!userAvailable) {
        console.log('account not found')
        return res.redirect("/login");
      }
      req.data = userAvailable;
      next()
    
  } catch (error) {
    if(error.name == 'JsonWebTokenError'){
        req.err = 'Token problem. Login again'
        return res.render("login", { err: "Try to unauthorize access. Login again" });
    }
  }
}

// GET -- profile
Router.get("/profile", ckToken, (req, res) => {
    if(req.data){
        return res.render('profile',{data:req.data})
    }
    res.render("profile");
});

module.exports = Router;
