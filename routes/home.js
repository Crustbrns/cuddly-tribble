const { Router } = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {

    const products = await Product.find({}).lean()
    const users = await User.find({}).lean()

    res.render('index', {
        title: 'Store',
        IsStore: true,
        products,
        users
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

router.get('/product/:productname', (req, res) => {
    
    var productName = req.params.productname
    const product = Product.findOne({title:productName}, function(err,obj) { console.log(obj); })

    res.render('product', {
        title: '',
        IsLogin: true,
        product
    })
})

router.post('/createproduct', async (req, res) => {
    const product = new Product({
        title: req.body.title
    })

    await product.save()
    res.render('/')
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