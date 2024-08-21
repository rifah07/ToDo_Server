const express = require('express')
const router = require.Router()
const User = require('../../models/Users')
const { models } = require('mongoose')

router.post('/', async(req, res)=>{
    const userObj = {
        fname:req.body.fname,
        lname:req.body.lname

    }
    const user= new User(userObj)
    await user.save()
    res.status(201).json(user)
})


module.exports =router