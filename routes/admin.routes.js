const { Router } = require('express')
const router = Router()

const adminController = require('./controllers/adminController')

router.post('/createproduct', adminController.createProduct)

module.exports = router