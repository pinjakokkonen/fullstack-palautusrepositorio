const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails if username in users', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password is too short', async() => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      password: 'aa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})