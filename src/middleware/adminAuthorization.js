const jwt = require('jsonwebtoken')

const authorizeAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Tidak Ada Token, Gagal Mengakses Fitur' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Format Token Salah, Gagal Mengakses Fitur' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized' })
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}

module.exports = authorizeAdmin