const express = require('express');
const app = express();
const Person = require('./models/Person');
const Goods = require('./models/Goods');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;

const ConnectString = "mongodb+srv://crustbrns:gAzAt0Hx6mVrxiDQ@cluster0.yml35q2.mongodb.net/?retryWrites=true&w=majority";

app.post('/createpeople', async (req, res) =>{
    const person = new Person({
        name: req.body.name,
        surname: req.body.surname,
        family: req.body.family
    });

    console.log('Creating a person..');

    await product.save();
})

app.get("/people", async (req, res) => {
    const persons = await Person.find({}).lean()
    console.log(`Request's been received for data fetch ${persons}`);

    res.json({ characters: persons });
});
app.get("/goods", async (req, res) => {
    const items = await Goods.find({}).lean()
    console.log(`Request's been received for data fetch ${items}`);

    res.json({ goods: items });
});

async function createPerson(){
    const person = new Person({
        name: 'Tyrion',
        surname: 'Lannister',
        family: 'House Lannister'
    });

    console.log('Person created');
    await person.save()
}
async function createGoods(){
    const item = new Goods({
        title: 'Wildfire',
        description: 'Wildfire is a volatile, flammable liquid which can burn for a long time once set on fire. It is created by the Alchemists\' Guild, who refer to it as the substance and keep its recipe a close-guarded secret. Wildfire has a green flame when it burns. Wildfire is said to be a close cousin to dragonflame.',
        price: '240',
        url: 'https://awoiaf.westeros.org/images/d/de/Gregory_Szucs_Vat_of_WildfireII.png'
    });

    console.log('Item created');
    await item.save()
}

async function start() {
    try {
        await mongoose.connect(ConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        // app.listen(PORT, () => console.log('App has been started on port', PORT))
        // createPerson();
        createGoods();

        app.listen(PORT, () => {
            console.log(`Server is working now on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

start();