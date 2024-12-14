const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const adminAuthorization = require('./middleware/adminAuthorization')
dotenv.config()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello there!')
})

const authController = require('./auth/auth.controller')
const userController = require('./user/user.controller')
const itemController = require('./item/item.controller')
const transactionController = require('./transaction/transaction.controller')

app.use('/api/auth', authController)
app.use('/api/users', adminAuthorization, userController)
app.use('/api/items', itemController)
app.use('/api/transactions', transactionController)

export default app