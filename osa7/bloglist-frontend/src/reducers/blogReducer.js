import { createSlice } from '@reduxjs/toolkit'


const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlogs(state, action) {
      const content = action.payload
      state.push(content)
    },
    likeBlog(state, action) {
      const newBlogs = state.map(blog => (blog.id===action.payload.id) ? action.payload : blog)
      return newBlogs.sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const newBlogs = state.map(blog => (blog.id===action.payload.id) ? null : blog)
      return newBlogs
    }
  },
})

export const { setBlogs, createBlogs, likeBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer