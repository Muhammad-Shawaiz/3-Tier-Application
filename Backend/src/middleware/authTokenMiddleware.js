var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    if (req.headers.bearer !== 'undefined') {
        const token = req.headers.bearer
        jwt.verify(token, process.env.tokenSecretKey, (err, data) => {
            if (err) {
                res.json({ result: err.message })
            } else {
                next()
            }
        })
    } else {
        res.send('token not provided!')
    }
}

module.exports = verifyToken