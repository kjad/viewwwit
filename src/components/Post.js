import React from 'react'
require('./Post.css')

const Post = ({ post, height }) => {

  let img = (<div>--</div>)
  if (post.url && post.type === 'image' && post.dimensions) {
    const divStyle = {
      height: height.toString() + 'px',
    }
    const imgStyle = {
      height: '100%',
    }
    img = (
      <div className="post-container" style={divStyle}>
        <div className="post-text">
          <h4>{post.raw.title}</h4>
        </div>
        <img src={post.url} style={imgStyle}/>
      </div>
    )
  }

  return (
    <span>{img}</span>
  )
}

export default Post
