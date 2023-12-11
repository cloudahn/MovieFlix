import React from 'react'

const Review = (results) => {
  const item=results.item
  console.log("results.author===",item.author)
  return (
    <div>
      <div className='review_author'>{item.author}</div>
      <div className='review_message'>
        {item.content}
      </div>
    </div>
  )
}

export default Review
