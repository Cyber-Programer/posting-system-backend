const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
