const { Router } = require('express')
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {

    const products = await Product.find({}).lean()

    console.log(products)

    res.render('index', {
        title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
        IsStore: true,
        products
    })
})

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Adminpanel'
    })

    if (adminroot = false) {
        res.redirect('/')
    }
})


router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Auth',
        IsLogin: true
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        IsLogin: true
    })
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
    var isHit = req.body.IsHit == true;
    var isInStock = req.body.IsInStock == true;

    console.log(req.body.ProdTitle)
    const product = new Product({
        Title: req.body.ProdTitle,
        Price: req.body.Price,
        Discount: req.body.Discount,
        ImageUrl: req.body.Imageuri,
        Description: req.body.Description,
        Type: req.body.Type,
        Genetics: req.body.Genetics,
        IsHit: isHit,
        IsInStock: isInStock
    })

    await product.save()
    res.redirect('/')
})

router.post('/createuser', async (req, res) => {
    const user = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        adminroot: true
    })

    await user.save()
    res.redirect('/')
})

module.exports = router