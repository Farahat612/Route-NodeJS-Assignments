const pool = require('../utils/db')

// Create order
exports.createOrder = (req, res) => {
  const { customer_id, order_date, order_items } = req.body

  // Validate and fetch product prices
  const productIds = order_items.map((item) => item.productid)
  pool.query(
    'SELECT id, unit_price FROM Products WHERE id IN (?)',
    [productIds],
    (error, productResults) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }

      // Map product prices by product id
      const productPrices = {}
      productResults.forEach((product) => {
        productPrices[product.id] = product.unit_price
      })

      // Calculate total amount and prepare order items
      let total_amount = 0
      const items = order_items.map((item) => {
        const unit_price = productPrices[item.productid]
        if (unit_price === undefined) {
          return res
            .status(400)
            .json({ error: `Product with id ${item.productid} does not exist` })
        }
        total_amount += item.quantity * unit_price
        return [item.productid, item.quantity, unit_price]
      })

      // Insert order
      pool.query(
        'INSERT INTO Orders (customer_id, order_date, total_amount) VALUES (?, ?, ?)',
        [customer_id, order_date, total_amount],
        (error, results) => {
          if (error) {
            return res.status(500).json({ error: error.message })
          }
          const orderId = results.insertId
          const orderItems = items.map((item) => [
            orderId,
            item[0],
            item[1],
            item[2],
          ])
          pool.query(
            'INSERT INTO OrderItems (order_id, product_id, quantity, unit_price) VALUES ?',
            [orderItems],
            (error, results) => {
              if (error) {
                return res.status(500).json({ error: error.message })
              }
              pool.query(
                'SELECT * FROM Orders WHERE id = ?',
                [orderId],
                (error, rows) => {
                  if (error) {
                    return res.status(500).json({ error: error.message })
                  }
                  const order = rows[0]
                  pool.query(
                    'SELECT * FROM OrderItems WHERE order_id = ?',
                    [orderId],
                    (error, rows) => {
                      if (error) {
                        return res.status(500).json({ error: error.message })
                      }
                      order.items = rows
                      res.status(201).json(order)
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  )
}

// Calculate the average order value
exports.getAverageOrderValue = (req, res) => {
  pool.query(
    'SELECT AVG(total_amount) as average_order_value FROM Orders',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results[0])
    }
  )
}

// List all customers who have not made any orders
exports.getCustomersWithNoOrders = (req, res) => {
  pool.query(
    'SELECT * FROM Customers WHERE id NOT IN (SELECT DISTINCT customer_id FROM Orders)',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results)
    }
  )
}

// Find the customer who has purchased the most items in total
exports.getCustomerWithMostItems = (req, res) => {
  pool.query(
    'SELECT customer_id, SUM(quantity) as total_items FROM Orders JOIN OrderItems ON Orders.id = OrderItems.order_id GROUP BY customer_id ORDER BY total_items DESC LIMIT 1',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results[0])
    }
  )
}

// List the top 10 customers who have spent the most money
exports.getTopCustomersBySpending = (req, res) => {
  pool.query(
    'SELECT customer_id, SUM(total_amount) as total_spent FROM Orders GROUP BY customer_id ORDER BY total_spent DESC LIMIT 10',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results)
    }
  )
}

// List all customers who have made at least 5 orders
exports.getCustomersWithAtLeastFiveOrders = (req, res) => {
  pool.query(
    'SELECT customer_id, COUNT(*) as order_count FROM Orders GROUP BY customer_id HAVING order_count >= 5',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results)
    }
  )
}

// Find the percentage of customers who have made more than one order
exports.getPercentageOfRepeatCustomers = (req, res) => {
  pool.query(
    'SELECT (SELECT COUNT(DISTINCT customer_id) FROM Orders) as total_customers, (SELECT COUNT(*) FROM (SELECT customer_id FROM Orders GROUP BY customer_id HAVING COUNT(*) > 1) as repeat_customers) as repeat_customers',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      const { total_customers, repeat_customers } = results[0]
      const percentage = (repeat_customers / total_customers) * 100
      res.status(200).json({ percentage })
    }
  )
}

// Find the customer who has made the earliest order
exports.getCustomerWithEarliestOrder = (req, res) => {
  pool.query(
    'SELECT customer_id, MIN(order_date) as earliest_order FROM Orders GROUP BY customer_id ORDER BY earliest_order ASC LIMIT 1',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      res.status(200).json(results[0])
    }
  )
}
