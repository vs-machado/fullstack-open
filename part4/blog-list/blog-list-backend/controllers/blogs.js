const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlogPost = await blog.save()
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