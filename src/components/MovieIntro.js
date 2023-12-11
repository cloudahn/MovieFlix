import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import starImage from '../images/star.png'
import adultImage from '../images/18plus.png'
import voteImage from '../images/vote.png'
import noImage from '../images/No-Image.png'

const MovieIntro = ({movie}) => {

  const {genreList} = useSelector(state=>state.movie)
  const imageThumbnailUrl = "http://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + movie.poster_path
  const item = movie

  //여기서 부터 추가
  const navigate = useNavigate() 
  const showMovieDetail=()=>{
     navigate(`/movies/${item.id}`,{state:{item}})
  }

  return (
    <div>
      <div className='movie-intro-section' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 155), rgba(0, 0, 0, 0.3)),"+
      "url("+`http://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`+")"}}  onClick={showMovieDetail}>
        <div className='movie-intro-headline'>
         <div>{movie.poster_path !== null?<img src={imageThumbnailUrl} width="40" height="55" /> : <img src={noImage} width="40" height="55" />}</div>
          <div className='movie-intro-headline-detail'>
              <h5>{movie.original_title}</h5>    
          </div>
        </div>
        <div className='movie-intro-release-date'>{movie.release_date?movie.release_date.substr(0,4):"No release date"}</div>
        <div className='movie-intro-badge'>{movie.genre_ids.map((id) => (
                <Badge bg="success" className='movie-genre-badge'>{genreList.find((item) => item.id == id).name}</Badge>
              ))}
        </div>
        
        <div className='movie-intro-popular'>
          <span><img width="20" height="20" src = {starImage} /> {movie.vote_average}</span>
          <span><img width="20" height="20" src = {starImage} /> {movie.popularity}</span>
          <span><img width="20" height="20" src = {voteImage} /> {movie.vote_count}</span>
          <span>{movie.adult?<img width="20" height="20" src = {adultImage} />:<img width="20" height="20" src = {adultImage} style={{"mix-blend-mode":"luminosity"}}/>}</span>
        </div>
        <div className='movie-intro-overview'>{movie.overview.length <=250?movie.overview:movie.overview.substr(0,247)+"..."}</div>
      </div>
    </div>
  )
}

export default MovieIntro
