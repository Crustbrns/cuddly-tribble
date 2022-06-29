const path = require('path')
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const homeRoute = require('./routes/home.routes')
const authRoute = require('./routes/auth.routes')
const adminRoute = require('./routes/admin.routes')
const expresshandlebars = require('express-handlebars')

const app = express()
const hbs = expresshandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',

    helpers: {
        comparison: function(a, b, options){
            return (a > b) ? options.fn(this) : options.inverse(this);
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(homeRoute)
app.use('/auth', authRoute)
app.use('/admin', adminRoute)

const PORT = config.get('port') || 3000

async function start() {
    try {
        await mongoose.connect(config.get('connectionString'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log('App has been started on port', PORT))
    }
    catch (e) {
        console.log('Server caught error', e.message)
        process.exit(1)
    }
}

start()