import { useDispatch, useSelector } from 'react-redux'
import { votingAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = async (id, content) => {
    console.log('vote', id)
    dispatch(votingAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  const sortedAnecdotes = Object.values(anecdotes).sort((a, b) => b.votes - a.votes)

  return(
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList