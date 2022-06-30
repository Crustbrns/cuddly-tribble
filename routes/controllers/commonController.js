const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const Product = require('../../models/Product')

const secret = config.get('jwtSecret') || 3000

class commonController {
    async getRegisterPage(req, res) {
        const token = req.cookies.session_id
        if (token) {
            res.redirect('profile')
        }
        else {

            res.render('register', {
                title: 'Register',
                IsLogin: true
            })
        }
    }

    async getLoginPage(req, res) {
        const token = req.cookies.session_id
        if (token) {
            res.redirect('profile')
        }
        else {
            res.render('login', {
                title: 'Auth',
                IsLogin: true
            })
        }

    }

    async getProfilePage(req, res) {
        const token = req.cookies.session_id

        if (token) {
            const decodedData = jwt.verify(token, secret)
            let nickname = decodedData.username

            let username = decodedData.username
            const usercheck = await User.findOne({ username })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('profile', {
                        title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
                        IsStore: true,
                        nickname,
                        usercheck
                    })
                }
                else {
                    res.render('profile', {
                        title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
                        IsStore: true,
                        nickname
                    })
                }
            }
            else {
                res.render('profile', {
                    title: 'Лучший магазин семян марихуаны Coffeeshop.ua в Украине.',
                    IsStore: true,
                    nickname
                })
            }
        }
        else res.redirect('/login')
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

    async getAdminPage(req, res) {
        try {
            const token = req.cookies.session_id

            const decodedData = jwt.verify(token, secret)
            let username = decodedData.username

            const usercheck = await User.findOne({ username })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('admin', {
                        title: 'Adminpanel'
                    })
                }
                else {
                    res.redirect('/')
                }
            }
            else {
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }

    async getAdminCreatePage(req, res) {

        try {
            const token = req.cookies.session_id

            const decodedData = jwt.verify(token, secret)
            let username = decodedData.username

            const usercheck = await User.findOne({ username })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('admincreate', {
                        title: 'Adminpanel - Create'
                    })
                }
                else {
                    res.redirect('/login')
                }
            }
            else {
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }

    async getAdminUpdatePage(req, res) {

        try {
            const token = req.cookies.session_id
            const products = await Product.find({}).lean()

            const decodedData = jwt.verify(token, secret)
            let username = decodedData.username

            const usercheck = await User.findOne({ username })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('adminedit', {
                        title: 'Adminpanel - Update',
                        products
                    })
                }
                else {
                    res.redirect('/login')
                }
            }
            else {
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }

    async getAdminUpdateProductPage(req, res) {
        try {
            const token = req.cookies.session_id

            const { productId } = req.params
            var product = await Product.findById(productId).lean()

            const decodedData = jwt.verify(token, secret)
            let username = decodedData.username

            const usercheck = await User.findOne({ username })

            if (usercheck) {
                const required_role = "ADMIN"

                let hasAccess = false
                usercheck.role.forEach(x => {
                    if (required_role == x) {
                        hasAccess = true
                    }
                })

                if (hasAccess) {
                    res.render('editproduct', {
                        title: product.Title + ' - Update',
                        product,
                        productId
                    })
                }
                else {
                    res.redirect('/login')
                }
            }
            else {
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }
}

module.exports = new commonController()