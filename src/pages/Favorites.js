import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import InstructionPage from '../components/InstructionPage'
import MovieIntro from '../components/MovieIntro'

const Favorites = () => {

  const {favoriteList} = useSelector((state)=>state.movie)
  console.log("Favorite에서 가져온 favoriteList의 길이는???? ",favoriteList.length)
  
  return (
    <Container>
      <Row>
        <Col lg={3} className='favorite-co1'>
          {favoriteList.length!==0?<div className='select-title'><span>Favorite Movies</span></div>:<div className='select-title'><span>Instruction Page</span></div>}
        </Col>
        <Col lg={8} className='favorite-co2'>
          {favoriteList.length!==0?
            favoriteList.map((item) => (
              <MovieIntro movie={item}/>
            ))
          :<InstructionPage />}
        </Col>
        <Col lg={1} className='favorite-co3'></Col>
      </Row>
    </Container>
  )
}

export default Favorites
