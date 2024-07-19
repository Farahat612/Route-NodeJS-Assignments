const pagination = (model, populateOptions = '') => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    try {
      const count = await model.countDocuments().exec()
      if (endIndex < count) {
        results.next = {
          page: page + 1,
          limit: limit,
        }
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        }
      }

      results.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .populate(populateOptions)
        .exec()
      res.paginatedResults = results
      next()
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default pagination