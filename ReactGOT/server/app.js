const express = require('express');
const app = express();
const Person = require('./models/Person');
const Goods = require('./models/Goods');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;

const ConnectString = "mongodb+srv://crustbrns:gAzAt0Hx6mVrxiDQ@cluster0.yml35q2.mongodb.net/?retryWrites=true&w=majority";

app.post('/createpeople', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        surname: req.body.surname,
        family: req.body.family
    });

    console.log('Creating a person..');

    await product.save();
})

app.post("/add",  async (req,res)=>{
    console.log(req.meow);
});

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

app.get("/goods/:_id", async (req, res) => {
    const item = await Goods.findById(req.params._id);
    // let itempackage = JSON.stringify(item);
    res.json({ item: item });
    
})

async function createPerson() {
    const person = new Person({
        name: 'Tyrion',
        surname: 'Lannister',
        family: 'House Lannister'
    });

    console.log('Person created');
    await person.save()
}
async function createGoods() {
    const item = new Goods({
        title: 'Various foods',
        description: 'Food is any substance consumed to provide nutritional support for an organism. Food is usually of plant, animal, or fungal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals. The substance is ingested by an organism and assimilated by the organism\'s cells to provide energy, maintain life, or stimulate growth. Different species of animals have different feeding behaviours that satisfy the needs of their unique metabolisms, often evolved to fill a specific ecological niche within specific geographical contexts.',
        price: '510',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Foods_%28cropped%29.jpg/1024px-Foods_%28cropped%29.jpg'
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
        // createGoods();

        app.listen(PORT, () => {
            console.log(`Server is working now on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

start();