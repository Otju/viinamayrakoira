const updateAllDrinks = require("./updateAllDrinks")
const addReview = require("./addReview")
const createUser = require("./createUser")
const login = require("./login")
const deleteReview = require("./deleteReview")
const likeReview = require("./likeReview")

const Mutation = { updateAllDrinks, addReview, createUser, login, deleteReview, likeReview}

module.exports = Mutation