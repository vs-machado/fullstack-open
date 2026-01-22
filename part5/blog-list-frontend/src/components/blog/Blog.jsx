import { useState } from "react"

const Blog = ({ blog, likeBlogPost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author}
        <button onClick={toggleVisibility}>{isVisible === false ? 'view' : 'hide'}</button>
      </p>
      {
        isVisible &&
        (
          <>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={likeBlogPost}>like</button></p>
          </>
        )
      }
    </div>  
  )
}

export default Blog