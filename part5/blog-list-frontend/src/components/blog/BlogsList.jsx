import Blog from './Blog'
import UserInfo from '../auth/UserInfo'
import CreateBlog from './CreateBlog'
import Notification from '../utils/Notification'
import Toggable from '../utils/Togglable'
import { useRef } from 'react'

const BlogsList = ({ user, setUser, blogs, notification, likeBlogPost, removeBlogPost, onPostCreate }) => {
  const blogFormRef = useRef()

  const handleCreate = async (blogObject) => {
    await onPostCreate(blogObject)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification}/>
      <UserInfo user={user} setUser={setUser}/>

      <Toggable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog onPostCreate={handleCreate}/>
      </Toggable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} likeBlogPost={() => likeBlogPost(blog)} removeBlogPost={() => removeBlogPost(blog)}/>
        )
      }
    </div>
  )
}

export default BlogsList