const express = require('express')
const router = express.Router()

// homepage
router.get('/', (req, res) => {
  return res.redirect('/todos')
})

module.exports = router
