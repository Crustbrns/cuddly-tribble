const { Router } = require('express')
const router = Router()

const adminController = require('./controllers/adminController')

router.post('/createproduct', adminController.createProduct)
router.post('/editproduct/:productId', adminController.updateProductById)
router.post('/deleteproduct/:productId', adminController.deleteProductById)

module.exports = router