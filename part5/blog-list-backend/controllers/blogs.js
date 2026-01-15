const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlogPost = await blog.save()
  user.blogs = user.blogs.concat(savedBlogPost.id)
  await user.save()

  response.status(201).json(savedBlogPost)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)

  if(!blogPost) {
    return response.status(404).end()
  }

  blogPost.title = request.body.title
  blogPost.author = request.body.author 
  blogPost.url = request.body.url 
  blogPost.likes = request.body.likes 

  const savedBlogPost = await blogPost.save()
  response.json(savedBlogPost)
})

module.exports = blogsRouter