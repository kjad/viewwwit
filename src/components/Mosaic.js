import React from 'react'
import Post from './Post'

const Mosaic = ({ posts, changeSubreddit, dispatch }) => {
  console.log(dispatch)
  dispatch({ type: 'TEST', action: 'blah' })
  return posts.map(p => <Post key={p.id} data={p}/>)
}

export default Mosaic
