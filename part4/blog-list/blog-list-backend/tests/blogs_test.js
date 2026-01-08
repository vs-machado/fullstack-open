const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/tests/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  const listWithMultipleBlogs = [
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

  const emptyList = []

  test('when list has only one post, equals the likes of that', () => {
    const result = listHelper.totalLikes([listWithMultipleBlogs[0]])
    assert.strictEqual(result, 5)
  })

  test('when list has multiple posts, provide the likes total', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 59)
  })

  test('when list hasnt any items the return is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })
})