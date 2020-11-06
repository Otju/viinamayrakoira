const User = require('../../../models/User')
const bcrypt = require('bcryptjs')

const createUser = async (root, args) => {

  const { password, ...otherFields } = args

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ ...otherFields, passwordHash, dateCreated: new Date() })

  return user.save()
}

module.exports = createUser