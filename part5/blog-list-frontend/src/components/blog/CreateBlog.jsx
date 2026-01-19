import { NotificationType } from '../../constants/notificationType'
import blogService from '../../services/blogs'
import { useState } from 'react'

const CreateBlog = ({ blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onPostCreate = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    const createdBlog = await blogService.create(blog)
    setBlogs(blogs.concat(createdBlog))
    setNotification({ type: NotificationType.SUCCESS, message: `a new blog ${blog.title} by ${blog.author} added`})
    setTimeout(() => {
      setNotification({ type: null, message: null })
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onPostCreate}>
        <div>
          <label>
            title:
            <input 
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author:
            <input 
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input 
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateBlog