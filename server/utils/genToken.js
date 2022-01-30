const jwt = require('jwt-simple')
module.exports = (user) => jwt.encode(user, process.env.JWT_SECRET.trim())
