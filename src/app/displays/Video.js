import React from 'react'

class Video extends React.Component {
  render() {
    return (
      // TODO: Update poster image
      <video poster="//i.imgur.com/BK7Lhgph.jpg" preload="auto" autoPlay="autoplay" muted="muted" loop="loop" webkit-playsinline="true" height="200">
        <source src={this.props.post.url} type="video/mp4" />
      </video>
    )
  }

}

export default Video
