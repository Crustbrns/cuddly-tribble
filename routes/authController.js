const User = require('../models/User')
const Role = require('../models/Role')

class authController{
    async reg(req, res){
        try{
            res.json("server works")
        } catch(error){

        }
    }

    async login(req, res){
        try{
            res.json("server works")
        } catch(error){
            
        }
    }

    async getUsers(req, res){
        try{
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            const editorRole = new Role({value: "EDITOR"})

            await userRole.save()
            await adminRole.save()
            await editorRole.save()
            
            res.json("server works")
        } catch(error){
            
        }
    }
}

module.exports = new authController()