import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({item}) => {
  
  const {genreList} = useSelector(state=>state.movie)
  const navigate = useNavigate() 
  const showMovieDetail=(item)=>{
    console.log("showMovieDetail에서 받은 item  값?? ", item)
    navigate(`/movies/${item.id}`,{state:item})
  }
  
  console.log("무비카드 에서 movie 값 ", item)
  return (
    <div className='card-main'>
      <div className="card" style={{
        'height': '200px',
        'width': '355px',
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`+")"}} onClick={()=>{showMovieDetail(item)}}>
        <div className='overlay'>
            <div className='overlay-title'>{item.title}</div>
            <div className='overlay-badge'>{item.genre_ids.map((id)=> (
                <Badge bg="success" className='movie-genre-badge'>{genreList.find((item) => item.id == id).name}</Badge>
              ))}
            </div>
            <div className='overlay-grade'>
              <span>{item.vote_average}</span>
              <span>{item.adult?"청불":"Under 18"}</span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MovieCard
