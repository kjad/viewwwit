import React from 'react'

const Post = ({ post, height }) => {

  let img = (<div>--</div>)
  if (post.url && post.type === 'image' && post.dimensions) {
    const style = {
      height: height.toString() + 'px',
      paddingLeft: '5px',
      paddingRight: '5px'
    }
    img = (<img src={post.url} style={style}/>)
  }

  return (
    <span>{img}</span>
  )
}

export default Post
