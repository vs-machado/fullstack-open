const supertest = require("supertest");
const app = require("../app");
const { test, after, beforeEach } = require('node:test');
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const assert = require("node:assert");
const { initialBlogs } = require("../utils/tests/list_helper");

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
})
