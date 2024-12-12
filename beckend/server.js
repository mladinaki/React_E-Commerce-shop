const express = require('express');
const cors = require('cors');

const { PORT } = require('./src/constant/constant');
const dbConnect = require('./src/config/dbConfig');
const routers = require('./router/router');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers)

app.get('/', (req, res) => {
    res.send('Welcome to the Express')
})

dbConnect()
    .then(() => console.log(`Successfully connected to DB`))
    .catch(err => console.log(`Error connecting to DB ${err.message}`))


app.listen(PORT, (error) => {
    if (error) console.log(`Failed to listen on ${PORT}`);
    console.log(`Server listening on ${PORT}`)
})


