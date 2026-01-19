const UserInfo = ({ user, setUser }) => {
  const onLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <>
      <p>{user.name} logged in <button onClick={onLogout}>logout</button></p>
    </>
  )
}

export default UserInfo