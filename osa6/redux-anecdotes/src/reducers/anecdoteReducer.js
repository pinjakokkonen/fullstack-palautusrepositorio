import { createSlice } from "@reduxjs/toolkit"
import { current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const votedAnecdote = state.filter(one => one.id===id)[0]
      const changeVote = {...votedAnecdote, votes: votedAnecdote.votes+1}
      return state.map(anecdote => (anecdote.id !== id ? anecdote : changeVote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
