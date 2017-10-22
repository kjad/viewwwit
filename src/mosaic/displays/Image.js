import React from 'react'

class Image extends React.Component {
  render() {
    let style = {
      height: '200px'
    }
    
    return (
      <img src={this.props.post.url} alt={this.props.post.url} style={style}/>
    )
  }

}

export default Image
