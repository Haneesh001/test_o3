class Response {
  static json(success, data, message, total) {
    this.success = success
    this.data = data
    this.message = message
    this.total = total
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      total: this.total
    }
  }
}

module.exports = Response
