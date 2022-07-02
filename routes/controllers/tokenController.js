const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const Product = require('../../models/Product')

const secret = config.get('jwtSecret') || 3000

class tokenController{
    
}