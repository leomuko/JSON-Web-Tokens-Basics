const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) =>{
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomAPIError('Please Provide Email and Password', 400)
    }

    //just for demo, normally provided by DB
    const id = new Date().getDate();

    //try to keep payload small, better experience for user
    //just for demo, in production use long, complex and unguessable sring value
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn : '30d'})

    res.status(200).json({msg : 'user created', token})
}

const dashboard = async (req, res) => {

    //get user from the user object i.e req.user passed through auth middleware

    const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({msg:`Hello, ${req.user.username}`, 
        secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login, dashboard
}