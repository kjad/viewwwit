import { connect } from 'react-redux'
import Search from '../components/Search'
import { withRouter } from 'react-router'

const SearchContainer = connect()(Search)

export default withRouter(SearchContainer)
