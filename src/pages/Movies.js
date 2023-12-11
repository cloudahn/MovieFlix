import React, {useEffect, useState, useRef} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MovieIntro from '../components/MovieIntro'
import { movieAction } from '../redux/actions/movieAction'
import { pageAction } from '../redux/actions/pageAction'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader"
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from 'react-slider'
import SortOption from '../components/SortOption'
import Search from '../images/Search.png'
import Button from '../components/Button'

let now = new Date();

const MIN = 1995;
const MAX = now.getFullYear();

const Movies = () => {

  

  const [years, setYears] = useState([MIN, MAX])
  const [sVisible, setSvisible] = useState(false)
  const [fVisible, setFvisible] = useState(false)
  const [gVisible, setGvisible] = useState(false)
  let obj = useRef(null)

    
  //Navbar 에서 검색을 하였을 때를 위해서
  let {state} = useLocation()
  console.log("현재 가지고 있는 {state} 값?? ", state)
  console.log("현재 가지고 있는 obj.current 값?? ",obj.current)
  if (state !== undefined || state !== null){
    if (obj.mode !== "sort" && obj.mode !=="filter"){
      obj = state
    }
  }
  
  //Navbar 에서 Movie를 선택하였을 때
  if (obj === undefined || obj === null){
      obj = {
        mode : "popular",
      } 
  }
  
  console.log("현재 obj 모드값은? ", obj.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {popularMovies,loading,genreList} = useSelector((state)=>state.movie)
  const {currentPageGroup} = useSelector((state)=>state.page)
  
 // console.log("쟝르리스트 데이터 ", genreList)

  let currentPage = popularMovies.page

  let totalPage = popularMovies.total_pages
  totalPage > 100?totalPage=100:totalPage=totalPage
  
  let totalItems = popularMovies.total_results
  totalItems > 2000?totalItems=2000:totalItems=totalItems
  
  let totalPageGroup = parseInt(totalPage/10)
  totalPage%10===0?totalPageGroup=totalPageGroup:totalPageGroup+=1

  let current_start_page_num = currentPageGroup*10 - 9
  let current_end_page_num = 0
  totalPage > currentPageGroup * 10? current_end_page_num=currentPageGroup*10:current_end_page_num=totalPage
  // popularMovies.total_pages > currentPageGroup * 10? current_end_page_num = currentPageGroup * 10:current_end_page_num = popularMovies.total_pages

  const getPageNumber = () => {
     let arr = [];
     for (let i = current_start_page_num ; i<= current_end_page_num; i++){
       arr.push(i)
     }
     //console.log("현재 페이지네이션 arr[] 내에 있는 값은 ?",arr)
     return arr;
  }

  const moveToPage = (page) => {
    obj.page = page
    //console.log("moveToPage 에서 받은 obj 값?? ",obj) 
    
    if (obj.mode === "search"){
      dispatch(movieAction.getSearchedMovie(obj))
    }
    else if(obj.mode === "sort"){
      dispatch(movieAction.getSortedMovie(obj))
      
    }
    else if(obj.mode === "filter"){
      dispatch(movieAction.getFilteredMovies(obj))
      
    }
    else if(obj.mode === "genre"){
      dispatch(movieAction.getGenreMovies(obj))
      
    }
    else{
      dispatch(movieAction.getMovies(obj))
    }
  }

  const moveToNextPageGroup = (currentPageGroup) => {
    //console.log("이전번 페이지 그룹을 클릭함...")
    dispatch(pageAction.goNextPageGroup(currentPageGroup))
    moveToPage(currentPageGroup*10+1)
  }

  const moveToBackPageGroup = (currentPageGroup) => {
    //console.log("다음번 페이지 그룹을 클릭함...")
    dispatch(pageAction.goBackPageGroup(currentPageGroup))
    moveToPage(currentPageGroup*10-10)
  }

  const moveToFirstPageGroup = () => {
    //console.log("맨처음 페이지 그룹을 클릭함...")
    dispatch(pageAction.goFirstPageGroup(currentPageGroup))
    moveToPage(1)
  }

  const moveToLastPageGroup = () => {
    //console.log("맨끝 페이지 그룹을 클릭함...")
    dispatch(pageAction.goLastPageGroup(totalPageGroup))
    moveToPage(totalPage)
  }
  // const moveToNextPageGroup = () => {
  //   //console.log("다음페이지 그룹으로 ", currentPageGroup, currentPage)

  //   dispatch(pageAction.moveToNextPageGroup(currentPage,currentPageGroup))
  // }

  
  const filterSearch = () => {
    const [min,max] = years
    const sDate = "-01-01"
    const eDate = "-12-31"
    const startDate = min+sDate
    const endDate = max+eDate

    obj = {
      mode : "filter",
      startDate: startDate,
      endDate: endDate,
    }

    console.log("영화 Filter 하기 전에 바뀐 obj mode 값 ??? ", obj.mode)

    dispatch(movieAction.getFilteredMovies(obj))
    navigate(`/movies`,{state:obj})

  }
 
  const genreSearch = (id) => {
    
    obj = {
      mode : "genre",
      id : id,
    }

    dispatch(movieAction.getGenreMovies(obj))
    navigate(`/movies`,{state:obj})

  }


  useEffect(() => {      
    
    if (obj.mode === "search"){
      dispatch(movieAction.getSearchedMovie(obj))
    }
    else if(obj.mode === "sort"){
      dispatch(movieAction.getSortedMovie(obj))
      
    }
    else if(obj.mode === "filter"){
      dispatch(movieAction.getFilteredMovies(obj))
      
    }
    else if(obj.mode === "genre"){
      dispatch(movieAction.getGenreMovies(obj))
    }

    else{
      dispatch(movieAction.getMovies(obj))
    }

    dispatch(pageAction.goFirstPageGroup(currentPageGroup))
    moveToPage(1)

  },[obj.mode, obj.order, obj.query])

  console.log("현재 저장된 페이지네이션 페이지 값?? ",obj.page)
  if (obj.page === undefined){
    obj.page = 1
  }

  if (loading) {
    return <ClipLoader
    color="#ffff"
    loading={loading}
    size={150}
  />
  }  

  return (
    <Container>
      <Row className='movie-info-section'>   
        <Col lg={2} className='movie-co2'>
            <div className='select-title'>
              <div>
                <span>Sort</span>{sVisible?<span className='up-and-down' onClick={()=>{setSvisible(!sVisible)}}>▲</span>:<span className='up-and-down' onClick={()=>{setSvisible(!sVisible)}}>▼</span>} 
                {sVisible?<SortOption sortOpt={obj.order} className='sort-option' />:""}
              </div>
              
           </div>
           <div className='select-title'>
              <span>Filter</span>{fVisible?<span className='up-and-down' onClick={()=>{setFvisible(!fVisible)}}>▲</span>:<span className='up-and-down' onClick={()=>{setFvisible(!fVisible)}}>▼</span>}
           </div>
           {fVisible?
            <div className='filter-area'>
              <div className='year-value'>
                  Year Filter
                </div>
                <div className='year-from-to'>
                  <span>From:</span>&nbsp; {years[0]} <span>- To:</span>&nbsp; {years[1]}
                </div>
                <div className='range-slider'>
                  <Slider className="slider" 
                          onChange={setYears}
                          value={years} 
                          min={MIN} 
                          max={MAX}          
                  />
                </div>
                <div className='search-ico' onClick={()=>{filterSearch()}}><img src={Search} width="30" height="30" /></div>
            </div>:""}
            
          <div className='select-title'>
            <span>Genre Selection</span>{gVisible?<span className='up-and-down' onClick={()=>{setGvisible(!gVisible)}}>▲</span>:<span className='up-and-down' onClick={()=>{setGvisible(!gVisible)}}>▼</span>}
            {gVisible?
            <div>
              <div className='select-separator'></div>  
                {
                  genreList.map((item)=>{
                    return <div className='menu-item' onClick={()=>{genreSearch(item.id)}} >{item.name}</div>
                  })
                }
            </div>:""}
          </div>  
          
        </Col>
        <Col lg={10} className='movie-co3'>
          {popularMovies.results.map((item) => (
          <MovieIntro movie={item}/>
          ))}         
        </Col>
      </Row>
      <Row className='pagination-area'>
        <Col>
          <div className='circle-button-area'>
            {currentPageGroup!==1?<div className='circle-img' onClick={()=>moveToFirstPageGroup(currentPageGroup)}>&lt;&lt;</div>:""}
            {currentPageGroup!==1?<div className='circle-img' onClick={()=>moveToBackPageGroup(currentPageGroup)}>&lt;</div>:""}
            {getPageNumber().map((page) => (
                currentPage===page?<div className='circle-img-on-page'>{page}</div>:<div className='circle-img' onClick={()=>moveToPage(page)}>{page}</div>
                ))}
            {currentPageGroup!==totalPageGroup?<div className='circle-img' onClick={()=>moveToNextPageGroup(currentPageGroup)}>&gt;</div>:""}
            {currentPageGroup!==totalPageGroup?<div className='circle-img' onClick={()=>moveToLastPageGroup(currentPageGroup)}>&gt;&gt;</div>:""}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
       
    </Container>
  )
}

export default Movies
