import React from 'react'
require('./Post.css')

const Post = ({ post, height }) => {
  if (post.url && post.type === 'image' && post.dimensions) {
    const aspectRatio = post.dimensions.width / post.dimensions.height
    const divStyle = {
      height: height.toString() + 'px',
      width: (Math.floor(aspectRatio * height)).toString() + 'px'
    }
    const imgStyle = {
      height: '100%',
    }
    return (
      <div className="post-container" style={divStyle}>
        <div className="post-text">
          <h4>{post.raw.title}</h4>
        </div>
        <img src={post.url} style={imgStyle}/>
      </div>
    )
  }
}

export default Post
