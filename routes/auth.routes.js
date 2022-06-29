const { Router } = require('express')
const config = require('config')
const router = Router()
const authcontroller = require('./authController')
const {check} = require('express-validator')

const AuthMiddleWare = require('../middleware/authMiddleware')

router.post('/registration', [
    check('username', "Username must be great than 5 or less than 15").isLength({min:5, max: 15}),
    check('password', "Password must be great than 5 or less than 20").isLength({min:5, max: 20})
], authcontroller.reg)

router.post('/login', authcontroller.login)
router.get('/users', AuthMiddleWare, authcontroller.getUsers)

// /api/auth/register
// router.post('/auth/register',
//     [
//         check('login', 'Incorrect login').isLength({ min: 5, max: 18 }),
//         check('email', 'Incorrect mail').isEmail(),
//         check('password', 'Password is too short or too long').isLength({ min: 6, max: 20 })
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req)

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Registration Errors'
//                 }).redirect('/')
//             }
//             else if (req.body.password != req.body.confirmpassword) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Passwords must be the same'
//                 })
//             }

//             const { email, login, password } = req.body

//             const emailExistence = await User.findOne({ email })
//             if (emailExistence) {
//                 return res.status(400).json({ message: 'User with the same email has already been created' })
//             }

//             const loginExistence = await User.findOne({ login })
//             if (loginExistence) {
//                 return res.status(400).json({ message: 'User with the same login has already been created' })
//             }

//             const hashPassword = await bcrypt.hash(password, 'password')
//             const user = new User({ login, email, password: hashPassword, adminroot: false })

//             await user.save()

//             res.status(201).json({ message: 'User has been created' })
//             // res.redirect('/')
//         }
//         catch (e) {
//             res.status(500).json({ message: 'Something went wrong, try again' }).redirect('/')
//             // res.redirect('/')
//         }
//     })

// // /api/auth/login
// router.post('/auth/logins',
//     [
//         check('login', 'Enter login').exists(),
//         check('password', 'Enter password').exists()
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req)

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Incorrect login\' data'
//                 })
//             }

//             const user = await User.findOne({ login })
//             if (!user) {
//                 return res.status(400).json({ message: 'User has not found' })
//             }

//             const passIsMatch = await bcrypt.compare(password, user.password)

//             if (!passIsMatch) {
//                 return res.status(400).json({ message: 'Incorrect password, try again' })
//             }

//             const token = jwt.sign(
//                 { userId: user.id },
//                 config.get('jwtSecret'),
//                 { expiresIn: '1h' }
//             )

//             res.status(200).json({ token: token, userId: user.id })

//         } catch (e) {
//             res.status(500).json({ message: 'Something went wrong, try again' })
//         }
//     })

module.exports = router