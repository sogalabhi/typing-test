const connectToMongo = require("./db.js");
const express = require('express');

connectToMongo()
let cors = require("cors");
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stat', require('./routes/stats.js'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})