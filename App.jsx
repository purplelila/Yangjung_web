import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'
import logo from "../public/kialogo.jpg"

let title1 = "아시아에서 일어나 세계로 진출하는 기아"
let title2 = "Movements that inspired"

let BoardContext = createContext()

let BoardProvider = ({children}) => {
  const [posts, setPosts] = useState([])

  function addBoard(title, author, content){
    let newPost = {id : Date.now(),title, author, content, createDate : new Date().toLocaleString()}
    setPosts([...posts, newPost])
  }

  useEffect(()=> {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  useEffect(()=> {
    let savedPost = JSON.parse(localStorage.getItem("posts"))
    setPosts(savedPost)
  }, [])

  function deletePost(id){
    let filteredPosts = posts.filter((p)=> p.id !== id)
    setPosts(filteredPosts)
  }

  return(
    <BoardContext.Provider value={{posts, addBoard, deletePost}}>
      {children}
    </BoardContext.Provider>
  )
}

let Nav = () => {
  return(
    <nav>
      <h1><img src={logo} alt="" /></h1>
      <Link to="/">홈으로</Link>    |     <Link to="/board">게시판으로</Link>
    </nav>
  )
}

let Home = () => {
  return(
    <div className='home'>
      <h2>{title1}</h2>
    </div>
  )
}

let Board = () => {
  let {addBoard, posts, deletePost} = useContext(BoardContext)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    if(title && author && content){
      // provider 함수에 저장
      addBoard(title, author, content)
      
      setTitle("")
      setAuthor("")
      setContent("")
    }
  }

  return(
    <div className='board'>
      <h2>{title2}</h2>

      <h3>게시글 목록</h3>
        <div className='post-list'>
          {posts.length === 0 ? "게시글이 없습니다." : (
            posts.map((p, idx) => {
              return(
                <div key={idx} className='post-item'>
                  <p>번호: {p.id}</p>
                  <h4>제목 : {p.title}</h4>
                  <p>{p.content}</p>
                  <div>
                    <span>작성자 : {p.author}</span><br />
                    <span>작성일 : {p.createDate}</span>
                  </div>
                  <button className='deleteBtn' onClick={()=> deletePost(p.id)}>삭제</button>
                </div>
              )
            })
          )}
        </div>
      <hr style={{margin:"20px 0"}}/>

      <div className="form-container">
        <h3>게시판 글 작성하기</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='제목' onChange={(e)=> setTitle(e.target.value)} value={title}/>
          <input type="text" placeholder='작성자'onChange={(e)=> setAuthor(e.target.value)} value={author}/>
          <textarea placeholder='내용' onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
          <button type='submit'>게시글 등록</button>
        </form>
      </div>
    </div>
  )
}

function App() {
  return (
    <BoardProvider>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/board' element={<Board/>}/>
          </Routes>
        </div>
      </Router>
    </BoardProvider>
  )
}

export default App
