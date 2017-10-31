import React from 'react'

const Search = ({ changeSubreddit }) => {
  let input
  let onSubmit = (e) => {
    e.preventDefault()
    changeSubreddit(input.value)
    input.value = ''
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={n => input = n} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
export default Search
