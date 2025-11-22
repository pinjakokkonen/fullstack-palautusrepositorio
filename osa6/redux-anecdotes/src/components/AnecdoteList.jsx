import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const sortedAnecdotes = Object.values(anecdotes).sort((a, b) => b.votes - a.votes)

  return(
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList