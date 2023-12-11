import React, {useEffect} from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch()
  const {popularMovies,topRatedMovies,upComingMovies,loading} = useSelector((state)=>state.movie)
  const obj = {
    mode : "main",
    page : 1,
    search : ""
  }
  useEffect(() => {
    dispatch(movieAction.getMovies(obj))
  },[])

//loading ==  true : 데이터가 오기 전
//loading == false : 데이터 온 후 또는 에러 발생

if (loading) {
  return <ClipLoader
  color="#ffff"
  loading={loading}
  size={150}
/>
}

  return (
    <div>
      <div className='main-area-banner'>
        <Banner movie={popularMovies.results[0]} /> 
      </div>
      <div className='movie-carousel'>
        Popular Movie
       <MovieSlide movies={popularMovies} />
      </div>
      <div className='movie-carousel'>
        Top rated Movie
        <MovieSlide movies={topRatedMovies}/>
      </div>
      <div className='movie-carousel'>
        Upcoming Movie
        <MovieSlide movies={upComingMovies}/>
      </div>
    </div>
  )
}

export default Home
