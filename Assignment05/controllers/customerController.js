const pool = require('../utils/db')

exports.signup = (req, res) => {
  const { first_name, last_name, email, phone } = req.body
  pool.query(
    'INSERT INTO Customers (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
    [first_name, last_name, email, phone],
    (error, results) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
      }
      pool.query(
        'SELECT * FROM Customers WHERE id = ?',
        [results.insertId],
        (error, rows) => {
          if (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
          }
          res.status(201).json(rows[0])
        }
      )
    }
  )
}

exports.login = (req, res) => {
  const { email, phone } = req.body
  pool.query(
    'SELECT * FROM Customers WHERE email = ? AND phone = ?',
    [email, phone],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (results.length > 0) {
        res.status(200).json(results[0])
      } else {
        res.status(401).json({ error: 'Invalid credentials' })
      }
    }
  )
}
