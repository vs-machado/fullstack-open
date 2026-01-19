import Blog from './Blog'
import UserInfo from '../auth/UserInfo'
import CreateBlog from './CreateBlog'
import Notification from '../Notification'

const BlogsList = ({ user, setUser, blogs, setBlogs, notification, setNotification}) => {
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification}/>

      <UserInfo user={user} setUser={setUser}/>
       
      <CreateBlog blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogsList