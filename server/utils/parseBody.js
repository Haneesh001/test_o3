const parseBody = (req, res, next) => {
  try {
    const parsedBody = JSON.parse(req.body.data)
    req.body = { ...parsedBody }
  } catch (error) {
    console.log(error.message)
  }
  next()
}

module.exports = { parseBody }
