import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RedChecked from '../images/RedChecked.png'

const InstructionOption = ({InsOpt}) => {
  
    console.log("InstructionOption 에서 받은 인자 값?? ",InsOpt)
    const navigate = useNavigate()
    const onSelectOpt = (opt) => {
        navigate(`/favorites`,{state:opt})
    }
  
    return (
      <div>
         <div className='select-separator'></div>
          <div className='add' onClick={()=>{onSelectOpt("add")}}><span>Add movies</span>{InsOpt==="add"?<span className='redChecked-img'><img src={RedChecked} height="25" width="25"/></span>:""}</div>
          <div className='delete' onClick={()=>{onSelectOpt("delete")}}><span>Delete movies</span>{InsOpt==="delete"?<span className='redChecked-img'><img src={RedChecked} height="25" width="25"/></span>:""}</div>
      </div>
    )
}

export default InstructionOption
