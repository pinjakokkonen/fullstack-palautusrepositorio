import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()

  render(<BlogForm createBlog={mockHandler}/>)

  const inputTitle = screen.getByLabelText('title:')
  const inputAuthor = screen.getByLabelText('author:')
  const inputUrl = screen.getByLabelText('url:')
  const button = screen.getByText('create')

  await userEvent.type(inputTitle, 'title' )
  await userEvent.type(inputAuthor, 'author' )
  await userEvent.type(inputUrl, 'url' )
  await user.click(button)

  expect(mockHandler.mock.calls[0][0].title).toBe('title')
  expect(mockHandler.mock.calls[0][0].author).toBe('author')
  expect(mockHandler.mock.calls[0][0].url).toBe('url')
})