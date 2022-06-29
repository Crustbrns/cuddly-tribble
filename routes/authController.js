const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator')
const { jwtSecret } = require('config')

const generateToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }

    return jwt.sign(payload, jwtSecret, {expiresIn: "12h"})
}

class authController {
    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Registration errors found", errors })
            }

            const { username, password, passwordConfirm } = req.body
            const usercheck = await User.findOne({ username })

            if (usercheck) {
                return res.status(400).json({ message: 'User has been already created' })
            }

            if(password != passwordConfirm){
                return res.status(400).json({ message: 'Passwords are not equal to each other' })
            }

            const hashPass = bcrypt.hashSync(password, 6)
            const userRole = await Role.findOne({ value: "USER" })
            const user = new User({ username, password: hashPass, role: [userRole.value] })

            await user.save()

            return res.json({ message: "User has been successfully created" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })

            if (user) {
                const IsPassMatches = bcrypt.compare(password, user.password)
                if (!IsPassMatches) {
                    return res.status(400).json({ message: 'User\'s password or login isn\'t correct' })
                }
            }
            else {
                return res.status(400).json({ message: 'User\'s password or login isn\'t correct' })
            }

            const token = generateToken(user._id, user.roles)

            return res.json({token})
        } catch (error) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find().lean()
            res.json(users)
        } catch (error) {

        }
    }
}

module.exports = new authController()