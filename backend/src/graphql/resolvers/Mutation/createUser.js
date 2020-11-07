const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server');
const createUser = async (root, args) => {

  const { password, ...otherFields } = args
  const username = args.username

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ ...otherFields, passwordHash, dateCreated: new Date() })

  const isNotUnique = await User.findOne({ username })

  if (!username || username.length <= 3) {
    throw new UserInputError("Käyttäjänimi on liian lyhyt (min 3 merkkiä)")
  }

  if (isNotUnique) {
    throw new UserInputError("Käyttäjänimi on varattu")
  }

  if (!password || password.length <= 6) {
    throw new UserInputError("Salasana on liian lyhyt (min 6 merkkiä)")
  }

  return user.save()
}

module.exports = createUser