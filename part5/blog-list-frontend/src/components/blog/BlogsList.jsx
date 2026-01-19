import Blog from './Blog'
import UserInfo from '../auth/UserInfo'
import CreateBlog from './CreateBlog'

const BlogsList = ({ user, setUser, blogs, setBlogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      <UserInfo user={user} setUser={setUser}/>
       
      <CreateBlog blogs={blogs} setBlogs={setBlogs} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogsList