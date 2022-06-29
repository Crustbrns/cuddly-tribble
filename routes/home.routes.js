const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

const commonController = require('./controllers/commonController')

router.get('/register', commonController.getRegisterPage)
router.get('/login', commonController.getLoginPage)
router.get('/profile', commonController.getProfilePage)
router.get('/admin', commonController.getAdminPage)
router.get('/admin/create', commonController.getAdminCreatePage)
router.get('/admin/edit', commonController.getAdminUpdatePage)
router.get('/admin/edit/:productId', commonController.getAdminUpdateProductPage)


router.get('/', commonController.getIndex)
router.get('/product/:productId', commonController.getProductById)

module.exports = router