import React from 'react'
import Axios from 'axios'
import Post from './Post'
import _ from 'lodash'

class Mosaic extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      childDimensionsCalculated: 0
    }
  }

  render() {
    if (this.state.childDimensionsCalculated === this.state.posts.filter(p => p.valid).length) {

      return (
        <div className="is-widescreen">
          {_.chain(this.state.posts)
            .filter(p => p.valid)
            .chunk(5)
            .map((postsInRow) => {
              return (
                <div key={postsInRow.reduce((k, p) => k += p.data.id, '')}>
                  {postsInRow.map(post => <span key={post.data.id}>{post.display(this.calculateHeight(postsInRow))}</span>)}
                </div>
              )
            })
            .value()}
        </div>
      )
    }

    return (
      <div>
        <progress className="progress is-primary" value={this.state.childDimensionsCalculated} max={this.state.posts.filter(p => p.valid).length}></progress>
      </div>
    )
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    let incrementDimesions = this.incrementDimesions.bind(this)
    Axios.get('https://www.reddit.com/r/pics/.json')
      .then((response) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(response.data.data.children.map(p => new Post(p.data, incrementDimesions)))
        }))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  incrementDimesions(d) {
    this.setState((prevState) => ({
      childDimensionsCalculated: prevState.childDimensionsCalculated += 1
    }))
  }

  // To caculate the height for the row, return the browser width divided by the average
  // aspect ratio for all the provided posts
  calculateHeight(posts) {
    return this.browserWidth() / _.reduce(posts, (sum, post) => {
      if (!post.dimensions) {
        return sum
      }
      return sum + (post.dimensions.width / post.dimensions.height)
    }, 0);
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
