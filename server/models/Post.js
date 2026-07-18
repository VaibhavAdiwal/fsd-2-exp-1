const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    platforms: {
      type: [String],
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);