import './App.css'
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  // 데이터 가져오기
  const [tourData, setTourData] = useState([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)
  const [expendedDescription, setExpendedDescription] = useState({}) // 버튼 클릭 -> 내용 토글
  const [pageNo, setPageNo] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // 가져온 데이터 시작하자마자 불러오기
  let fetchTourData = async() => {
    // 데이터 가져오기전엔 loading
    setLoading(true)
    // axios이용해서 데이터 가져오면
    try{
      const result = await Axios.get("http://apis.data.go.kr/5050000/dstrctsTrrsrtService/getDstrctsTrrsrt", {
        params:{serviceKey : "tgjWZ/J4ZaP9bjSqeVFzQxeXFcjNyKsstgtjCqlNNZmnZC+xj3umJukpRqKdobL3CROJbxNcgO8mwB4k6oVLvw==", pageNo : pageNo, numOfRows : "5"}
      })
      // 응답 데이터를 안전하게 처리하기
      let items = result.data?.response?.body?.items?.item
      if(Array.isArray(items)){
        setTourData((prevData)=>[...prevData, ...items])
        setPageNo((prevPage)=> pageNo+1)
      }

    }catch(error){
      console.error("API Fetching Error : ", error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=> {
    fetchTourData()
  }, [])

  let handleScroll = ()=>{
    if(window.scrollY > 300){
      setScrollTop(true)
    }else{
      setScrollTop(false)
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", handleScroll)
    return ()=> {window.removeEventListener("scroll", handleScroll)}
  }, [])

  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  let toggleDesc =(idx) => {
    setExpendedDescription((prevState)=>({
      ...prevState, [idx] : !prevState[idx]
    }))
  }

  let filteredData = tourData.filter((item)=> {
    let title = item.CON_TITLE ? item.CON_TITLE.toLowerCase() : "";
    return title.includes(searchTerm.toLowerCase());
  })

  return (
      <div className='tour-list'>
        <h1 className='title'>경주 관광지</h1>
        <div className="search-cotainer">
          <input type="text" placeholder='관광지를 입력하세요.' className='search-input' onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm}/>
          <button className='search-btn'>검색</button>
        </div>
        {/* 로딩표시 */}
        {loading && <div>로딩 중입니다...</div>}

        <div className="tour-items">
        {
          filteredData.map((item, idx)=> (
            <div className='tour-card' key={idx}>
              <img src={`https://${item.CON_IMGFILENAME}`} className='tour-image' />
              <div className="tour-title">{item.CON_TITLE}</div>
              <div className='tour-description' dangerouslySetInnerHTML = {{ __html : expendedDescription[idx] ? item.CON_CONTENT : item.CON_CONTENT.substring(0,60) + "..." }}/>         {/*데이터안에 html없애기*/}
              <button className='toggle-btn' onClick={()=> toggleDesc(idx)}>
                {expendedDescription[idx] ? "닫기" : "더보기"}
              </button>
            </div>
          ))
        }  
        </div>

        <button className='load-more' onClick={fetchTourData}>{loading ? "로딩 중" : "다음 게시물 불러오기"}</button>


        {
          scrollTop && (<button className='scroll-to-top' onClick={scrollToTop}>위로</button>)
        }
      </div>
  )
}

export default App
