const ApiError = require('../errors/apiError')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('config')
const { RefreshTokens, User } = require('../models')
const { default: jwtDecode } = require('jwt-decode')

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  }
  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '24h' })
}

const generateRefreshToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  }

  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' })
}

const saveRefreshToken = async (userId, token) => {
  const tokenData = await RefreshTokens.findOne({ where: { userId } })

  if (tokenData) {
    tokenData.refreshToken = token
    return tokenData.save()
  }

  const refresh = await RefreshTokens.create({ userId, refreshToken: token })
  return refresh
}

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors))
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ where: { username } })

      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким username уже существует')
        )
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await User.create({
        username,
        password: hashPassword,
        roles: ['Admin', 'User'], // один раз изменяем код и создаем Admin
      })
      const access = generateAccessToken(user.id, user.roles, user.username)
      const refresh = generateRefreshToken(user.id, user.roles, user.username)
      await saveRefreshToken(user.id, refresh)
      return res.json({
        user: { username: user.username, roles: user.roles },
        access,
        refresh,
      })
    } catch (error) {
      console.log(error)
      return next(ApiError.internal('Ошибка регистрации'))
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({ where: { username } })
      if (!candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким username не существует')
        )
      }
      const validPassword = bcrypt.compareSync(password, candidate.password)
      if (!validPassword) {
        return next(ApiError.badRequest('Неверный пароль'))
      }
      const access = generateAccessToken(candidate.id, candidate.roles)
      const refresh = generateRefreshToken(candidate.id, candidate.roles)
      await saveRefreshToken(candidate.id, refresh)
      return res.json({
        access,
        refresh,
        user: { username: candidate.username, roles: candidate.roles },
      })
    } catch (error) {
      console.log(error)
      return next(ApiError.internal(error.message))
    }
  }
  async refresh(req, res, next) {
    const { refresh } = req.body
    const tokenData = await RefreshTokens.findOne({
      where: { refreshToken: refresh },
    })
    try {
      if (tokenData) {
        const decoded = jwtDecode(refresh)
        const access = generateAccessToken(decoded.userId, decoded.roles)
        res.json({ access })
      }
      next(new ApiError.badRequest('Не валидный refresh токен'))
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AuthController()
