const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        subreddit: action.subreddit,
        loading: true,
        posts:[]
      })
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        subreddit: action.subreddit,
        loading: false,
        posts: action.posts,
        receivedAt: action.receivedAt
      })
    case 'PROCESSED_POST':
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          action.post
        ]
      })
    case 'UPDATE_POST':
      return Object.assign({}, state, {
        posts: state.posts.map((post) => {
          if (post.id == action.post.id) {
            post = action.post
          }
          return post
        })
      })
    default:
      return state
  }
}

export default reducer
