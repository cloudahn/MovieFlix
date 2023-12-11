import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import noImage from '../images/No-Image-Wide.png'

const RecommendMovieCard = ({item}) => {

  const navigate = useNavigate() 
  const {genreList} = useSelector(state=>state.movie)

  const showMovieDetail=()=>{
    navigate(`/movies/${item.id}`,{state:item})
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  let test_text = "url("+"https://www.themoviedb.org/t/p/w500_and_h282_face/"+item.backdrop_path+")"
  if (item.backdrop_path===null){
    console.log ("영화에 이미지 없음")
    test_text = "url("+noImage+")"
  }

  return (
    <div className="card_recommend" style={{backgroundImage:test_text}} onClick={showMovieDetail}>
       <div className='overlay-recommend'>
          <div className='overlay-recommend-title'>
          <h5>{item.title}</h5>
          </div>
          <div className='overlay-recommend-genre'>{item.genre_ids.map((id)=> (
              <Badge bg="success" className='movie-genre-badge'>{genreList.find((item) => item.id == id).name}</Badge>
            ))}</div>
          <div className='overlay-grade'>
              <span>{item.vote_average}</span>
              <span>{item.adult?"청불":"Under 18"}</span>
            </div>
        </div>
    </div>
  )
}

export default RecommendMovieCard
