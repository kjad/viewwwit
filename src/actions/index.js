import { parse } from '../app/PostParser'

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
      parse(child.data)
        .then(data => dispatch(processedPost(data)))
        .catch(e => console.log(e))
      return child
    })
  }
}

const processedPost = (post) => {
  return {
    type: 'PROCESSED_POST',
    post: post
  }
}
