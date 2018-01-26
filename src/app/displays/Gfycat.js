import React from 'react'

class Gfycat extends React.Component {
  render() {
    return (
      <iframe src={this.props.post.url} title={Math.random().toString()} frameBorder='0' scrolling='no' height='200' allowFullScreen></iframe>
    )
  }

}

export default Gfycat
