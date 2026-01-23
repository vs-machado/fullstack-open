/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('blog component displays blogs url and likes after clicking on view button', async () => {
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

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} likeBlogPost={mockHandler} removeBlogPost={mockHandler} user={user} />)

  // Before click
  expect(container.querySelector('#blog-url')).not.toBeInTheDocument()
  expect(container.querySelector('#blog-likes')).not.toBeInTheDocument()

  // Click action
  const userE = userEvent.setup()
  const button = screen.getByText('view')
  await userE.click(button)

  // After click
  const inputUrl = container.querySelector('#blog-url')
  expect(inputUrl).toBeDefined()
  expect(inputUrl).toBeInTheDocument()
  expect(inputUrl).toHaveTextContent('www.google.com')

  const inputLikes = container.querySelector('#blog-likes')
  expect(inputLikes).toBeDefined()
  expect(inputUrl).toBeInTheDocument()
  expect(inputLikes).toHaveTextContent('1')
})