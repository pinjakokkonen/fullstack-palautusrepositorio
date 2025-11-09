import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('when clicking view button everything is shown', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: { name: 'user' }
  }

  render(<Blog blog={blog} />)

  const element1 = screen.getByText('url')
  expect(element1).not.toBeVisible()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element2 = screen.getByText('url')
  expect(element2).toBeVisible()
  const element3 = screen.findByText(0)
  expect(element3).toBeDefined()
  const element4 = screen.getByText('user')
  expect(element4).toBeVisible()
})