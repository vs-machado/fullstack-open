const supertest = require("supertest");
const app = require("../app");
const { test, after, beforeEach } = require('node:test');
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const assert = require("node:assert");

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422bb71b54a676234d17f9',
    title: 'Reflections on Trusting Trust',
    author: 'Ken Thompson',
    url: 'https://www.archive.ece.cmu.edu/~ganger/712.fall02/papers/p761-thompson.pdf',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422cc71b54a676234d17fa',
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    url: 'https://archive.org/details/mythicalmanmonth00broo',
    likes: 20,
    __v: 0
  },
  {
    _id: '5a422dd71b54a676234d17fb',
    title: 'A Note on Distributed Computing',
    author: 'Leslie Lamport',
    url: 'https://lamport.azurewebsites.net/pubs/distributed-system.txt',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422ee71b54a676234d17fc',
    title: 'No Silver Bullet — Essence and Accidents of Software Engineering',
    author: 'Frederick P. Brooks Jr.',
    url: 'https://www.cs.unc.edu/techreports/86-020.pdf',
    likes: 15,
    __v: 0
  }
]

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
