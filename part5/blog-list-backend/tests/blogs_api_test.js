const supertest = require("supertest");
const app = require("../app");
const { test, after, beforeEach, describe } = require('node:test');
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const bcrypt = require('bcrypt')
const assert = require("node:assert");
const { initialBlogs, usersInDb } = require("../utils/tests/list_helper");
const User = require("../models/user");

const api = supertest(app)

describe('when there is multiple blogs in db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blogs get responses returns objects with id parameter instead of _id', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[0].id, initialBlogs[0]._id)

    // checks if the database property _id was successfully converted to id in the response
    assert.ok(!('_id' in response.body[0]))
    assert.ok('id' in response.body[0])
  })

  test('post request to blogs endpoint successfully creates a new blog post', async () => {
    const newBlogPost = {
      title: 'test',
      author: 'someone',
      url: 'www.google.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // verifies if the blog post was added to the database
    const allBlogPosts = await Blog.find({})
    assert.strictEqual(allBlogPosts.length, initialBlogs.length + 1)

    const titles = allBlogPosts.map(b => b.title)
    assert(titles.includes("test"))
  })

  test('delete request successfully removes data from database', async () => {
    await api
      .delete('/api/blogs/5a422ee71b54a676234d17fc')
      .expect(204)

    const allBlogPosts = await Blog.find({})
    assert.strictEqual(allBlogPosts.length, initialBlogs.length - 1)
  })

  test('put request successfully updates a database record', async () => {
    const newBlogPost = {
      title: 'test',
      author: 'someone',
      url: 'www.google.com',
      likes: 3
    }

    const response = await api
      .put('/api/blogs/5a422ee71b54a676234d17fc')
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.title, 'test')
    assert.strictEqual(response.body.author, 'someone')
    assert.strictEqual(response.body.url, 'www.google.com')
    assert.strictEqual(response.body.likes, 3)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('post request successfully creates a new user in database', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'testxx',
      name: 'Test',
      password: 'test123'
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

  test('another user cant register with the same username', async () => {
    const usersBeforeRequest = await usersInDb()
    const usernamesBefore = usersBeforeRequest.map(u => u.username)

    assert(usernamesBefore.includes('root'))

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password'
    }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      assert.strictEqual(
        response.body.error,
        'expected `username` to be unique'
      )
    })

    const oldUser = usersBeforeRequest[0]
    const usersAfterRequest = await usersInDb()

    assert.strictEqual(newUser.username, oldUser.username)
    assert.strictEqual(usersBeforeRequest.length, usersAfterRequest.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
