const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' })
      }

      const decoded = jwt.verify(token, config.get('ACCESS_SECRET_KEY'))
      if (!decoded.roles.some(r => r === role)) {
        return res.status(403).json({ message: 'Нет доступа' })
      }
      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ message: 'Не авторизован' })
    }
  }
}