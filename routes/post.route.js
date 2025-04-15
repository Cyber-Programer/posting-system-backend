const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");
const postModel = require("../models/postmodel");

Router.get("/create/post", (req, res) => {
  res.render("createpost", { err: false });
});

// post method

Router.post("/create/post", async (req, res) => {
  const { title, content, image } = req.body;
  const token = req.cookies?.token;

  if (!token) {
    return res.render("createpost", { err: "You are not logein" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY).data;
    const user = await userModel.findOne({
      email: decoded.email,
      user: decoded.user,
    });

    if (!user) {
      return res.render("createpost", { err: "user not foud" });
    }

    // Check if the user already has a post
    const postExists = await postModel.findOne({ user: user._id });
    if (postExists) {
      console.log("first post");
      postExists.post.push({
        title: title,
        description: content,
        image: image,
      });
      user.posts.push(postExists.post[postExists.post.length - 1]._id);
      postExists.save();
      user.save();
      return res.render("createpost", { err: false });
    }
    const newPost = await postModel.create({
      user: user._id,
      post: [
        {
          title: title,
          description: content,
          image: image,
        },
      ],
    });
    if (newPost) {
      user.posts.push(newPost.post[newPost.post.length - 1]._id);
      await user.save();
    }

    if (!newPost) {
      return res.render("createpost", { err: newPost });
    } else {
      return res.render("createpost", { err: false });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.render("createpost", { err: error });
  }
});

module.exports = Router;
