const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");
const postModel = require("../models/postmodel");
const { CkTokenValidation } = require("./middle.route");

// GET -- create/user
Router.get("/create/user", CkTokenValidation, (req, res) => {
  if (req.err) {
    return res.render("createuser", { err: req.err });
  }
  res.render("createuser", { err: false });
});


// GET -- /user/allPost
Router.get("/:user/allPost", async (req, res) => {
  const { user } = req.params;
  const UserAvailable = await userModel.findOne({ user: user });
  if (!UserAvailable) {
    return res.status(400).json({ message: "Page Not Found" });
  }

  const usersPostGroup = await postModel.findOne({
    user: UserAvailable._id.toString(),
  });
  const allPostId = UserAvailable.posts;
  console.log(allPostId,usersPostGroup)
  if (allPostId.length == 0 || usersPostGroup.post == null) {
    return res.render("posts", {
      user,
      postFound: false,
    });
  }

  return res.render("posts", {
    user,
    postFound: true,
    posts: usersPostGroup.post,
  });
});

// post method
// ---------------------------------- \\

// POST -- /create/user
Router.post("/create/user", async (req, res) => {
  const { username, email, password, age } = req.body;
  const newUser = await userModel.create({
    user: username,
    email: email,
    password: await bcrypt.hash(password, 10),
    age: age,
    posts: [],
  });
  console.log("new user creating");
  if (!newUser) {
    return res.send({ err: true });
  } else {
    const token = jwt.sign(
      {
        data: {
          email: newUser.email,
          user: newUser.user,
        }
      },
      process.env.JWT_KEY
    );
    if (token) {
      res.cookie("token", token);
    }
    console.log("User Created");
    res.redirect("/create/post");
  }
});

module.exports = Router;
