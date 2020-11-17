const { UserInputError } = require("apollo-server")
const sgMail = require("@sendgrid/mail")

const report = async (root, args) => {

  if (!args) {
    throw new UserInputError("Täytä kaikki tarvittavat kentät")
  }

  const { subject, content } = args

  if (!subject || !content) {
    throw new UserInputError("Täytä kaikki tarvittavat kentät")
  }

  sgMail.setApiKey(process.env.SGMAIL_TOKEN)
  const msg = {
    from: "reports@viinamayrakoira.fi",
    to: "reports@viinamayrakoira.fi",
    subject: `Viinamayrakoira.fi, ${subject}`,
    text: content,
  }
  sgMail
    .send(msg)
    .catch((error) => {
      console.error(error)
    })
}

module.exports = report
