import React from 'react'

const Post = ({ post }) => {
  return (
    <tr>
      <td>
        {post.id}
      </td>
      <td>
        {post.url}
      </td>
    </tr>
  )
}

export default Post
