import PostParser from '../app/PostParser'

export const requestPosts = (subreddit) => {
  return {
    type: 'REQUEST_POSTS',
    subreddit: subreddit
  }
}

export const receivePosts = (subreddit, json) => {
  return (dispatch) => {
    return {
      type: 'RECEIVE_POSTS',
      subreddit: subreddit,
      posts: json.data.children.map(child => new PostParser(child.data, dispatch)),
      receivedAt: Date.now()
    }
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

export const updatePost = (post) => {
  return {
    type: 'UPDATE_POST',
    post: post
  }
}
