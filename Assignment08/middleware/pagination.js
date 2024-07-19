const pagination = (
  model,
  populateOptions = '',
  searchFields = [],
  specialSearchFields = {}
) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    let query = model.find()

    // Handle regular search parameters
    searchFields.forEach((field) => {
      if (req.query[field]) {
        query = query.where(field).regex(new RegExp(req.query[field], 'i')) // Case-insensitive search
      }
    })

    // Handle special search parameters
    const specialSearchPromises = Object.keys(specialSearchFields).map(
      async (field) => {
        if (req.query[field]) {
          const {
            model: specialModel,
            searchField,
            resultField,
          } = specialSearchFields[field]
          const specialQuery = {}
          specialQuery[searchField] = new RegExp(req.query[field], 'i')
          const specialResults = await specialModel
            .find(specialQuery)
            .select('_id')
            .exec()
          const ids = specialResults.map((result) => result._id)
          query = query.where(resultField).in(ids)
        }
      }
    )

    try {
      await Promise.all(specialSearchPromises)

      const count = await model.countDocuments(query).exec()
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

      results.results = await query
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
