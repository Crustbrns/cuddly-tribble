const express =  require('express')
const config = require('config') 
const path = require('path')
const mongoose = require('mongoose')
const expresshandlebars = require('express-handlebars')
const homeRoute = require('./routes/home')

const app = express()
const hbs = expresshandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoute)

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 3000

async function start(){
    try{
        await mongoose.connect(config.get('connectionString'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log('App has been started on port', PORT))        
    }
    catch (e){
        console.log('Server caught error', e.message)
        process.exit(1)
    }
}

start()