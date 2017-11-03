import { connect } from 'react-redux'
import { changeSubreddit } from '../actions'
import Search from '../components/Search'
import { withRouter } from 'react-router'

const mapDispatchToProps = dispatch => {
  return {
    changeSubreddit: subreddit => {
      dispatch(changeSubreddit(subreddit))
    }
  }
}

const SearchContainer = connect(
  null,
  mapDispatchToProps
)(Search)

export default withRouter(SearchContainer)
