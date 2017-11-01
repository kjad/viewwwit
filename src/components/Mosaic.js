import React from 'react'
import Post from '../components/Post'

const Mosaic = ({ posts }) => {
  return (
    <table>
      <tbody>
        {posts.map(p => <Post key={p.id} post={p}/>)}
      </tbody>
    </table>
  )
}

export default Mosaic
