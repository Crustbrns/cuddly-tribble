const { Router } = require('express')
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const User = require('../models/User')
const router = Router()

const commonController = require('./commonController')

router.get('/register', commonController.getRegisterPage)
router.get('/login', commonController.getLoginPage)

router.get('/', commonController.getIndex)
router.get('/product/:productId', commonController.getProductById)

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Adminpanel'
    })

    if (adminroot = false) {
        res.redirect('/')
    }
})

router.get('/product/:productid', async (req, res) => {
    var product = await Product.findById(req.params.productid).lean()

    console.log(product)

    res.render('product', {
        title: product.Title,
        IsLogin: true,
        product
    })
})

router.post('/createproduct', async (req, res) => {

    const {Title, Price, Discount, ImageUrl, 
        Description, Type, Genetics, IsHit,
         IsInStock} = req.body

    var isHit = IsHit == true;
    var isInStock = IsInStock == true;

    console.log(req.body.ProdTitle)
    const product = new Product({
        Title: Title,
        Price: Price,
        Discount: Discount,
        ImageUrl: ImageUrl,
        Description: Description,
        Type: Type,
        Genetics: Genetics,
        IsHit: isHit,
        IsInStock: isInStock
    })

    await product.save()
    res.redirect('/')
})

module.exports = router