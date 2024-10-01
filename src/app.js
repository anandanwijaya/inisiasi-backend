let express = require('express')
let app = express()
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT

let authController = require('./auth/auth.controller')

app.use(express.json())
app.use('/api/auth', authController)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log('Example app listening on port http://localhost:' + port)
})