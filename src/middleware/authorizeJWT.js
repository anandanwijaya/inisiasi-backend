let jwt = require('jsonwebtoken')

function authorizeJWT(req, res, next) {
    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Tidak Ada Token, Gagal Mengakses Fitur' })
    }
    
    let token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Format Token Salah, Gagal Mengakses Fitur' })
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({message: 'Gagal mengautentikasi token!'})
    }
}

module.exports = authorizeJWT