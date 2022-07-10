const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ journal: req.journal._id });

  if (!entries) {
    res.status(400);
    throw new Error("Error getting entries");
  }

  res.status(200).json(entries);
});

const createEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.create({
    title: req.body.title,
    content: req.body.content,
    journal: req.journal._id,
  });

  res.status(200).json(entry);
});

const updateEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(400);
    throw new Error("Entry not found");
  }

  //make sure the journal matches the users journal
  if (entry.journal.toString() !== req.journal._id.toString()) {
    res.status(401);
    throw new Error("You cannot edit this entry");
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEntry);
});

const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(400);
    throw new Error("Entry not found");
  }

  if (entry.journal.toString() !== req.journal._id.toString()) {
    res.status(401);
    throw new Error("You cannot delete this entry");
  }

  const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedEntry);
});

module.exports = {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
};
