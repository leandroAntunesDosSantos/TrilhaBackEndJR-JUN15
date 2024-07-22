const express = require("express");
require("dotenv").config();

const rotas = require("./routes/rotasIndex");

const app = express();

app.use(express.json());


app.use(rotas);


app.listen(process.env.PORTA, () => {
    console.log(`Server is running on port ${process.env.PORTA}`);
    }
);


