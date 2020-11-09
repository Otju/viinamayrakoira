const mongoose = require("mongoose")

const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [validateEmail, "invalid email"]
  },
  dateCreated: {
    type: Date
  },
})

module.exports = mongoose.model("User", schema)