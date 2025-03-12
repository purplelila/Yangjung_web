import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'

// 전역변수
let AuthContext = createContext([])

let AuthPriver = ({children}) => {
  const [user, setUser] = useState(null)

  function login(username){
    setUser({username : username, completed : false})
  }

  function logout(){
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

let Login = () => {
  let {login} = useContext(AuthContext)
  const [username, setUsername] = useState("")
  function handleSubmit (e){
    e.preventDefault()
    login(username)
  }

  return(
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Email.' onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
        <button type='submit'>로그인</button>
      </form>
  )
}

let UserProfil = () => {
  let {user} = useContext(AuthContext)

  if(!user){
    return <div>로그인 해주세요.</div>
  }

  return <div>Welcome To {user.username}</div>
}

let Logout = () => {
  let {logout} = useContext(AuthContext)
  return(
    <>
      <button onClick={logout}>로그아웃</button>
    </>
  )
}


function App() {
  return (
    <AuthPriver>
      <Login/>
      <UserProfil/>
      <Logout/>
    </AuthPriver>
  )
}

export default App
