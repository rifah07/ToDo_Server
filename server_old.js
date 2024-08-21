const express = require('express');
const app = express()
const bodyParser= require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json({message: "Welcome to Rifah's app!" });
})

let users= []
let lastId= 0

app.post('/users', (req, res)=>{
    const user= req.body
    user.id= ++lastId
    users.push(user)
    res.status(201).json(user)
})

app.get('/users', (req, res)=>{
    res.json(users)
})

app.get('/user/:id', (req, res)=>{
    const id= parseInt(req.params.id)
    const user= users.find((u)=> u.id === id)
    if(user){
        res.json(user)
    }
    else{
        res.status(404).json({message: "User not found!"})
    }
})


app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updateUser = req.body
    const userIndex = users.findIndex((u) => u.id === id)
    if ( userIndex == -1){
        res.status(404).json({message: "User not found"})
    }else{
        users[userIndex] = { ...users[userIndex], ...updateUser }
        res.json(users[userIndex])
    }
})

app.delete('/users/:id', (req,res)=>{
    const id= parseInt(req.params.id)
    const userIndex= users.findIndex((u)=> u.id === id)
    if(userIndex == -1){
        res.status(404).json({message: "User not Found!"})
    }else{
        users.splice(userIndex,1)
        res.json({message: "User deleted"})
    }
})

const port = 7000
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})