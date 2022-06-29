const Product = require('../../models/Product')

class commonController {
    async getRegisterPage(req, res) {
        res.render('register', {
            title: 'Register',
            IsLogin: true
        })
    }

    async getLoginPage(req, res) {
        const token = req.cookies.session_id
        if(token){
            res.redirect('profile')
        }
        else{
            res.render('login', {
                title: 'Auth',
                IsLogin: true
            })
        }

    }

    async getProfilePage(req, res) {
        const token = req.cookies.session_id
        
        if(token){
            res.render('profile', {
                title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
                IsStore: true
            })
        }
    }

    async getIndex(req, res) {
        const products = await Product.find({}).lean()

        res.render('index', {
            title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
            IsStore: true,
            products
        })
    }

    async getProductById(req, res) {
        const { productId } = req.params
        var product = await Product.findById(productId).lean()

        res.render('product', {
            title: product.Title,
            IsLogin: true,
            product
        })
    }
}

module.exports = new commonController()