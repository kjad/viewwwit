import React from 'react'
import Post from '../components/Post'
import { changeSubreddit } from '../actions'
import _ from 'lodash'

class Mosaic extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.subreddit !== this.props.subreddit) {
      console.log("Changing to", nextProps.match.params.subreddit)
      this.props.dispatch(changeSubreddit(nextProps.match.params.subreddit))
    }
  }
  // To caculate the height for the row, return the browser width divided by the average
  // aspect ratio for all the provided posts
  calculateHeight(posts) {
    return this.browserWidth() / _.reduce(posts, (sum, post) => {
      // 35 = posts in row * 2 * margin of each post + 5
      return sum + ((post.dimensions.width + 35) / post.dimensions.height)
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
  render() {
    return (
      <div>
        <h4>{this.props.subreddit}</h4>
        {_(this.props.posts)
          .chunk(3)
          .map(postsInRow => {
            const height = this.calculateHeight(postsInRow)
            return (
              <div key={postsInRow.reduce((k, p) => k += p.raw.id, '')}>
                {postsInRow.map(p => <Post key={p.raw.id} post={p} height={height}/>)}
              </div>
            )
          })
          .value()
        }
      </div>
    )
  }
}

export default Mosaic
