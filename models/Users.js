const mongoose = require('mongoose')
const userScema= new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    }
 
},{
    timestamps: true
    
})

module.exports = User = mongoose.model("User", userScema)
