const express = require('express')
const mongoose = require('mongoose');

//mongodb connection
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

//express
const app = express()
const port = 3000
const routes = require('./routes/routes');

app.use(express.json());

app.use('/api',routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/json-test',(req,res)=>{
    res.status(200).json({ message: "Get goals" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})