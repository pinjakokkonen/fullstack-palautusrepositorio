import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: { name: 'user' }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('title author')
  expect(element).toBeDefined()
})