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
      <td>
        {post.parsed ? post.parsed.url : '--'}
      </td>
    </tr>
  )
}

export default Post
