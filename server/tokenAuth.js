import jwt from 'jsonwebtoken'

export default function verifyToken(req, res, next) {
    const token = req.get('Authorization')?.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'tokenKey')
        if (decoded) {
            next()
        }
    } catch {
        res.send({ code: 1, msg: 'Invalid token' })
    }
}