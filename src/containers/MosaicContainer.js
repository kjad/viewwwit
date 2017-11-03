import { connect } from 'react-redux'
import Mosaic from '../components/Mosaic'
import { withRouter } from 'react-router'

// class MosaicContainer extends Component

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    subreddit: ownProps.match.params.subreddit
  }
}

const MosaicContainer = connect(
  mapStateToProps
)(Mosaic)

export default withRouter(MosaicContainer)
