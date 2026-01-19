import BlogsList from "../components/blog/BlogsList"
import { useState, useEffect } from 'react'
import blogService from "../services/blogs"
import loginService from "../services/login"
import LoginForm from "../components/auth/Login"
import { NotificationType } from "../constants/notificationType"

const Home = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({ type: NotificationType.ERROR, message: 'wrong username or password' })
      setTimeout(() => {
        setNotification({ type: null, message: null })
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } 

    fetchBlogs()
  }, [])

  if(!user) {
    return (
      <LoginForm 
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        notification={notification}
      />
    )
  }

  return <BlogsList user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} notification={notification} setNotification={setNotification} />
}

export default Home