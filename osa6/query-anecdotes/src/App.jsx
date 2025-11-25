import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_VOTE':
      return `anecdote ${action.payload} voted`
    case 'NEW_ANECDOTE':
      return `anecdote ${action.payload} created`
    default:
      return
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
    notificationDispatch({ type: 'NEW_VOTE', payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return 'anecdote service not available due to problems in server'
  }
 
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
