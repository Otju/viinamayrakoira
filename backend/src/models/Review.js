const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  drink: {
    type: String,
    ref: "Drink"
  },
  taste: {
    type: Number,
    min: 0,
    max: 10
  },
  priceQualityRatio: {
    type: Number,
    min: 0,
    max: 10
  },
  comment: {
    type: String
  },
  user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
})

module.exports = mongoose.model("Review", schema)