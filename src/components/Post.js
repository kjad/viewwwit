import React from 'react'

const Post = (data, dispatch) => {
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td>{data.data.id}</td>
            <td>{data.data.url}</td>
            <td>{data.valid}</td>
            <td>{data.loading}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Post
