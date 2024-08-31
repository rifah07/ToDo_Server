require('dotenv').config()
const express = require('express');
const app = express()
const bodyParser= require('body-parser')
const connectDB = require('./config/db')


app.use(bodyParser.json())
connectDB()

app.use('/api/tasks', require('./routes/api/tasks'))

app.get('/', (req, res)=>{
    res.json({message: "Welcome to Rifah's To-Do app!" });
})

const port = 5000
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})