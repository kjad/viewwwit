import { connect } from 'react-redux'
import { changeSubreddit } from '../actions'
import Search from '../components/Search'

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

export default SearchContainer
