const crypto = require('crypto')
async function getRandomKey() {
  const result = await crypto.randomBytes(16)
  return `${result.toString('hex')}.xlsx`
}
module.exports = getRandomKey
