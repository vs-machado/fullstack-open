import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../../services/blogs'
import UserInfo from '../auth/UserInfo'

const BlogsList = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } 

    fetchBlogs()
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      { user && <UserInfo user={user} setUser={setUser}/> }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsList