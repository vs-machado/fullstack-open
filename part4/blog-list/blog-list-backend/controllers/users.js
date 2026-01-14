const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { request } = require('../app')

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

module.exports = usersRouter