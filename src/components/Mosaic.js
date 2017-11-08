import React from 'react'
import Post from '../components/Post'
import { changeSubreddit } from '../actions'

class Mosaic extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.subreddit !== this.props.subreddit) {
      console.log("Changing to", nextProps.match.params.subreddit)
      this.props.dispatch(changeSubreddit(nextProps.match.params.subreddit))
    }
  }
  render() {
    return (
      <div>
        <h4>{this.props.subreddit}</h4>
        <table>
          <tbody>
            {this.props.posts.map(p => <Post key={p.raw.id} post={p}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mosaic
