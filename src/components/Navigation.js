import React , {useState} from 'react'
import {Navbar, Container, Form, Button, Nav, NavDropdown, FormControl} from "react-bootstrap"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Navigation = () => {

  const navigate = useNavigate()
  let obj = {
    mode : "search",
    page : 1,
    query : "",
  }
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])
  const change = (event) => {
    let {value} = {...event.target}
    setSearch(value)
  }
  const goSearch = (event) =>{
    event.preventDefault()
    const newList = [...list]
    newList.push(search)
    setList(newList)
    setSearch('')
    obj.query = search
    navigate(`/movies`,{state:obj})
  }


  return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#"><img width="100" src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Link to="/" className='nav-item'>Home</Link>
                <Link to="/movies" className='nav-item'>Movies</Link>
                <Link to="/favorites" className='nav-item'>Favorites</Link>
                
              </Nav>
              <Form className="d-flex" onSubmit={goSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={change}
                />
                <Button variant="outline-danger" type='submit'>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
 
  )
}
export default Navigation
