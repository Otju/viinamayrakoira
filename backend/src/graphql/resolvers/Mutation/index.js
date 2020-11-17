const updateAllDrinks = require("./updateAllDrinks")
const addReview = require("./addReview")
const createUser = require("./createUser")
const login = require("./login")
const deleteReview = require("./deleteReview")
const likeReview = require("./likeReview")
const report = require("./report")

const Mutation = { updateAllDrinks, addReview, createUser, login, deleteReview, likeReview, report}

module.exports = Mutation