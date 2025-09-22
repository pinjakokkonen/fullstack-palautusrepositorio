const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs identifying field is id', async () => {
    const response = await api.get('/api/blogs')
    const result = Object.keys(response.body[0])

    assert(result.includes('id'))
  })
  
  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })

    test('likes are 0 if not specified ', async () => {
      const newBlog = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body[response.body.length-1]['likes'], 0)
    })

    test('blog requires title and url', async () => {
      const newBlog = {
        _id: "5a422ba71b54a676234d17fb",
        author: "Robert C. Martin",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  test('a blog can be deleted', async () => {
    const blogs = await Blog.find({})
    blogs.map(note => note.toJSON())
    const blogToDelete = blogs[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(note => note.toJSON())
    const titles = blogsAtEnd.map(blog => blog.title)

    assert(!titles.includes('React patterns'))
    assert.strictEqual(blogsAtEnd.length, blogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})