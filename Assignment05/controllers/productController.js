const pool = require('../utils/db')

exports.addProduct = (req, res) => {
  const { product_name, category, unit_price } = req.body
  pool.query(
    'INSERT INTO Products (product_name, category, unit_price) VALUES (?, ?, ?)',
    [product_name, category, unit_price],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(201).json({ id: results.insertId })
    }
  )
}

exports.getTotalRevenueByCategory = (req, res) => {
  pool.query(
    'SELECT category, SUM(total_amount) as revenue FROM Orders JOIN OrderItems ON Orders.id = OrderItems.order_id JOIN Products ON OrderItems.product_id = Products.id GROUP BY category',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results)
    }
  )
}

exports.getTotalItemsSoldByProduct = (req, res) => {
  pool.query(
    'SELECT product_name, SUM(quantity) as total_sold FROM OrderItems JOIN Products ON OrderItems.product_id = Products.id GROUP BY product_name',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results)
    }
  )
}
