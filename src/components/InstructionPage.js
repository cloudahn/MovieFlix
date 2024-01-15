import React from 'react'
import Favorite from '../images/Favorite.png'

const InstructionPage = () => {
  return (
    <div>
        <p className='instruction-head-line-no-items'>You haven't got any Favorite movies yet!!!</p>
        <p className='instruction-head-line'>How to <span className='text-yellow'>'ADD'</span> your Favorite movies
            <div>
            <p>1. Go to the <span className='text-yellow'>'Home'</span> or <span className='text-yellow'>'Movies'</span> to get the movie information.</p>
            <p>2. Click the movie that you want to see the details.</p>
            <p>3. Once you get the details, you can see the <span className='text-red'>'Favorite mark'</span><img src = {Favorite} width={50} height={50} style={{"mix-blend-mode":"luminosity"}}/> on the left side of the movie details.</p>
            <p>4. Just <span className='text-yellow'>'Click'</span> the <span className='text-red'>'Favorite mark'</span> to enable the movie to be your Favorite movie.</p>
            <p>5. It will toggle the color from <img src = {Favorite} width={50} height={50} style={{"mix-blend-mode":"luminosity"}}/> to <img src = {Favorite} width={50} height={50}/></p>
            <p>6. Great! now you can see the movie in this page as a <span className='text-red'>'Favorite Movie'</span>.</p>
            </div>
        </p>
        <p className='select-separator'></p>
        <p className='instruction-head-line'>How to <span className='text-yellow'>'DELETE'</span> your Favorite movies
            <div>
            <p>1. Go to the <span className='text-yellow'>'Home'</span> or <span className='text-yellow'>'Movies'</span> to get the movie information.</p>
            <p>2. Click the movie that you want to see the details.</p>
            <p>3. Once you get the details, you can see the <span className='text-red'>'Favorite mark'</span><img src = {Favorite} width={50} height={50}/> on the left side of the movie details.</p>
            <p>4. Just <span className='text-yellow'>'Click'</span> the <span className='text-red'>'Favorite mark'</span> to disable the movie to be your Favorite movie.</p>
            <p>5. It will toggle the color from <img src = {Favorite} width={50} height={50}/> to <img src = {Favorite} width={50} height={50} style={{"mix-blend-mode":"luminosity"}}/></p>
            <p>6. Done! now the movie will no longer be in this page.</p>
            </div>
        </p>
    </div>
  )
}

export default InstructionPage
