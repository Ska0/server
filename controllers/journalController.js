const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalModel");

const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user._id });

  if (!journals) {
    res.status(400);
    throw new Error("Error getting journals");
  }

  res.status(200).json(journals);
});

const createJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.create({
    title: req.body.title,
    content: [],
    user: req.user.id,
  });

  res.status(200).json(journal);
});

const updateJournal = asyncHandler(async (req, res) => {
  const journals = await Journal.findById(req.params.id)
  
  if(!journals) {
    res.status(400)
    throw new Error('Journal not found')
  
  }

  
  
  //check for user already
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //make sure the logged in user matches the journals user
  if(journals.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  
  res.status(200).json(updatedJournal);
})

const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id)

  if(!journal) {
    res.status(400)
    throw new Error('Journal not found')

  }

  
  
  //check for user already
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //make sure the logged in user matches the journal user
  if(journal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  
  await Journal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal
};
