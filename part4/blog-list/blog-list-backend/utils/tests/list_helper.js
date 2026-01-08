const dummy = (blogs) => {
  return 1
}

/**
 * Only used for linting
 * @param {Array} posts 
 * @returns The sum of all posts likes
 */
const totalLikes = (posts) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return posts.reduce(reducer, 0)
}

module.exports = { dummy, totalLikes }