import React from 'react'

const Post = ({ post }) => {
  return (
    <tr>
      <td>
        {post.raw.id}
      </td>
      <td>
        {post.raw.url}
      </td>
      <td>
        {post.url ? post.url : '--'}
      </td>
      <td>
        {post.type ? post.type : '--'}
      </td>
      <td>
        {post.dimensions ? JSON.stringify(post.dimensions) : '--'}
      </td>
    </tr>
  )
}

export default Post
