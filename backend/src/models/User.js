const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  usernameLowerCase: {
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
  },
  dateCreated: {
    type: Date
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
})

module.exports = mongoose.model("User", schema)