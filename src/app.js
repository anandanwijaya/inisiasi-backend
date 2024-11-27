let express = require('express')
let cors = require('cors')
let app = express()
let dotenv = require('dotenv')
let adminAuthorization = require('./middleware/adminAuthorization')
dotenv.config()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello there!')
})

let authController = require('./auth/auth.controller')
let userController = require('./user/user.controller')
let itemController = require('./item/item.controller')
let transactionController = require('./transaction/transaction.controller')

app.use('/api/auth', authController)
app.use('/api/users', adminAuthorization, userController)
app.use('/api/items', itemController)
app.use('/api/transactions', transactionController)

export default app