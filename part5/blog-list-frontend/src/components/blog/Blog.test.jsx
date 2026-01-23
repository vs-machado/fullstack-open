/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog component displays blogs title and author only initially', () => {
  const blog = {
    user: {
      id: '123'
    },
    title: 'Blog title test',
    author: 'vs-machado',
    url: 'www.google.com',
    likes: 1,
  }

  const user = {
    id: '123'
  }

  const likeBlogPost = () => {}
  const removeBlogPost = () => {}

  const { container } = render(<Blog blog={blog} likeBlogPost={likeBlogPost} removeBlogPost={removeBlogPost} user={user}/>)

  const input = container.querySelector('#title-author-input')
  expect(input).toBeDefined()
  expect(input).toHaveTextContent(
    'Blog title test vs-machado'
  )

  const input2 = container.querySelector('#blog-url')
  expect(input2).toBeDefined()
  expect(input2).toBeNull()

  const input3 = container.querySelector('#blog-likes')
  expect(input3).toBeDefined()
  expect(input3).toBeNull()
})