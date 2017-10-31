import { connect } from 'react-redux'
import Mosaic from '../components/Mosaic'

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const MosaicContainer = connect(
  mapStateToProps
)(Mosaic)

export default MosaicContainer
