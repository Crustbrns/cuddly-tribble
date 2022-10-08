const jwt = require('jsonwebtoken')
const config = require('config')

const secret = config.get('jwtSecret') || 3000

module.exports = function (roles) {
    return function (req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1]
    
            if(!token){
                return res.status(400).json({message:"You have no access to do it"})
            }
            
            const{roles: userrole} = jwt.verify(token, secret)
            let hasAccess = false
            hasAccess.forEach(role=> {
                if(roles.includes(role)){
                    hasAccess = true
                }
            })
            if (!hasAccess){
                return res.status(400).json({message:"You have no access to do it"})
            }

            next()
    
        }catch(error){
            console.log(error)
            return res.status(400).json({message:"You have no access to do it"})
        }
    }
}