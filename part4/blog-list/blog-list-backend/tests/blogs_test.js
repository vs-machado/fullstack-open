const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/tests/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  const emptyList = []

  test('when list has only one post, equals the likes of that', () => {
    const result = listHelper.totalLikes([listHelper.initialBlogs[0]])
    assert.strictEqual(result, 5)
  })

  test('when list has multiple posts, provide the likes total', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs)
    assert.strictEqual(result, 59)
  })

  test('when list hasnt any items the return is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })
})