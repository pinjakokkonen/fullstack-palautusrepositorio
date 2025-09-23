const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  try {
    const result = await blog.save()
    response.status(201).json(result)
  }
  catch {
    response.status(400).json({ error: 'missing title or url'})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id, title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.id = id
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const result = await blog.save()
  response.status(200).json(result)
})

module.exports = blogsRouter