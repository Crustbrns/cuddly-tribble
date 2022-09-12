const express = require('express');
const app = express();
const Person = require('./models/Person');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;

const ConnectString = "mongodb+srv://crustbrns:gAzAt0Hx6mVrxiDQ@cluster0.yml35q2.mongodb.net/?retryWrites=true&w=majority";

// app.get("/people", (req, res) => {
//     const starring = [
//         {
//             id: 1,
//             name: "Eddard",
//             surname: "Stark",
//             family: "House Stark"
//         },
//         {
//             id: 2,
//             name: "Daenerys",
//             surname: "Targaryen",
//             family: "House Targaryen"
//         },
//         {
//             id: 3,
//             name: "Jon",
//             surname: "Snow",
//             family: "House Targaryen"
//         },
//         {
//             id: 4,
//             name: "Tyrion",
//             surname: "Lannister",
//             family: "House Lannister"
//         },
//     ];

//     console.log(`Request's been received for data fetch ${starring}`);

//     res.json({ characters: starring });
// });

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

async function createPerson(){
    const person = new Person({
        name: 'test',
        surname: 'test2',
        family: 'test3'
    });

    console.log('Person created');
    await person.save()
}

async function start() {

    try {
        await mongoose.connect(ConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // app.listen(PORT, () => console.log('App has been started on port', PORT))
        // createPerson();
        app.listen(PORT, () => {
            console.log(`Server is working now on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

start();