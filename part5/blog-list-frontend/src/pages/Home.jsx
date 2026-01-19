import BlogsList from "../components/blog/BlogsList"
import { useState, useEffect } from 'react'
import blogService from "../services/blogs"
import loginService from "../services/login"
import LoginForm from "../components/auth/Login"

const Home = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('')

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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

  if(!user) {
    return (
      <LoginForm 
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    )
  }

  return <BlogsList user={user} setUser={setUser} />
}

export default Home