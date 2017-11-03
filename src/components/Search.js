import React from 'react'

const Search = (props) => {
  let input
  let onSubmit = (e) => {
    e.preventDefault()
    props.changeSubreddit(input.value)
    props.history.push(`/r/${input.value}`)
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
