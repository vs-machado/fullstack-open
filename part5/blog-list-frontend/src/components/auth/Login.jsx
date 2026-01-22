import Notification from "../utils/Notification"

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword, notification }) => {
  return (
    <>
      <Notification notification={notification}/>
      <div>
        <h2>log in to application</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div>
        <label>
          username
          <input 
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </label>
        </div>
        <div>
          <label>
            password
            <input
              type="text" 
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm