const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length == 0) {
    return 0
  } else if (blogs.length == 1) {
    return blogs[0].likes
  } else if (blogs.length > 1) {
    const initial = 0
    return blogs.reduce((result, blog) => result + blog.likes, initial)
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) {
    return 0
  }
  return blogs.reduce((favorite, blog) =>(blog.likes > favorite.likes ? blog : favorite), blogs[0])
}

const mostBlogs = (blogs) => {
  const names = _.map(blogs, 'author')
  const  blogCount = _.countBy(names)
  let most = 0
  let person = ''
  _.forEach(blogCount, function (value, key) {if (value > most) {most=value, person=key}})
  return {author: person, blogs: most}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}