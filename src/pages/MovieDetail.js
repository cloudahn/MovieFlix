import React, {useEffect} from 'react'
import {Badge, Button} from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocation, useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { movieAction } from '../redux/actions/movieAction'
import Review from '../components/Review'
import RecommendMovieCard from '../components/RecommendMovieCard'
import VideoModal from '../components/VideoModal'
import ClipLoader from "react-spinners/ClipLoader"
import NoVideos from "../images/No-videos.png"
import Favorite from '../images/Favorite.png'

const MovieDetail = () => {

  const dispatch = useDispatch()
  const {id} = useParams();
  const location = useLocation()
  console.log("넘겨받은 location 값은 ??? ",location)
  console.log("넘겨받은 id 값은 ?? ", id)
  const item = location.state
  console.log("넘겨받은 item 값은 ?? ", item)
  

  const {genreList,movieBudget,movieReviews,movieRecommend,movieYoutubeKey,review,recommendMovie,loading,favoriteList} = useSelector((state)=>state.movie)
  const imageUrl = "http://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + item.poster_path
  
  const [modalShow, setModalShow] = React.useState(false);


  useEffect(() => {
    dispatch(movieAction.getDetailInfo(id))
  },[id])

  const addFavoriteMovie = (favoriteObj) => {
    console.log("준비된 favoriteObj 값은 ?? ", favoriteObj)
    dispatch(movieAction.getFavoriteAdd(favoriteObj))
    alert('This movie has been added into your Favorite Movie List!!')
  }

  const deleteFavoriteMovie = (movieId) => {
    if(window.confirm('It will delete this movie from your Favorite Movie List.. \n Are you sure??')){
      console.log("무비id = ", movieId)
      dispatch(movieAction.getFavoriteDelete(movieId))
    }
  }

  const showReview = () => {
    dispatch(movieAction.getReview())
  }

  const showRecommendMovie = () => {
    dispatch(movieAction.getRecommendMovie()) 
  }
  
  const showRecommendMovieNextPage = () => {
    dispatch(movieAction.getDetailInfo(id,movieRecommend.total_pages))
  }

  const showRecommendMoviePreviousPage = () => {
    dispatch(movieAction.getDetailInfo(id,movieRecommend.total_pages-1))
  }

  console.log("현재 등록 된 favoriteMovie 리스트 ??? ",favoriteList)
  console.log("현재 가져온 쟝르 리스트 ??? ",genreList)

  let favoriteObj = {
    id : id,
    original_title : item.original_title,
    genre_ids : item.genre_ids,
    popularity : item.popularity,
    vote_average : item.vote_average,
    poster_path : item.poster_path,
    adult : item.adult,
    overview : item.overview
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
      <Row className='detail-row'>
        <Col className='detail-box1'>
          <div className='favorite-area'>
            {favoriteList.find((item) => item.id === id)!==undefined?<img src={Favorite} width={80} height={80} onClick={()=>{deleteFavoriteMovie(id)}}/>:
            <img src={Favorite} width={80} height={80} style={{"mix-blend-mode":"luminosity"}} onClick={()=>{addFavoriteMovie(favoriteObj)}}/>
            }
          </div>
        </Col>
        <Col className='detail-box2' lg={4}><img src = {imageUrl} width={400} height={500}/></Col>
        <Col className='detail-box3' lg={4}>
          <div className='badge-area'>
            {item.genre_ids.map((id)=> (
          //    favoriteObj.genreName.push(genreList.find((item) => item.id == id).name),
          //    favoriteObj.genreId.push(id),
              <Badge bg="success" className='movie-detail-badge'>{genreList.find((item) => item.id == id).name}</Badge>
              
            ))
            }
          </div>
          <div>
            <h3>{item.original_title}</h3>
          </div>
          <div className='head-info'>
            Popularity: {item.popularity}, Rated: {item.vote_average}, {item.adult?"Adult":"Non-Adult"}
          </div>
          {item.overview.length<200?<div className='summary-no-auto'> 
            <h4>Summary</h4>
            {item.overview.length <=420?item.overview:item.overview.substr(0,457)+"..."}
          </div>:<div className='summary'>{item.overview.length <=420?item.overview:item.overview.substr(0,457)+"..."} </div>}
          <div className='more-info'>
            <div>
              Budget : $ {movieBudget.budget && movieBudget.budget.toLocaleString('en-US')}
            </div>
            <div>
              Revenue: $ {movieBudget.revenue && movieBudget.revenue.toLocaleString('en-US')}
            </div>
            <div>
              Release date: {item.release_date}
            </div>
          </div>
          <div>
            {movieYoutubeKey.length!==0 && movieYoutubeKey.results.length >= 1?
            <div className='view-retailer'><img width="50" height="50" src = "https://www.freeiconspng.com/thumbs/video-icon/video-icon-1.png" onClick={() => setModalShow(true)}/>
              <VideoModal 
                show={modalShow}
                onHide={()=>setModalShow(false)}
                movieId={id}
              />
              </div>
            :
            <div className='sorry-no-videos'><img src={NoVideos} width="70" height="70"/></div>}
          </div>
        </Col>
        <Col className='detail-box4' >
        </Col>
      </Row>
      <Row className='review-row'>
        <Col className='test-row-box1'></Col>
        <Col lg={8} className='review-section'>
            <div><Button variant="danger" onClick={showReview}>Review ({movieReviews.total_results})</Button> <Button variant="light" onClick={showRecommendMovie}>Recommend Movie ({movieRecommend.total_results})</Button></div>
            <div>
              {review && movieReviews.total_results>0?
                movieReviews.results.map((item)=>(<Review item={item}/>))
                :""
              }
              <div className='recommend_movie_list'>
              {recommendMovie && movieRecommend.total_results>0?              
                movieRecommend.results.map((item)=>(               
                <RecommendMovieCard item={item}/>
                ))
                :""
              }
              </div>    
            </div>
            <div className='page_move_area'>
                {recommendMovie && movieRecommend.total_results>20 ?
                  movieRecommend.page === movieRecommend.total_pages?
                  <Button variant="outline-primary" size="sm" onClick={showRecommendMoviePreviousPage}> &lt;&lt;previous</Button>
                  :
                  <Button variant="outline-primary" size="sm" onClick={showRecommendMovieNextPage}> &gt;&gt;more</Button>:
                  ""
                }
              </div>  
        </Col> 
        <Col className='test-row-box3'>

        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetail
