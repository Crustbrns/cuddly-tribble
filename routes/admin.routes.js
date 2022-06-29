const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

const adminController = require('./controllers/adminController')

router.post('/createproduct', adminController.createProduct)
router.get('/admin', adminController.getAdminPage)

module.exports = router