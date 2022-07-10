const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    content: {
      type: String,
      required: [true, "you must provide an entry"],
      minlength: [15, "Entry must be at least 15 characters"],
    },
    journal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Journal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
