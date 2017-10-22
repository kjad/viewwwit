import React from 'react'
import Axios from 'axios'
import Post from './Post'
import _ from 'lodash'

class Mosaic extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      height: 0
    }
  }

  render() {
    return (
      <div className="container is-widescreen">
        height: {this.height}
        {this.state.posts.filter(p => p.valid).map((post) => (
          <span key={post.data.id}>{post.display()}</span>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    Axios.get('https://www.reddit.com/r/aww/.json')
      .then((response) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(response.data.data.children.map(p => new Post(p.data)))
        }))
        this.height = this.calculateHeight()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  calculateHeight() {
    let averageAspectRatio = _.reduce(this.posts, (sum, post) => {
      return sum + (post.dimensions.width / post.dimensions.height)
    }, 0)

    console.log("post cnt", this.posts)
    console.log("browserWidth", this.browserWidth())
    console.log("avg aspect", averageAspectRatio)

    return this.browserWidth() / averageAspectRatio;
  }

  browserWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    )
  }
}

export default Mosaic
