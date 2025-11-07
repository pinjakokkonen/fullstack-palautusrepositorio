import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async event => {
    const newLikes = blog.likes + 1
    const newBlog = {'user': blog.user.id, 'title':blog.title, 'author':blog.author, 'url':blog.url, 'likes': newLikes}
    updateBlog(blog.id, newBlog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        {blog.likes}
        <button onClick={likeBlog}>like</button>
        <p>{blog.user.name}</p>
      </div>
    </div> 
)}

export default Blog