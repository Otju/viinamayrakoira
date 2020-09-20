const mongoose = require('mongoose')
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String
  },
  ean: String,
  productCode: String,
  link: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  percentage: {
    type: Number,
    required: true,
  },
  percentageIsGuess: Boolean,
  imageLink: String,
  category: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  store: {
    type: String,
    required: true
  },
  pricePerLitre: {
    type: Number,
    required: true
  },
  portionAmount: {
    type: Number,
    required: true
  },
  pricePerPortion: {
    type: Number,
    required: true
  },
  isInSelection: {
    type: Boolean,
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

schema.plugin(mongoose_fuzzy_searching, { fields: ["name", "ean", "productCode", "producer", "description", "store"] })

module.exports = mongoose.model("Drink", schema)