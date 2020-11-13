const Review = require("../../../models/Review")
const { AuthenticationError, ApolloError } = require("apollo-server")

const likeReview = async (root, args, context) => {

  const id = args.id

  if (!id) {
    throw new ApolloError("Missing parameters")
  }

  if (!context.currentUser) {
    throw new AuthenticationError("User not logged in")
  }

  const review = await Review.findById(id, { usersThatLiked: 1, likes: 1 })

  let { usersThatLiked, likes } = review

  if (usersThatLiked.find(userId => userId.toString() === id.toString() )) {
    usersThatLiked = usersThatLiked.filter(userId => userId.toString() !== id.toString())
    likes-- //usersThatLiked.length
  } else {
    usersThatLiked = usersThatLiked.concat(id)
    likes++
  }

  await review.update({ usersThatLiked, likes })

  return { id, likes }
}

module.exports = likeReview

