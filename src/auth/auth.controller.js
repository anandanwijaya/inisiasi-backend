let express = require('express')
let router = express.Router()
let authServices = require('./auth.services')

router.post('/register', async (req, res, next) => {

    let {username, email, password} = req.body
    try {
        let newUser = await authServices.register(username, email, password)
        res.status(201).json({ data: {username: newUser.username, email: newUser.email}, message: 'Registration success' })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/login', async (req, res, next) => {

    let {username, password} = req.body
    try {
        let user = await authServices.login(username, password)
        res.status(200).json({ data: {username: user.username, role: user.role}, message: 'Login success!' })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router