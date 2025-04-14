const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post : [
    {
        title: {type: String,required: true},
        description: {type: String,required: true},
        image: {type: String},
        likes: {type: Number, default: 0},
        date: {
            type: Date,
            default: Date.now
        },
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
