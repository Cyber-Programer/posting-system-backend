const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posting");
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
