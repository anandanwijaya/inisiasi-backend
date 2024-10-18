let express = require('express')
let app = express()
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT

let authController = require('./auth/auth.controller')
let itemController = require('./item/item.controller')
let userController = require('./user/user.controller')
let transactionController = require('./transaction/transaction.controller')
let adminAuthorization = require('./middleware/adminAuthorization')

app.use(express.json())
app.use('/api/auth', authController)
app.use('/api/items', itemController)
app.use('/api/users', adminAuthorization, userController)
app.use('/api/transactions', transactionController)


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log('Example app listening on port http://localhost:' + port)
})