const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/people", (req, res) => {
    const starring = [
        {
            id: 1,
            name: "Eddard",
            surname: "Stark",
            family: "House Stark"
        },
        {
            id: 2,
            name: "Daenerys",
            surname: "Targaryen",
            family: "House Targaryen"
        },
        {
            id: 3,
            name: "Jon",
            surname: "Snow",
            family: "House Targaryen"
        },
        {
            id: 4,
            name: "Tyrion",
            surname: "Lannister",
            family: "House Lannister"
        },
    ];

    console.log(`Request's been received for data fetch ${starring}`);

    res.json({ characters: starring });
});

app.listen(PORT, () => {
    console.log(`Server is working now on port ${PORT}`);
});