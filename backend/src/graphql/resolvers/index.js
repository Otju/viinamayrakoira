const requireDir = require("require-dir")
const Query = requireDir("./Query")
const Mutation = requireDir("./Mutation")

const resolvers = { Query, Mutation }

module.exports = resolvers