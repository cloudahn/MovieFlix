import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Navigation from './components/Navigation';


//1. 3개의 페이지 필요 (홈페이지, movie 페이지, movie 디테일 페이지)
//2. 홈페이지에서 배너를 볼 수 있다.
//3. 3가지 섹션의 영화를 볼 수 있다 (Popular, top rated, upcoming)
//4. 각 영화에 마우스를 올려두면, 제목, 장르, 점수, 인기도, 관람연령을 알 수 있다.
//5. 영화를 슬라이도 넘기면서 볼 수 있다.

//6. 영화 디테일 페이지에서 영화에 대한 디테일 정보를 볼 수 있다 (포스터,제목, 줄거리, 점수, 인기도...등등)
//7. Trailer를 누리면 트레일러를 볼 수 있다.
//8. 리뷰을 클릭하면 리뷰를 볼 수 있다.
//9. 관련된 영화도 볼 수 가 있음.
//10. 영화 검색 기능을 제공 
//11. 영화를 정렬, 필터링 가능



function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<MovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
