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

  const currentUserId = context.currentUser._id

  const review = await Review.findById(id, { usersThatLiked: 1, likes: 1 })

  let { usersThatLiked } = review

  let unLiked = false
  if (usersThatLiked.find(userId => userId.toString() === currentUserId.toString())) {
    usersThatLiked = usersThatLiked.filter(userId => userId.toString() !== currentUserId.toString())
    unLiked = true
  } else {
    usersThatLiked = usersThatLiked.concat(currentUserId)
  }

  const likes = usersThatLiked.length

  await review.updateOne({ usersThatLiked, likes, unLiked })

  return { id, likes }
}

module.exports = likeReview

