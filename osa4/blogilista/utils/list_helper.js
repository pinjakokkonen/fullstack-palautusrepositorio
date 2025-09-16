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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}