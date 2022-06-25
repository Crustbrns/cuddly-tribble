const {Router} = require('express')
const Product = require('../models/Product')
const router = Router()

router.get('/', async (req, res) => {

    const products = await Product.find({})

    res.render('index', {
        title:'Store',
        IsStore: true,
        products
    })
})

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Adminpanel'
    })
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

router.post('/createproduct', async (req, res) =>{
    const product = new Product({
        title: req.body.title
    })

    await product.save()
    res.render('/')
})

module.exports = router