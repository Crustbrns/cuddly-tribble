const jwt = require('jsonwebtoken')
const config = require('config')

const secret = config.get('jwtSecret') || 3000

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }

    try{
        const token = req.cookies.session_id;
        
        if(!token){
            return res.redirect('/')
            // return res.status(400).json({message:"You have no access to do it"}).then().redirect('/')
        }

        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()

    }catch(error){
        console.log(error)
        return res.redirect('/')
        // return res.status(400).json({message:"You have no access to do it"}).redirect('/')
    }
}