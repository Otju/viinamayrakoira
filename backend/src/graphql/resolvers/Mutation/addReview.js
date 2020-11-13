const Review = require("../../../models/Review")
const { UserInputError, AuthenticationError } = require("apollo-server")
const { updateDrinkFields } = require("../utils")

const addReview = async (root, args, context) => {

  if (!args.review || !args.review.taste || !args.review.priceQualityRatio) {
    throw new UserInputError("Täytä kaikki tarvittavat kentät")
  }
  if (!context.currentUser) {
    throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään")
  }
  const comment = args.review.comment
  if (comment && comment.length>1000) {
    throw new UserInputError("Kommentti on liian pitkä (max 1000 merkkiä)")
  }

  const currentUser = context.currentUser

  const newReview = { ...args.review, user: currentUser._id }

  const otherReviews = await Review.find({ drink: newReview.drink })

  let review
  let reviews

  const oldReview = otherReviews.find(review => review.user.toString() === currentUser._id.toString())

  if (oldReview) {
    await Review.updateOne({ _id: oldReview.id }, { taste: newReview.taste, priceQualityRatio: newReview.priceQualityRatio, comment: newReview.comment })
    review = { ...newReview, id: oldReview.id, _id: oldReview.id, drink: oldReview.drink }
    reviews = otherReviews.map(item => item.id === review.id ? review : item)
  } else {
    review = await (await Review.create(newReview)).toObject()
    review = { ...review, id: review._id, user: currentUser._id }
    reviews = otherReviews.concat(review)
  }

  const updatedDrinkFields = await updateDrinkFields(newReview.drink, reviews)

  return { ...updatedDrinkFields, review: { ...review, user: { id: review.user, username: currentUser.username } } }
}

module.exports = addReview

