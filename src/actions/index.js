import Post from '../components/Post'

export const requestPosts = (subreddit) => {
  return {
    type: 'REQUEST_POSTS',
    subreddit: subreddit
  }
}

export const changeSubreddit = (subreddit) => {
  return (dispatch) => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

const receivePosts = (subreddit, json) => {
  return (dispatch) => {
    json.data.children.map((child) => {

      // Here is where we can perform an async operation, such as getting
      // dimensions
      setTimeout(() => {
        dispatch(processedPost(child.data))
      }, 100)

    })
  }
}

const processedPost = (post) => {
  return {
    type: 'PROCESSED_POST',
    post: post
  }
}
