import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import RedChecked from '../images/RedChecked.png'

const SortOption = ({sortOpt}) => {

  let obj = useRef(null)
  const navigate = useNavigate()
  const onSelectSort = (opt) => {
    obj = {
      mode: "sort",
      order : opt,
    }
    navigate(`/movies`,{state:obj})
  }

  return (
    <div>
       <div className='select-separator'></div>
        <div className='asc' onClick={()=>{onSelectSort("popularity.asc")}}><span>popularity.asc</span>{sortOpt==="popularity.asc"?<span className='redChecked-img'><img src={RedChecked} height="25" width="25"/></span>:""}</div>
        <div className='desc' onClick={()=>{onSelectSort("popularity.desc")}}><span>popularity.desc</span>{sortOpt==="popularity.desc"?<span className='redChecked-img'><img src={RedChecked} height="25" width="25"/></span>:""}</div>
    </div>
  )
}

export default SortOption
