import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';

let Home = () => {
    return(
        <div>
            <h1>롯데자이언츠</h1>
            <p>구도부산, 한국 프로야구를 대표하는 명문구단</p>
        </div>
    )
}

let Users = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>setData(res.data))
    }, [])

    return(
        <div>
            <h1>롯데자이언츠 선수단 목록</h1>
            <p>
                <ol>
                    {
                        data.map((d,idx) => (
                            <li key={idx}>{d.title}</li>
                        ))
                    }
                </ol>
            </p>
        </div>
    )
}

let Contact = () => {
    return(
        <div>
            <h1>롯데자이언츠 구단 연락처</h1>
            <p>051-000-0000</p>
        </div>
    )
}

let PageNotFound = () => {
    return(
        <div>
            <h1>페이지를 찾을 수 없습니다.</h1>
            <p>404 Error</p>
        </div>
    )
}

function App() {
  return (
    <Router>
      <nav>
        <ul>
            <li><Link to="/">홈으로</Link></li>
        </ul>
        <ul>
            <li><Link to="/users">선수단 목록</Link></li>
        </ul>
        <ul>
            <li><Link to="/contact">구단 연락처</Link></li>
        </ul>
      </nav>  
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>  
      <footer>
        <p>2025년 롯데자이언츠의 우승을 기원합니다.</p>
      </footer>
    </Router>
  );
}

export default App;
