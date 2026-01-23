import { useState } from 'react'

const Blog = ({ blog, user, likeBlogPost, removeBlogPost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setIsVisible] = useState(false)
  const isPostOwner = blog.user.id === user.id

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div style={blogStyle}>
      <p id='title-author-input'>{blog.title} {blog.author}
        <button onClick={toggleVisibility}>{isVisible === false ? 'view' : 'hide'}</button>
      </p>
      {
        isVisible &&
        (
          <>
            <p id='blog-url'>{blog.url}</p>
            <p id='blog-likes'>likes {blog.likes} <button onClick={likeBlogPost}>like</button></p>
            {isPostOwner && (<button onClick={removeBlogPost}>remove</button>)}
          </>
        )
      }
    </div>
  )
}

export default Blog