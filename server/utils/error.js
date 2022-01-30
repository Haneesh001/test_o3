const withError = async (fn) => {
  let error = null
  let result = null

  try {
    result = await fn()
  } catch (e) {
    error = e.detail || e.message
  }

  return [error, result]
}

module.exports = withError
