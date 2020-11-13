const User = require("../../../models/User")
const bcrypt = require("bcryptjs")
const { UserInputError } = require("apollo-server")
const createUser = async (root, args) => {

  const { password, ...otherFields } = args
  const username = args.username
  const usernameLowerCase = username.toLowerCase()
  const email = args.email

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ ...otherFields, usernameLowerCase, passwordHash, dateCreated: new Date() })

  const usernameIsNotUnique = await User.findOne({ usernameLowerCase }, { "_id": 1 })

  const emailIsNotUnique = await User.findOne({ email }, { "_id": 1 })

  if (username.length > 20) {
    throw new UserInputError("Käyttäjänimi on liian pitkä (max 20 merkkiä)")
  }

  if (!username || username.length < 3) {
    throw new UserInputError("Käyttäjänimi on liian lyhyt (min 3 merkkiä)")
  }

  if (!username || username.length > 20) {
    throw new UserInputError("Käyttäjänimi on liian pitkä (max 20 merkkiä)")
  }

  if (!/(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
    throw new UserInputError("Käytä vain sallittuja merkkejä käyttäjänimessä (A-Z, 0-9, _ ja .)")
  }

  if (usernameIsNotUnique) {
    throw new UserInputError("Käyttäjänimi on varattu")
  }

  if (!email) {
    throw new UserInputError("Sähköposti on pakollinen kenttä")
  }

  if (!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email)) {
    throw new UserInputError("Syötä oikea sähköposti")
  }

  if (emailIsNotUnique) {
    throw new UserInputError("Sähköposti on jo käytössä")
  }

  if (!password || password.length < 6) {
    throw new UserInputError("Salasana on liian lyhyt (min 6 merkkiä)")
  }

  return user.save()
}

module.exports = createUser