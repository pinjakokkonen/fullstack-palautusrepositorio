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
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAdecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAdecdote))
  }
}

export const votingAnecdote = (content) => {
  return async (dispatch) => {
    const votedAdecdote = await anecdoteService.voteNew(content)
    dispatch(voteAnecdote(votedAdecdote))
  }
}

export default anecdoteSlice.reducer
