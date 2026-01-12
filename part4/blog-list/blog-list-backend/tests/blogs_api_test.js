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

after(async () => {
  await mongoose.connection.close()
})
