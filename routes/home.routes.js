const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

const commonController = require('./controllers/commonController')

router.get('/register', commonController.getRegisterPage)
router.get('/login', commonController.getLoginPage)
router.get('/profile', commonController.getProfilePage)
router.get('/admin', commonController.getAdminPage)

router.get('/', commonController.getIndex)
router.get('/product/:productId', commonController.getProductById)

module.exports = router