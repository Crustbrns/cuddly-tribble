const express = require('express');
const mongoose = require('mongoose');
const Result = require('./models/Result');
const app = express();

const PORT = process.env.PORT || 3001;
const ConnectString = "mongodb+srv://crustbrns:gAzAt0Hx6mVrxiDQ@cluster0.yml35q2.mongodb.net/?retryWrites=true&w=majority";

app.use(
    express.json({
        type: ["application/json", "text/plain"],
    })
);

app.post(`/result`, async (req, res) => {
    let name = req.body.name;
    let score = req.body.score;
    console.log(name, score);

    const result = new Result({
        name: name,
        score: score
    });

    await result.save()
});

app.get('/results', async(req, res)=>{
    const results = await Result.find({}).lean();
    res.json({ results: results });
})

async function start() {
    try {
        await mongoose.connect(ConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server is working now on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

start();