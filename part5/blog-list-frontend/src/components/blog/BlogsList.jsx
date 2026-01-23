import Blog from './Blog'
import UserInfo from '../auth/UserInfo'
import CreateBlog from './CreateBlog'
import Notification from '../utils/Notification'
import Toggable from '../utils/Togglable'

const BlogsList = ({ user, setUser, blogs, setBlogs, notification, setNotification, likeBlogPost, removeBlogPost }) => {
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification}/>
      <UserInfo user={user} setUser={setUser}/>

      <Toggable buttonLabel={'create new blog'}>
        <CreateBlog blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
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